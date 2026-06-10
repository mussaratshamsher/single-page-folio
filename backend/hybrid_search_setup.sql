-- Step 1: Enable extensions and create table if not already done
create extension if not exists vector;

-- Step 2: Add full-text search capabilities to the table
-- We add a generated column for the text search vector
alter table portfolio_embeddings 
add column if not exists fts tsvector 
generated always as (to_tsvector('english', content)) stored;

-- Step 3: Create a GIN index for the fts column
create index if not exists portfolio_embeddings_fts_idx on portfolio_embeddings using gin(fts);

-- Step 4: Create the Hybrid Search RPC function
create or replace function hybrid_search_portfolio (
  query_text text,
  query_embedding vector(384),
  match_threshold float,
  match_count int,
  full_text_weight float default 0.5,
  vector_weight float default 0.5
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
  with vector_matches as (
    select
      portfolio_embeddings.id,
      1 - (portfolio_embeddings.embedding <=> query_embedding) as similarity
    from portfolio_embeddings
    where 1 - (portfolio_embeddings.embedding <=> query_embedding) > match_threshold
    order by portfolio_embeddings.embedding <=> query_embedding
    limit match_count
  ),
  fts_matches as (
    select
      portfolio_embeddings.id,
      ts_rank_cd(portfolio_embeddings.fts, websearch_to_tsquery('english', query_text)) as rank
    from portfolio_embeddings
    where portfolio_embeddings.fts @@ websearch_to_tsquery('english', query_text)
    limit match_count
  )
  select
    portfolio_embeddings.id,
    portfolio_embeddings.content,
    portfolio_embeddings.metadata,
    (coalesce(vector_matches.similarity, 0) * vector_weight + coalesce(fts_matches.rank, 0) * full_text_weight) as similarity
  from portfolio_embeddings
  left join vector_matches on portfolio_embeddings.id = vector_matches.id
  left join fts_matches on portfolio_embeddings.id = fts_matches.id
  where vector_matches.id is not null or fts_matches.id is not null
  order by similarity desc
  limit match_count;
end;
$$;
