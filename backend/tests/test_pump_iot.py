from app.services.pump_iot_service import pump_iot_service

def test_pump_telemetry_flow():
    res = pump_iot_service.parse_telemetry(raw_voltage=230.0, raw_current=15.0)
    assert res["status"] == "PUMPING"
    assert res["power_kw"] > 3.0
