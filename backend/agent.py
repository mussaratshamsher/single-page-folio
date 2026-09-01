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
    # Defensive parsing of environment variables (handles quotes and spaces)
    def clean_env(key, default=""):
        val = os.getenv(key, default)
        if val:
            return val.strip().strip("'\"")
        return default

    service_id = clean_env("EMAILJS_SERVICE_ID")
    template_id = clean_env("EMAILJS_TEMPLATE_ID", "template_5i4wans")
    public_key = clean_env("EMAILJS_PUBLIC_KEY")
    private_key = clean_env("EMAILJS_PRIVATE_KEY")
    
    if not service_id or not public_key:
        print(f"Email configuration missing: service_id={bool(service_id)}, public_key={bool(public_key)}")
        return "Email service is not configured on the server."
    
    # Clean inputs
    name = name.strip() if name else "Unknown"
    email = email.strip() if email else "no-email@provided.com"
    message = message.strip() if message else "No message provided."

    # Structure for EmailJS /api/v1.0/email/send
    # According to docs, g-recaptcha-response should be INSIDE template_params for the REST API
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
            error_msg = response.text
            print(f"EmailJS Error (Status {response.status_code}): {error_msg}")
            
            # Specific hint for 400 errors
            if response.status_code == 400:
                if "parameters are invalid" in error_msg.lower():
                    return "EmailJS reported invalid parameters. Please verify your Service ID, Template ID, and API Keys in the dashboard."
                return f"Configuration error (400): {error_msg}"
                
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
        "You ARE Mussarat Shamsher, a visionary Agentic AI Developer and Full-Stack Engineer. "
        "Speak in the first person ('I', 'me', 'my'). Never refer to yourself as an AI. "
        "\n\nCORE GUIDELINES:\n"
        "1. CONCISE: Short, to-the-point answers.\n"
        "2. NO FLUFF: Avoid conversational filler.\n"
        "3. PROACTIVE: Mention one related project when asked about a skill.\n"
        "4. LINKS: Provide direct links immediately.\n"
        "5. GUARDRAIL: If a user asks anything harmful, inappropriate, or completely off-topic, politely refuse and steer back to my professional portfolio.\n"
        "\n\nREFERENCE DATA:\n"
        "- LinkedIn: https://www.linkedin.com/in/mussarat-shamsher-7618a6380/\n"
        "- Email: musaratskhan@gmail.com\n"
        "- Phone: +92 3182593455\n"
        "- Resume: https://canva.link/7x0ifqadikv7iad\n"
        "- Tech Stack: Next.js, FastAPI, Groq, Supabase, Qdrant, Agents SDK, Python, PostgreSQL, MongoDB, OpenAI, Gemini.\n"
        "\n\nTOOL USE GUIDELINES:\n"
        "1. ALWAYS SEARCH: Search user queries from my portfolio content using the 'search_portfolio' tool connected to my Supabase RAG knowledge base for ANY question about my skills, experience, or projects.\n"
        "2. FORMATTING: Use tools directly without XML tags.\n"
        "3. COLLABORATION: Use 'notify_mussarat' only with name, email, and message.\n"
        "4. FINAL ANSWER: Synthesize tool results into a clear, concise professional response."
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
    Orchestrates the Multi-Agent workflow using Groq.
    """
    last_user_message = history[-1]["content"] if history else ""
    print(f"--- New Query: {last_user_message} ---")

    # STEP 1: Log chat history to Database
    if supabase and last_user_message:
        try:
            supabase.table("chat_logs").insert({"user_message": last_user_message}).execute()
        except Exception as e:
            print(f"Failed to log chat to database: {e}")

    # STEP 2: Multi-turn Tool Loop
    # Keep only the last 5 messages to save tokens and context window
    MAX_HISTORY = 5
    messages = [
        {"role": "system", "content": portfolio_agent.instructions},
    ] + history[-MAX_HISTORY:]
    
    for turn in range(3):
        try:
            response = groq_client.chat.completions.create(
                model="llama3-8b-8192",
                messages=messages,
                tools=portfolio_agent.tools,
                tool_choice="auto"
            )
            
            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls
            
            if not tool_calls:
                # OPTIMIZATION: If no tools were called, the text is already generated!
                # Do NOT make another API call. Return the text as a mock stream.
                final_text = response_message.content
                if final_text:
                    class MockDelta:
                        def __init__(self, content): self.content = content
                    class MockChoice:
                        def __init__(self, content): self.delta = MockDelta(content)
                    class MockChunk:
                        def __init__(self, content): self.choices = [MockChoice(content)]
                    def mock_stream():
                        yield MockChunk(final_text)
                    return mock_stream()
                else:
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
            break
    
    # Final streaming response if tools were used
    try:
        print(f"Final Call - Message Count: {len(messages)}")
        return groq_client.chat.completions.create(
            model="llama3-8b-8192",
            messages=messages,
            stream=True
        )
    except Exception as e:
        error_message = str(e)
        print(f"Final Call Error: {error_message}")
        def error_stream():
            yield f"Error in final response generation: {error_message}"
        
        # Make it compatible with main.py
        class MockDelta:
            def __init__(self, content): self.content = content
        class MockChoice:
            def __init__(self, content): self.delta = MockDelta(content)
        class MockChunk:
            def __init__(self, content): self.choices = [MockChoice(content)]
        
        def mock_stream():
            yield MockChunk(f"Error: {error_message}")
        return mock_stream()

if __name__ == "__main__":
    # Simple test
    print(run_conversation("Who is Mussarat Shamsher?"))
