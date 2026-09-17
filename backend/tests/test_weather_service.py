from app.services.weather_service import weather_service

def test_optimal_spraying_window():
    eval_res = weather_service.calculate_spraying_window(
        temperature_c=24.0,
        humidity_pct=75.0,
        wind_speed_kmh=8.0,
        rain_prob=10.0
    )
    assert eval_res["status"] == "OPTIMAL_SAFE_WINDOW"
    assert eval_res["safety_score"] >= 90
    assert eval_res["is_wind_safe"] is True
    assert eval_res["is_rain_safe"] is True

def test_high_wind_spraying_prohibited():
    eval_res = weather_service.calculate_spraying_window(
        temperature_c=24.0,
        humidity_pct=75.0,
        wind_speed_kmh=24.0,
        rain_prob=10.0
    )
    assert eval_res["status"] == "UNSAFE_DRIFT_RISK"
    assert eval_res["safety_score"] < 50
    assert eval_res["is_wind_safe"] is False

def test_rain_risk_spraying_prohibited():
    eval_res = weather_service.calculate_spraying_window(
        temperature_c=22.0,
        humidity_pct=85.0,
        wind_speed_kmh=5.0,
        rain_prob=70.0
    )
    assert eval_res["status"] == "UNSAFE_RAIN_RISK"
    assert eval_res["is_rain_safe"] is False

if __name__ == "__main__":
    test_optimal_spraying_window()
    test_high_wind_spraying_prohibited()
    test_rain_risk_spraying_prohibited()
    print("All weather service tests passed!")
