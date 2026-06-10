import os
import pytest
from deepeval import assert_test
from deepeval.test_case import LLMTestCase
from deepeval.metrics import AnswerRelevancyMetric, FaithfulnessMetric
from agent import run_conversation

# This script demonstrates how to evaluate your AI Agent using DeepEval.
# To run this, you will need to:
# 1. Install dependencies: pip install deepeval
# 2. Set up your OPENAI_API_KEY (DeepEval metrics use an LLM to grade responses)
# 3. Run: pytest eval_agent.py

def get_agent_response(user_query):
    """Helper to get a full response from the streaming agent."""
    history = [{"role": "user", "content": user_query}]
    try:
        stream = run_conversation(history)
        full_response = ""
        for chunk in stream:
            # Handle both MockResponse and real Groq chunks
            if hasattr(chunk, "choices") and chunk.choices:
                choice = chunk.choices[0]
                if hasattr(choice, "delta"):
                    content = getattr(choice.delta, "content", None)
                    if content:
                        full_response += content
                elif hasattr(choice, "message"):
                    content = getattr(choice.message, "content", None)
                    if content:
                        full_response += content
        return full_response
    except Exception as e:
        return f"Error: {str(e)}"

@pytest.mark.parametrize("query, expected_context", [
    (
        "What is Mussarat's tech stack?", 
        ["Next.js, FastAPI, Groq, Supabase, Qdrant, Docusaurus, and Agents SDK."]
    ),
    (
        "How can I contact Mussarat?", 
        ["Email: musaratskhan@gmail.com, LinkedIn: https://www.linkedin.com/in/mussarat-shamsher-7618a6380/"]
    )
])
def test_agent_performance(query, expected_context):
    """
    Test the agent for Answer Relevancy and Faithfulness.
    """
    actual_output = get_agent_response(query)
    
    test_case = LLMTestCase(
        input=query,
        actual_output=actual_output,
        retrieval_context=expected_context
    )
    
    # We set a professional threshold of 0.7 (70%)
    relevancy_metric = AnswerRelevancyMetric(threshold=0.7)
    faithfulness_metric = FaithfulnessMetric(threshold=0.7)

    assert_test(test_case, [relevancy_metric, faithfulness_metric])

if __name__ == "__main__":
    print("--- Professional Evaluation Suite ---")
    print("Usage: Run 'pytest eval_agent.py' to execute the benchmarks.")
