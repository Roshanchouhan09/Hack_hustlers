from app.services.evaporation_deficit import evaporation_service

def test_hargreaves_eto_calculation():
    eto = evaporation_service.estimate_eto_hargreaves(t_min_c=18.0, t_max_c=32.0, extraterrestrial_rad_mm=14.0)
    assert eto > 4.0
