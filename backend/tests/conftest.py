import pytest
from fastapi.testclient import TestClient
from app.main import app

@pytest.fixture(scope="session")
def client():
    """
    TestClient fixture for FastAPI endpoint testing.
    """
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def sample_wheat_image_payload():
    return {
        "farm_id": 1,
        "crop_type": "Wheat",
        "image_path": "static/samples/wheat_rust_sample.jpg"
    }
