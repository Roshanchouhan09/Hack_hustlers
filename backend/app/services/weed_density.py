from typing import Dict, Any

class WeedDensityClassifier:
    @staticmethod
    def classify_infestation(weed_pixels_pct: float) -> Dict[str, Any]:
        if weed_pixels_pct < 2.0: return {"risk": "LOW", "action": "Manual rogueing"}
        if weed_pixels_pct < 8.0: return {"risk": "MEDIUM", "action": "Targeted spot herbicide"}
        return {"risk": "HIGH", "action": "Broadcast post-emergence herbicide"}

weed_density_classifier = WeedDensityClassifier()
