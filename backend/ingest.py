import os
import json
import re
from dotenv import load_dotenv
from supabase import create_client, Client
import requests

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
HF_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"  # 384 dimensions

# Initialize model once
_model = None

def get_embeddings(text):
    """
    Generate embeddings using local sentence-transformers.
    """
    global _model
    try:
        from sentence_transformers import SentenceTransformer
        if _model is None:
            print(f"Loading embedding model: {HF_MODEL}...")
            _model = SentenceTransformer(HF_MODEL)
        return _model.encode(text).tolist()
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
                timeout=30
            )
            response.raise_for_status()
            return response.json()
        except Exception as api_e:
            print(f"API embedding error: {api_e}")
            return None

from pypdf import PdfReader

def parse_pdf(file_path):
    """
    Extracts text from a PDF file and returns it as chunks.
    """
    if not os.path.exists(file_path):
        return []
    
    print(f"Reading PDF: {file_path}")
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    # Simple chunking: Split by double newlines or every 1000 characters
    raw_chunks = text.split("\n\n")
    chunks = []
    for rc in raw_chunks:
        if len(rc.strip()) > 50:
            chunks.append({
                "content": f"Resume Content:\n{rc.strip()}",
                "metadata": {"type": "resume", "source": "resume.pdf"}
            })
    return chunks

def parse_portfolio_data(file_path):
    """
    Parses the PortfolioData.tsx file and extracts meaningful text chunks.
    """
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    chunks = []
    
    # 1. Extract Basic Profile Info
    name_match = re.search(r'name: "(.*?)",', content)
    role_match = re.search(r'role: "(.*?)",', content)
    tagline_match = re.search(r'tagline: "(.*?)",', content)
    email_match = re.search(r'email: "(.*?)",', content)
    phone_match = re.search(r'phone: "(.*?)",', content)
    location_match = re.search(r'location: "(.*?)",', content)
    
    profile_summary = ""
    if name_match and role_match:
        profile_summary = f"Mussarat Shamsher's Portfolio\nRole: {role_match.group(1)}\nTagline: {tagline_match.group(1) if tagline_match else ''}\n"
    
    contact_info = f"Contact Information:\nEmail: {email_match.group(1) if email_match else 'Not listed'}\nPhone: {phone_match.group(1) if phone_match else 'Not listed'}\nLocation: {location_match.group(1) if location_match else 'Pakistan'}"
    chunks.append({
        "content": contact_info,
        "metadata": {"type": "contact_info"}
    })

    # 1b. Extract Socials
    socials_match = re.search(r'socials: \{(.*?)\}', content, re.DOTALL)
    if socials_match:
        socials_text = socials_match.group(1)
        social_links = re.findall(r'(\w+): "(.*?)"', socials_text)
        social_info = "Social Media Profiles:\n" + "\n".join([f"{k.capitalize()}: {v}" for k, v in social_links])
        chunks.append({
            "content": social_info,
            "metadata": {"type": "socials"}
        })

    # 2. Extract Skills
    skills_match = re.search(r'skills: \[(.*?)\]', content, re.DOTALL)
    skills_text = ""
    if skills_match:
        skills_list = re.findall(r'"(.*?)"', skills_match.group(1))
        skills_text = f"Core Technical Skills and Tech Stack: {', '.join(skills_list)}"
        chunks.append({
            "content": skills_text,
            "metadata": {"type": "skills"}
        })
        profile_summary += f"\n{skills_text}\n"

    # 2b. Extract Expertise
    expertise_match = re.search(r'expertise: \[(.*?)\]', content, re.DOTALL)
    if expertise_match:
        expertise_entries = re.findall(r'title: "(.*?)",.*?desc: "(.*?)",.*?tags: \[(.*?)\]', expertise_match.group(1), re.DOTALL)
        for title, desc, tags_raw in expertise_entries:
            tags = re.findall(r'"(.*?)"', tags_raw)
            expertise_content = f"Expertise Area: {title}\nDescription: {desc}\nKey Tech: {', '.join(tags)}"
            chunks.append({
                "content": expertise_content,
                "metadata": {"type": "expertise", "title": title}
            })

    # 3. Extract Services
    services_match = re.search(r'services: \[(.*?)\]', content, re.DOTALL)
    if services_match:
        services_text = services_match.group(1)
        # Handle cases with or without icon
        service_items = re.findall(r'title: "(.*?)", desc: "(.*?)"', services_text)
        service_summary = "Professional Services: " + ", ".join([t for t, d in service_items])
        profile_summary += f"\n{service_summary}\n"
        for title, desc in service_items:
            chunks.append({
                "content": f"Service: {title}\nDescription: {desc}",
                "metadata": {"type": "service", "title": title}
            })

    # 4. Extract Projects
    projects_match = re.search(r'projects: \[(.*?)\]\s*,\s*\}\s*;\s*export', content, re.DOTALL)
    if not projects_match:
        # Fallback for different export styles
        projects_match = re.search(r'projects: \[(.*?)\]', content, re.DOTALL)
    
    if projects_match:
        projects_text = projects_match.group(1)
        project_titles = []
        # Split by individual project objects
        project_parts = re.split(r'\{\s*slug:', projects_text)
        for part in project_parts:
            if not part.strip(): continue
            # Re-add prefix for matching
            part_content = "slug:" + part
            
            slug = re.search(r'slug: "(.*?)"', part_content)
            title = re.search(r'title: "(.*?)"', part_content)
            desc = re.search(r'desc: "(.*?)"', part_content)
            tags = re.search(r'tags: \[(.*?)\]', part_content, re.DOTALL)
            long_desc = re.search(r'longDescription: "(.*?)"', part_content, re.DOTALL)
            challenges = re.search(r'challenges: \[(.*?)\]', part_content, re.DOTALL)
            solution = re.search(r'solution: "(.*?)"', part_content, re.DOTALL)
            link = re.search(r'link: "(.*?)"', part_content)
            
            p_title = title.group(1) if title else (slug.group(1) if slug else 'Unknown')
            project_titles.append(p_title)
            
            project_content = f"Project: {p_title}\n"
            if link:
                project_content += f"Live Link: {link.group(1)}\n"
            if tags:
                tag_list = re.findall(r'"(.*?)"', tags.group(1))
                project_content += f"Tech Stack / Tags: {', '.join(tag_list)}\n"
            if desc:
                project_content += f"Brief: {desc.group(1)}\n"
            if long_desc:
                cleaned_long_desc = long_desc.group(1).replace('\\n', ' ').replace('\n', ' ').replace('  ', ' ').strip()
                project_content += f"Detailed Description: {cleaned_long_desc}\n"
            if challenges:
                challenges_list = re.findall(r'"(.*?)"', challenges.group(1))
                project_content += f"Challenges faced: {', '.join(challenges_list)}\n"
            if solution:
                project_content += f"Solution implemented: {solution.group(1)}"
            
            chunks.append({
                "content": project_content.strip(),
                "metadata": {"type": "project", "slug": slug.group(1) if slug else "unknown", "title": p_title}
            })
        
        profile_summary += f"\nKey Projects: {', '.join(project_titles)}\n"

    # Add a final "Master Overview" chunk so the AI always knows the "Big Picture"
    chunks.append({
        "content": f"Master Portfolio Summary for Mussarat Shamsher:\n{profile_summary.strip()}",
        "metadata": {"type": "master_summary"}
    })

    return chunks

