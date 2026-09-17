from typing import Dict, Any

class PumpIoTService:
    def parse_telemetry(self, raw_voltage: float, raw_current: float) -> Dict[str, Any]:
        power_watts = raw_voltage * raw_current
        flow_rate_lpm = (power_watts / 1000.0) * 42.0
        return {
            "power_kw": round(power_watts / 1000.0, 2),
            "flow_rate_lpm": round(flow_rate_lpm, 1),
            "status": "PUMPING" if power_watts > 500 else "STANDBY"
        }

pump_iot_service = PumpIoTService()
