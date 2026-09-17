from app.services.seed_service import seed_service

def test_seed_rate_calibration():
    rate = seed_service.calculate_seed_rate(target_population_per_sqm=300, test_weight_grams=40.0, germination_pct=90.0)
    assert rate > 100.0
