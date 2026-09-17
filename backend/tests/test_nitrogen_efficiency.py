from app.services.nitrogen_use_efficiency import nitrogen_efficiency_service

def test_pfpn_benchmark():
    pfpn = nitrogen_efficiency_service.calculate_pfpn(grain_yield_kg_ha=5200.0, applied_n_kg_ha=120.0)
    assert pfpn == 43.33

def test_agronomic_efficiency():
    ae = nitrogen_efficiency_service.calculate_agronomic_efficiency(
        yield_fertilized_kg=5000.0,
        yield_unfertilized_kg=3200.0,
        applied_n_kg=100.0
    )
    assert ae == 18.0
