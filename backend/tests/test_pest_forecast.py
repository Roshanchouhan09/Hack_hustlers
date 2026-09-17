from app.services.pest_forecast_service import pest_forecast_service

def test_high_risk_weather_outbreak():
    res = pest_forecast_service.evaluate_outbreak_risk(humidity=85.0, temp=20.0, rain_days=4)
    assert res["threat_level"] == "HIGH"
