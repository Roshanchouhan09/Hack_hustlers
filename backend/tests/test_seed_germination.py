from app.services.seed_germination import seed_viability_service

def test_seed_viability_percentage():
    pct = seed_viability_service.calculate_tetrazolium_vigor(92, 100)
    assert pct == 92.0
