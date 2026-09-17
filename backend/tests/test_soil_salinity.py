from app.services.soil_salinity_service import soil_salinity_service

def test_osmotic_potential():
    pot = soil_salinity_service.calculate_osmotic_potential_bar(ec_dsm=4.0)
    assert pot == -1.44

def test_wheat_yield_penalty_below_threshold():
    penalty = soil_salinity_service.calculate_wheat_yield_penalty_pct(ec_dsm=5.0)
    assert penalty == 0.0

def test_wheat_yield_penalty_above_threshold():
    penalty = soil_salinity_service.calculate_wheat_yield_penalty_pct(ec_dsm=8.0)
    assert penalty == 14.2
