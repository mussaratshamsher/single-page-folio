import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_conversation, notify_mussarat
from dotenv import load_dotenv
from fastapi.responses import StreamingResponse
from typing import List, Optional

# Load environment variables
from typing import List, Optional, Literal

app = FastAPI(title="Mussarat Shamsher Portfolio AI API")

# Enable CORS
origins = [
    "https://mussarat-web-dev.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    recaptcha_token: Optional[str] = None

@app.get("/")
async def root():
    return {"status": "online", "message": "Portfolio AI Backend is running with Streaming support."}
 
@app.post("/chat")
async def chat(request: ChatRequest):
    """
    Endpoint for the RAG Chatbot with History and Streaming.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages cannot be empty.")

    try:
        # Convert Pydantic models to dicts for the Groq client
        history = [msg.model_dump() for msg in request.messages]

        # Generator for streaming
        def generate():
            try:
                stream = run_conversation(history)
                for chunk in stream:
                    if not hasattr(chunk, "choices") or not chunk.choices:
                        continue

                    choice = chunk.choices[0]

                    # 1. Handle Streaming Chunk (has 'delta')
                    if hasattr(choice, "delta"):
                        content = getattr(choice.delta, "content", None)
                        if content:
                            yield content

                    # 2. Handle Non-streaming Chunk (has 'message')
                    elif hasattr(choice, "message"):
                        content = getattr(choice.message, "content", None)
                        if content:
                            yield content
                            
            except Exception as e:
                import traceback
                print(f"Streaming error: {e}")
                traceback.print_exc()
                yield f"Error: {str(e)}"

        return StreamingResponse(generate(), media_type="text/plain")
    except Exception as e:
        print(f"Chat error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while processing your request.")

@app.post("/contact")
async def contact(request: ContactRequest):

    """
    Endpoint for the contact form.
    """
    if not request.name or not request.email or not request.message:
        raise HTTPException(status_code=400, detail="All fields are required.")
    
    try:
        result = notify_mussarat(request.name, request.email, request.message, request.recaptcha_token)
        return {"result": result}
    except Exception as e:
        print(f"Contact error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while sending your message.")

if __name__ == "__main__":
    import uvicorn
    # Get port from environment or default to 7860 (HF Spaces default)
    port = int(os.getenv("PORT", 7860))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
