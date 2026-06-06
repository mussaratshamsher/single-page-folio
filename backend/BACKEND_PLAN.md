# AI Portfolio Backend: Professional Execution Plan

## 1. Project Overview
An autonomous, high-performance AI backend designed to power a RAG (Retrieval-Augmented Generation) Chatbot and an intelligent Email Handling Employee for the portfolio of Mussarat Shamsher.

**Core Objectives:**
- **Separate Architecture:** Backend isolated in `backend/` directory.
- **RAG Integration:** Knowledge base derived from `PortfolioData.tsx` and PDF Resume.
- **Intelligent Routing:** Using Groq for multi-step reasoning and tool calling.
- **Free-Tier Stability:** Using Supabase (pgvector) for persistence and EmailJS for notifications.

---

## 2. Tech Stack (Free Tier Professional)
- **Language:** Python 3.10+
- **Framework:** FastAPI
- **Agent Logic:** OpenAI Agents SDK (for orchestration and multi-agent workflows)
- **LLM:** Groq API (Model: `llama3-70b-8192` via OpenAI-compatible endpoint)
- **Vector DB:** Supabase with `pgvector` extension
- **Embeddings:** Hugging Face Inference API
- **Email Bridge:** EmailJS (via REST API)

---

## 3. Advanced Agentic Architecture
- **Multi-Agent Setup:** 
    - **Inquiry Agent:** Handles contact form analysis and email triggers.
    - **RAG Agent:** Specializes in retrieving portfolio/resume facts.
    - **Guardrail Agent:** Intercepts inputs/outputs to ensure safety.

---

## 4. Safety & Security Guardrails
### 4.1 Input Guardrails
- **Prompt Injection Protection:** Sanitizing user inputs to prevent system prompt overrides.
- **PII Filtering:** Redacting sensitive personal info before sending to the LLM.
- **Topic Control:** Restricting the agent to portfolio, career, and project-related discussions.

### 4.2 Output Guardrails
- **Fact-Checking:** Validating that links and project details exist in the knowledge base.
- **Hallucination Check:** Ensuring the agent doesn't "invent" projects or skills.
- **Toxicity Filter:** Ensuring professional and respectful responses.

### 4.3 Security Measures
- **CORS Policy:** Restricting API access strictly to your portfolio domain.
- **Rate Limiting:** Preventing API abuse and cost spikes.
- **Encrypted Secrets:** No hardcoded keys; all handled via environment variables.

---

## 5. Token Optimization & Context Management
### 5.1 Efficient Retrieval (RAG)
- **Semantic Search:** Only fetch the top 3-5 most relevant text chunks from Supabase instead of the whole portfolio.
- **Metadata Filtering:** Use project tags or categories to narrow down the search space before querying the vector DB.

### 5.2 Context Compression
- **Summarization:** When retrieving project details, use a fast model (`llama3-8b`) to summarize the info before passing it to the main reasoning agent.
- **Dynamic Context Window:** Only include the last 3-5 turns of conversation to keep the prompt size small.

### 5.3 Model Routing
- **Task-Based Routing:** 
    - Use `llama3-8b` for simple Q&A, greetings, and data summarization.
    - Use `llama3-70b` only for complex multi-step reasoning, tool calling, or intent analysis.

---

## 6. Implementation Steps (Task List)

### Phase 1: Environment & Setup
- [ ] Initialize Python virtual environment.
- [ ] Create `requirements.txt` with: `fastapi`, `uvicorn`, `groq`, `supabase`, `pydantic`, `pypdf`, `sentence-transformers`.
- [ ] Configure `.env` with provided API keys.

### Phase 2: RAG Ingestion (The "Brain")
- [ ] Enable `pgvector` on Supabase.
- [ ] Develop `ingest.py` to:
    - Parse `PortfolioData.tsx` (converted to JSON/Markdown).
    - Extract text from `resume.pdf`.
    - Chunk text and generate embeddings.
    - Upsert to Supabase.

### Phase 3: Groq Agent & Tool Calling
- [ ] Build the Groq client in `agent.py`.
- [ ] Define Tools:
    - `search_portfolio`: Queries Supabase for projects/info.
    - `notify_mussarat`: Triggers EmailJS for site inquiries.
- [ ] Implement multi-step reasoning: "If user asks for CV, trigger EmailJS to notify me."

### Phase 4: Email Automation Bridge
- [ ] Configure `email_service.py` to call EmailJS REST API.
- [ ] Logic: Portfolio Agent sends **Inquiry Alert** -> Mussarat's Gmail Agent sends **Auto-Response**.

### Phase 5: API Deployment
- [ ] Create FastAPI routes for `/api/chat` and `/api/contact`.
- [ ] Add CORS middleware to allow the Next.js frontend to communicate.

---

## 7. Security & Persistence Mandates
- **No Deletion:** Supabase ensures data persistence even on free tier.
- **Credentials:** All keys MUST stay in `.env`.
- **Validation:** Every tool call must be logged for debugging.

---

## 8. Execution Command
To begin the execution, read this file and start with **Phase 1: Environment & Setup**.
