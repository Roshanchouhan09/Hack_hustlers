from typing import Dict, Any

class PestForecastService:
    def evaluate_outbreak_risk(self, humidity: float, temp: float, rain_days: int) -> Dict[str, Any]:
        risk_score = (humidity * 0.5) + (temp * 0.3) + (rain_days * 5.0)
        is_high = risk_score > 65.0
        return {
            "risk_score": round(risk_score, 1),
            "threat_level": "HIGH" if is_high else "NORMAL",
            "target_pathogen": "Puccinia striiformis (Yellow Rust)" if is_high else "None"
        }

pest_forecast_service = PestForecastService()
