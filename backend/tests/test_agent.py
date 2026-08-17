import os
os.environ.setdefault("GROQ_API_KEY", "test-key")
os.environ.setdefault("SUPABASE_URL", "")
os.environ.setdefault("SUPABASE_KEY", "")
os.environ.setdefault("HUGGINGFACE_API_KEY", "test-key")

from unittest.mock import patch, MagicMock
from agent import search_portfolio, notify_mussarat


def test_search_portfolio_short_query():
    result = search_portfolio("h")
    assert result == "Please provide a more specific search query."


def test_search_portfolio_no_supabase():
    with patch("agent.supabase", None):
        result = search_portfolio("who is mussarat")
        assert "Portfolio search is currently unavailable" in result


@patch("agent.get_embedding", return_value=[0.1, 0.2, 0.3])
def test_search_portfolio_with_results(mock_embed):
    mock_supabase = MagicMock()
    mock_supabase.rpc.return_value.execute.return_value.data = [
        {"content": "Mussarat is an AI developer.", "similarity": 0.95}
    ]

    with patch("agent.supabase", mock_supabase):
        result = search_portfolio("mussarat skills")
        assert "Mussarat is an AI developer." in result
        assert "[Score: 0.95]" in result


@patch("agent.get_embedding", return_value=[0.1, 0.2, 0.3])
def test_search_portfolio_no_results(mock_embed):
    mock_supabase = MagicMock()
    mock_supabase.rpc.return_value.execute.return_value.data = []

    with patch("agent.supabase", mock_supabase):
        result = search_portfolio("nonexistent topic")
        assert "No specific information found" in result


def test_notify_mussarat_missing_config():
    with patch.dict(os.environ, {"EMAILJS_SERVICE_ID": "", "EMAILJS_PUBLIC_KEY": ""}):
        result = notify_mussarat("Test", "test@test.com", "Hello")
        assert "Email service is not configured" in result


@patch("agent.requests.post")
def test_notify_mussarat_success(mock_post):
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.text = "OK"
    mock_post.return_value = mock_response

    with patch.dict(os.environ, {
        "EMAILJS_SERVICE_ID": "service_123",
        "EMAILJS_PUBLIC_KEY": "public_123",
        "EMAILJS_PRIVATE_KEY": "private_123",
        "EMAILJS_TEMPLATE_ID": "template_123"
    }):
        result = notify_mussarat("Test User", "test@example.com", "Hello there!")
        assert "Notification sent successfully" in result
