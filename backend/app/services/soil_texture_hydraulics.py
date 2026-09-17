from typing import Dict, Any

class SoilHydraulicsService:
    @staticmethod
    def get_water_constants(soil_type: str) -> Dict[str, float]:
        if "alluvial" in soil_type.lower():
            return {"field_capacity_pct": 28.0, "wilting_point_pct": 12.0, "available_water_pct": 16.0}
        return {"field_capacity_pct": 36.0, "wilting_point_pct": 20.0, "available_water_pct": 16.0}

soil_hydraulics_service = SoilHydraulicsService()
