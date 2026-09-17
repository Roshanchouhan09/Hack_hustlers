from pydantic import BaseModel
from typing import Optional

class DroneFlightLog(BaseModel):
    drone_id: str
    pilot_license: str
    acres_sprayed: float
    battery_cycles_used: int
    chemical_active_ingredient: Optional[str] = None
    flight_duration_minutes: float
