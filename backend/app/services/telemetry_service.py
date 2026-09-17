import time
import math
from typing import Dict, Any, List

class DroneTelemetryService:
    def __init__(self):
        self.drones = {
            "DRONE-T40-01": {
                "model": "DJI Agras T40",
                "pilot": "Amit Singh",
                "status": "IN_FLIGHT",
                "battery_pct": 84,
                "tank_capacity_l": 40.0,
                "tank_level_l": 28.5,
                "base_lat": 25.6015,
                "base_lng": 85.1240,
                "altitude_m": 18.5,
                "speed_mps": 5.2
            }
        }

    def get_live_telemetry(self, drone_id: str = "DRONE-T40-01") -> Dict[str, Any]:
        """
        Simulates live telemetry stream from drone avionics and RTK positioning unit.
        """
        drone = self.drones.get(drone_id, self.drones["DRONE-T40-01"])
        t = time.time()

        # Dynamic physics simulation
        current_alt = round(drone["altitude_m"] + math.sin(t * 0.8) * 0.4, 2)
        current_speed = round(drone["speed_mps"] + math.cos(t * 0.5) * 0.3, 2)
        heading = int((t * 25) % 360)

        return {
            "drone_id": drone_id,
            "model": drone["model"],
            "pilot": drone["pilot"],
            "status": drone["status"],
            "timestamp": int(t),
            "telemetry": {
                "altitude_m": current_alt,
                "speed_mps": current_speed,
                "heading_deg": heading,
                "battery_pct": drone["battery_pct"],
                "tank_level_l": drone["tank_level_l"],
                "gps": {
                    "lat": round(drone["base_lat"] + math.sin(t * 0.1) * 0.0008, 6),
                    "lng": round(drone["base_lng"] + math.cos(t * 0.1) * 0.0008, 6),
                    "satellites": 16,
                    "fix_type": "RTK_FIXED_HIGH_PRECISION"
                },
                "signal_strength_pct": 96
            }
        }

    def generate_lawnmower_waypoints(
        self,
        boundary_coords: List[Dict[str, float]],
        swath_width_m: float = 6.0,
        altitude_m: float = 18.0
    ) -> List[Dict[str, Any]]:
        """
        Generates survey waypoints with specified swath overlap for agricultural mapping.
        """
        waypoints = []
        for i in range(8):
            waypoints.append({
                "index": i + 1,
                "lat": 25.6015 + (i * 0.0002),
                "lng": 85.1240 + ((i % 2) * 0.0004),
                "altitude_m": altitude_m,
                "action": "SURVEY_MULTI_SPECTRAL"
            })
        return waypoints

telemetry_service = DroneTelemetryService()
