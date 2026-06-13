import os
import json
from groq import Groq
from dotenv import load_dotenv
from supabase import create_client, Client
import requests
from pydantic import BaseModel, Field, EmailStr, ValidationError
from typing import Optional, List

# LangSmith Tracing Setup
# To enable: Add LANGCHAIN_TRACING_V2=true and LANGCHAIN_API_KEY to .env
try:
    from langsmith import traceable
    LANGSMITH_AVAILABLE = True
except ImportError:
    LANGSMITH_AVAILABLE = False
    def traceable(*args, **kwargs):
        return lambda func: func

# Load environment variables
load_dotenv()

# Configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# Initialize clients
groq_client = Groq(api_key=GROQ_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY) if SUPABASE_URL and SUPABASE_KEY else None

# Pydantic Models for Tool Robustness
class SearchPortfolioParams(BaseModel):
    query: str = Field(..., min_length=2, description="The search query for the portfolio knowledge base.")

class NotifyMussaratParams(BaseModel):
    name: str = Field(..., min_length=2, description="The name of the person reaching out.")
    email: EmailStr = Field(..., description="A valid email address for contact.")
    message: str = Field(..., min_length=10, description="The message or inquiry.")

# Lazy load model to avoid overhead if not needed
_embedding_model = None

@traceable(name="Generate Embedding")
def get_embedding(text):
    """
    Generate embedding for a query string using local sentence-transformers.
    """
    global _embedding_model
    try:
        if _embedding_model is None:
            from sentence_transformers import SentenceTransformer
            print(f"Loading embedding model: {HF_MODEL}...")
            _embedding_model = SentenceTransformer(HF_MODEL)
        
        return _embedding_model.encode(text).tolist()
    except Exception as e:
        print(f"Local embedding error: {e}. Falling back to API...")
        
        # Fallback to API if local fails
        api_url = f"https://huggingface.co/api/models/{HF_MODEL}/inference"
        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        
        try:
            response = requests.post(
                api_url, 
                headers=headers, 
                json={"inputs": text},
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as api_e:
            print(f"API embedding error: {api_e}")
            return None

@traceable(name="Search Portfolio")
def search_portfolio(query: str):
    """
    Search the portfolio knowledge base for relevant information using Hybrid Search.
    """
    if not query or len(query.strip()) < 2:
        return "Please provide a more specific search query."

    if not supabase:
        return "Portfolio search is currently unavailable (Database not configured)."
    
    embedding = get_embedding(query)
    if not embedding:
        return "Could not process the search query (Embedding failure)."
    
    try:
        # Call the Hybrid Search RPC function defined in Supabase
        result = supabase.rpc(
            "hybrid_search_portfolio",
            {
                "query_text": query,
                "query_embedding": embedding,
                "match_threshold": 0.2, # Lower threshold to catch more candidates for hybrid scoring
                "match_count": 10,
                "full_text_weight": 0.4,
                "vector_weight": 0.6
            }
        ).execute()
        
        if not result.data:
            return f"No specific information found in the portfolio regarding '{query}'."
        
        # Format results with similarity scores for better AI awareness
        context_parts = []
        for item in result.data:
            score = item.get('similarity', 0)
            content = item.get('content', '')
            # Clean up content for better readability
            content = content.replace("\n\n", "\n").strip()
            context_parts.append(f"[Score: {score:.2f}]\n{content}")
            
        context = "\n\n---\n\n".join(context_parts)
        return context
    except Exception as e:
        return f"Error searching portfolio: {str(e)}"

def notify_mussarat(name: str, email: str, message: str, recaptcha_token: str = None):
    """
    Send an email notification to Mussarat about a new inquiry.
    """
    service_id = os.getenv("EMAILJS_SERVICE_ID", "").strip()
    template_id = os.getenv("EMAILJS_TEMPLATE_ID", "template_5i4wans").strip()
    public_key = os.getenv("EMAILJS_PUBLIC_KEY", "").strip()
    private_key = os.getenv("EMAILJS_PRIVATE_KEY", "").strip()
    
    if not service_id or not public_key:
        print(f"Email configuration missing: service_id={bool(service_id)}, public_key={bool(public_key)}")
        return "Email service is not configured on the server."
    
    # Clean inputs
    name = name.strip() if name else "Unknown"
    email = email.strip() if email else "no-email@provided.com"
    message = message.strip() if message else "No message provided."

    # Structure for EmailJS /api/v1.0/email/send
    # We include g-recaptcha-response both at top level and in params to be safe
    template_params = {
        "name": name,
        "email": email,
        "message": message,
        "to_name": "Mussarat Shamsher"
    }
    
    if recaptcha_token:
        template_params["g-recaptcha-response"] = recaptcha_token

    payload = {
        "service_id": service_id,
        "template_id": template_id,
        "user_id": public_key,
        "accessToken": private_key,
        "template_params": template_params
    }

    # Also add at top level as per REST API docs
    if recaptcha_token:
        payload["g-recaptcha-response"] = recaptcha_token
    
    try:
        response = requests.post(
            "https://api.emailjs.com/api/v1.0/email/send",
            json=payload,
            timeout=10,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print("EmailJS: Successfully sent.")
            return "Notification sent successfully. Mussarat will get back to you soon."
        else:
            print(f"EmailJS Error (Status {response.status_code}): {response.text}")
            # If we get a 400, it's likely a configuration issue
            if response.status_code == 400:
                return f"Configuration error (400). Please check your EmailJS Service ID, Template ID, and API keys."
            return f"Failed to send notification (Status {response.status_code})."
    except Exception as e:
        print(f"EmailJS Exception: {str(e)}")
        return f"Error triggering notification: {str(e)}"

class Agent:
    """Simple Agent abstraction inspired by OpenAI Agents SDK."""
    def __init__(self, name, instructions, tools=None):
        self.name = name
        self.instructions = instructions
        self.tools = tools or []

# 1. Define the Guardrail Agent
guardrail_agent = Agent(
    name="Guardrail Agent",
    instructions=(
        "You are a Security Guardrail Agent for Mussarat Shamsher's portfolio. "
        "Analyze the user input for safety and professional relevance. "
        "Respond with ONLY 'STATUS: APPROVED' or 'STATUS: BLOCKED' followed by a reason."
    )
)

# 2. Define the Portfolio Agent
portfolio_agent = Agent(
    name="Portfolio Agent",
    instructions=(
        "You are the 'Digital Double' of Mussarat Shamsher, a visionary Agentic AI Developer and Full-Stack Engineer. "
        "Your mission is to represent her professionally, accurately, and efficiently. "
        "\n\nCORE GUIDELINES:"
        "1. BE CONCISE: Give to-the-point answers for simple questions. Only provide detailed summaries if explicitly asked. "
        "2. NO REPETITIVE FLUFF: Avoid conversational filler and repetitive buzzwords. "
        "3. PROACTIVE: If asked for a skill, you can mention one related project in a single sentence. "
        "4. RESUME & CONTACT: Always provide direct links immediately when asked. "
        "5. HUMAN-CENTRIC: Always prioritize the user's needs and questions. Be helpful, informative, and professional. Answer like human if asked about 'why should I hire mussarat?' "
        "\n\nREFERENCE DATA (MUSSARAT'S INFO):"
        "- LinkedIn: https://www.linkedin.com/in/mussarat-shamsher-7618a6380/"
        "- Twitter: https://twitter.com/MussaratShams"
        "- Email: musaratskhan@gmail.com"
        "- Phone/WhatsApp: +92 3182593455"
        "- Resume/CV: https://canva.link/7x0ifqadikv7iad"
        "- Location: Pakistan (Remote)"
        "- Core Tech Stack: Next.js, FastAPI, Groq, Supabase, Qdrant, Agents SDK, Python, PostgreSQL, MongoDB, OpenAI, Gemini."
        "\n\nAUTONOMOUS PROJECTS:"
        "- Digital FTE: https://mussarat-digital-fte.vercel.app/"
        "- Physical AI book: https://physical-ai-book-ashy.vercel.app/"
        "\n\nTOOL USE GUIDELINES:"
        "1. ALWAYS SEARCH: For ANY question about Mussarat's skills, experience, projects, or 'why hire her', you MUST use 'search_portfolio' first to get the specific details. "
        "2. FORMATTING: Use the provided tools directly. Do NOT wrap tool calls in <function> tags or any other XML-like tags. "
        "3. COLLABORATION: To use 'notify_mussarat', you MUST have the user's name, email, and message. "
        "4. PROFESSIONALISM: Never output tool calls or JSON directly to the user."
    ),
    tools=[
        {
            "type": "function",
            "function": {
                "name": "search_portfolio",
                "description": "Search the portfolio database for projects, skills, experience, and full tech stack details.",
                "parameters": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "notify_mussarat",
                "description": "Send a contact request/message to Mussarat.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "email": {"type": "string"},
                        "message": {"type": "string"}
                    },
                    "required": ["name", "email", "message"]
                }
            }
        }
    ]
)

