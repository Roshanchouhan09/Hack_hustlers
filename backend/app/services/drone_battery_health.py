from typing import Dict, Any

class DroneBatteryHealthService:
    @staticmethod
    def evaluate_cell_deviation(cell_voltages: list) -> Dict[str, Any]:
        if not cell_voltages: return {"status": "UNKNOWN"}
        delta = max(cell_voltages) - min(cell_voltages)
        return {
            "max_delta_mv": round(delta * 1000, 1),
            "health": "HEALTHY" if delta < 0.030 else "DEGRADED"
        }

drone_battery_service = DroneBatteryHealthService()
