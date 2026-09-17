def test_health_check_endpoint(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "agrivision-backend"

def test_ready_probe_endpoint(client):
    response = client.get("/api/ready")
    assert response.status_code == 200
    data = response.json()
    assert "ready" in data

def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["app"] == "AgriVision AI Platform API"
