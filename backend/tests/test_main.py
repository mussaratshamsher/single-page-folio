import os
os.environ.setdefault("GROQ_API_KEY", "test-key")
os.environ.setdefault("SUPABASE_URL", "")
os.environ.setdefault("SUPABASE_KEY", "")
os.environ.setdefault("HUGGINGFACE_API_KEY", "test-key")

import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "Portfolio AI Backend" in data["message"]


def test_chat_endpoint_empty_messages():
    response = client.post("/chat", json={"messages": []})
    assert response.status_code == 400


@patch("main.run_conversation")
def test_chat_endpoint_streaming(mock_run_conversation):
    mock_chunk = MagicMock()
    mock_chunk.choices = [MagicMock(delta=MagicMock(content="Hello!"))]
    mock_run_conversation.return_value = iter([mock_chunk])

    response = client.post("/chat", json={
        "messages": [{"role": "user", "content": "hi"}]
    })
    assert response.status_code == 200
    assert response.text == "Hello!"


@patch("main.notify_mussarat")
def test_contact_endpoint_missing_fields(mock_notify):
    response = client.post("/contact", json={"name": "", "email": "", "message": ""})
    assert response.status_code == 400


@patch("main.notify_mussarat")
def test_contact_endpoint_success(mock_notify):
    mock_notify.return_value = "Notification sent successfully. Mussarat will get back to you soon."
    response = client.post("/contact", json={
        "name": "Test User",
        "email": "test@example.com",
        "message": "This is a valid test message with enough words to pass validation."
    })
    assert response.status_code == 200
    data = response.json()
    assert data["result"] == "Notification sent successfully. Mussarat will get back to you soon."
