from app.services.drone_battery_health import drone_battery_service

def test_healthy_battery_cell_balance():
    res = drone_battery_service.evaluate_cell_deviation([4.18, 4.19, 4.18, 4.19])
    assert res["health"] == "HEALTHY"