def main():
    """
    Main ingestion loop.
    """
    print("--- Starting RAG Ingestion ---")
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("Missing SUPABASE_URL or SUPABASE_KEY in .env. Skipping DB upsert.")
        db_enabled = False
    else:
        db_enabled = True
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

    # Path to the data file (relative to backend dir)
    portfolio_path = os.path.join("..", "src", "components", "ui", "PortfolioData.tsx")
    resume_path = "resume.pdf"
    
    chunks = parse_portfolio_data(portfolio_path)
    
    # Add PDF chunks if file exists
    if os.path.exists(resume_path):
        resume_chunks = parse_pdf(resume_path)
        chunks.extend(resume_chunks)
        print(f"Added {len(resume_chunks)} chunks from {resume_path}")

    print(f"Total chunks to process: {len(chunks)}")

    for i, chunk in enumerate(chunks):
        print(f"[{i+1}/{len(chunks)}] Processing: {chunk['metadata'].get('title', chunk['metadata'].get('type'))}")
        
        embedding = get_embeddings(chunk['content'])
        
        if embedding and db_enabled:
            data = {
                "content": chunk['content'],
                "metadata": chunk['metadata'],
                "embedding": embedding
            }
            try:
                # Assuming table 'portfolio_embeddings' exists with pgvector
                supabase.table("portfolio_embeddings").insert(data).execute()
                print(f"Successfully ingested to Supabase.")
            except Exception as e:
                print(f"Supabase Error: {e}")
                print("Make sure you have run the pgvector setup SQL.")
        elif not embedding:
            print("Skipping due to embedding failure.")
        else:
            print("Skipping DB upsert (Credentials missing).")

    print("--- Ingestion Complete ---")

if __name__ == "__main__":
    main()

"""
SQL for Supabase (Run this in Supabase SQL Editor):

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
"""
