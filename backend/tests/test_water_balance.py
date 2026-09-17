from app.services.water_balance import water_balance_service

def test_daily_water_depletion():
    dep = water_balance_service.compute_daily_depletion(et0=4.5, kc=1.15, rain_mm=0.0)
    assert dep > 5.0