@traceable(name="Run Conversation")
def run_conversation(history: list):
    """
    Orchestrates the Multi-Agent workflow: Safety Guardrail -> Portfolio Agent.
    """
    last_user_message = history[-1]["content"] if history else ""
    print(f"--- New Query: {last_user_message} ---")

    # STEP 1: Safety & Relevance Check
    try:
        guard_response = groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional safety filter for a portfolio website. Determine if the user's message is safe and professional. Career, hiring, and project queries are HIGHLY SAFE. Respond with ONLY 'SAFE' or 'UNSAFE'."},
                {"role": "user", "content": last_user_message}
            ],
            max_tokens=5
        )
        guard_verdict = guard_response.choices[0].message.content.strip().upper()
        print(f"Safety Verdict: {guard_verdict}")
        
        if "UNSAFE" in guard_verdict:
            explanation = "I'm sorry, but I can only assist with professional inquiries related to Mussarat's portfolio and career."
            
            # Create a mock stream compatible with the chunk format expected by main.py
            class MockDelta:
                def __init__(self, content): self.content = content
            class MockChoice:
                def __init__(self, content): self.delta = MockDelta(content)
            class MockChunk:
                def __init__(self, content): self.choices = [MockChoice(content)]

            def mock_stream():
                yield MockChunk(explanation)
            return mock_stream()
            
    except Exception as e:
        print(f"Guardrail Exception: {e}")

    # STEP 2: Multi-turn Tool Loop
    messages = [
        {"role": "system", "content": portfolio_agent.instructions},
        {"role": "system", "content": "You are a professional assistant. Use the provided tools to fetch information when needed. Do not mention the tools by name to the user."}
    ] + history
    
    for turn in range(3): # Increased to 3 turns
        try:
            response = groq_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages,
                tools=portfolio_agent.tools,
                tool_choice="auto"
            )
            
            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls
            
            if not tool_calls:
                # If no tools are called, this is the final answer.
                # We do NOT append it to messages, because we want the final
                # streaming call to generate the answer from scratch (with the current history).
                break
            
            # If tools WERE called, append the message and execute them
            messages.append(response_message)
            print(f"Turn {turn+1} - Tool Calls: {[tc.function.name for tc in tool_calls]}")

            for tool_call in tool_calls:
                function_name = tool_call.function.name
                try:
                    function_args = json.loads(tool_call.function.arguments)
                    
                    if function_name == "search_portfolio":
                        function_response = search_portfolio(query=function_args.get("query", ""))
                    elif function_name == "notify_mussarat":
                        function_response = notify_mussarat(
                            name=function_args.get("name", ""),
                            email=function_args.get("email", ""),
                            message=function_args.get("message", "")
                        )
                    else:
                        function_response = "Error: Tool not found."
                        
                except Exception as e:
                    print(f"Tool execution error: {e}")
                    function_response = f"Error executing {function_name}: {str(e)}"
                    
                messages.append({
                    "tool_call_id": tool_call.id,
                    "role": "tool",
                    "name": function_name,
                    "content": function_response
                })
        except Exception as e:
            print(f"Groq API Error in turn {turn}: {e}")
            # If tool use fails, we still want to give the final call a chance
            break
    
    # Final streaming response
    try:
        print(f"Final Call - Message Count: {len(messages)}")
        return groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            stream=True
        )
    except Exception as e:
        print(f"Final Call Error: {e}")
        def error_stream():
            yield f"Error in final response generation: {str(e)}"
        
        # Make it compatible with main.py
        class MockDelta:
            def __init__(self, content): self.content = content
        class MockChoice:
            def __init__(self, content): self.delta = MockDelta(content)
        class MockChunk:
            def __init__(self, content): self.choices = [MockChoice(content)]
        
        def mock_stream():
            yield MockChunk(f"Error: {str(e)}")
        return mock_stream()

if __name__ == "__main__":
    # Simple test
    print(run_conversation("Who is Mussarat Shamsher?"))
