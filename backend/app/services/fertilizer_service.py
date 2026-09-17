from typing import Dict, Any

class FertilizerEngine:
    def calculate_dosage(self, crop: str, acres: float) -> Dict[str, float]:
        if crop.lower() == "wheat":
            return {"urea_kg": acres * 115.0, "dap_kg": acres * 55.0, "mop_kg": acres * 40.0}
        return {"urea_kg": acres * 100.0, "dap_kg": acres * 50.0, "mop_kg": acres * 35.0}

fertilizer_engine = FertilizerEngine()
