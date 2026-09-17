from app.services.solar_radiation import solar_radiation_service

def test_daily_par_accumulation():
    par = solar_radiation_service.compute_daily_par(solar_irradiance_wm2=450.0, sunshine_hours=8.0)
    assert par > 25.0
