---
title: Mussarat Shamsher Portfolio AI Backend
emoji: 🤖
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---

# Mussarat Shamsher Portfolio AI Backend

This is the autonomous AI backend for Mussarat Shamsher's portfolio, powered by FastAPI, Groq, and Supabase.

## Features
- **RAG Chatbot:** Intelligent answers based on portfolio data and projects.
- **Agentic reasoning:** Uses Groq's Llama 3 model for tool calling and multi-step reasoning.
- **Contact Automation:** Integrated with EmailJS for real-time inquiry notifications.
- **Vector Search:** Uses Supabase (pgvector) for semantic retrieval of portfolio facts.

## Setup Instructions

### 1. Environment Setup
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# or
source venv/bin/activate # Linux/Mac

pip install -r requirements.txt
```

### 2. Configuration
Copy `.env` and fill in your API keys:
- `GROQ_API_KEY`: From Groq Console.
- `SUPABASE_URL` & `SUPABASE_KEY`: From Supabase Project Settings.
- `HUGGINGFACE_API_KEY`: For generating embeddings (or leave blank to use local fallback).
- `EMAILJS_...`: From your EmailJS dashboard.

### 3. Supabase Setup
Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable the pgvector extension
create extension if not exists vector;

-- Create the table
create table if not exists portfolio_embeddings (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(384)
);

-- Search function
create or replace function match_portfolio_embeddings (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    portfolio_embeddings.id,
    portfolio_embeddings.content,
    portfolio_embeddings.metadata,
    1 - (portfolio_embeddings.embedding <=> query_embedding) as similarity
  from portfolio_embeddings
  where 1 - (portfolio_embeddings.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
```

### 4. Data Ingestion
Run the ingestion script to populate your vector database:
```bash
python ingest.py
```

### 5. Start the Server
```bash
python main.py
```
The API will be available at `http://localhost:8000`.

## API Endpoints
- `POST /api/chat`: Send `{"message": "..."}` to chat with the agent.
- `POST /api/contact`: Send `{"name": "...", "email": "...", "message": "..."}` for contact inquiries.
