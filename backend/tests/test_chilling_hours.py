from app.services.thermal_degree_cooling import thermal_chilling_service

def test_chilling_hours_accumulation():
    temps = [2.5, 4.0, 6.8, 8.5, 1.0, -1.0, 5.5]
    chilling = thermal_chilling_service.calculate_daily_chilling_hours(temps)
    assert chilling == 5
