from app.services.carbon_service import carbon_service

def test_avoided_diesel():
    co2 = carbon_service.estimate_avoided_diesel_co2(100.0)
    assert co2 == 420.0
