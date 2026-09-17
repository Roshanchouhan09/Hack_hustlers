from typing import Dict, Any

class WeatherService:
    def calculate_spraying_window(
        self,
        temperature_c: float,
        humidity_pct: float,
        wind_speed_kmh: float,
        rain_prob: float
    ) -> Dict[str, Any]:
        """
        Computes agricultural drone spraying viability based on micro-meteorology,
        wind drift dynamics, and Delta T (evaporation potential).
        """
        # Delta T approximation: Delta T = Dry Bulb Temp - Wet Bulb Temp
        # Simplified Delta T index for agricultural spraying:
        delta_t = temperature_c * (1 - (humidity_pct / 100))

        is_wind_safe = 3.0 <= wind_speed_kmh <= 16.0
        is_rain_safe = rain_prob < 35.0
        is_temp_safe = 15.0 <= temperature_c <= 32.0
        is_delta_t_safe = 2.0 <= delta_t <= 8.0

        if not is_rain_safe:
            status = "UNSAFE_RAIN_RISK"
            score = 15
            recommendation = "Rain probability exceeds threshold. Chemical wash-off will occur. Do not spray."
        elif wind_speed_kmh > 18.0:
            status = "UNSAFE_DRIFT_RISK"
            score = 25
            recommendation = "High wind velocity causes severe off-target droplet drift onto neighboring crops."
        elif delta_t > 8.0:
            status = "MARGINAL_HIGH_EVAPORATION"
            score = 60
            recommendation = "Hot/dry air will evaporate droplets before reaching foliage. Use anti-drift coarse nozzles."
        elif is_wind_safe and is_rain_safe and is_temp_safe and is_delta_t_safe:
            status = "OPTIMAL_SAFE_WINDOW"
            score = 95
            recommendation = "Perfect spraying conditions. Optimal droplet retention and maximum canopy absorption."
        else:
            status = "ACCEPTABLE_MODERATE"
            score = 75
            recommendation = "Fair spraying window. Proceed with medium coarse droplet calibration."

        return {
            "status": status,
            "safety_score": score,
            "delta_t": round(delta_t, 2),
            "is_wind_safe": is_wind_safe,
            "is_rain_safe": is_rain_safe,
            "recommendation": recommendation,
            "recommended_nozzle": "Air-Induction Fan (03 Coarse)" if wind_speed_kmh > 12 else "Standard Flat Fan (02 Medium)"
        }

    def get_weather(self, location: str = "Patna, Bihar") -> Dict[str, Any]:
        """
        Retrieves weather data & generates precision agriculture spraying advisories.
        """
        temperature_c = 28.5
        humidity_pct = 72.0
        rain_prob = 15.0
        wind_speed = 8.5
        condition = "Partly Cloudy"

        spraying_evaluation = self.calculate_spraying_window(
            temperature_c=temperature_c,
            humidity_pct=humidity_pct,
            wind_speed_kmh=wind_speed,
            rain_prob=rain_prob
        )

        return {
            "location": location,
            "temperature_c": temperature_c,
            "humidity_pct": humidity_pct,
            "rain_probability_pct": rain_prob,
            "wind_speed_kmh": wind_speed,
            "condition": condition,
            "advisory": spraying_evaluation["recommendation"],
            "spraying_window": spraying_evaluation,
            "forecast_5_days": [
                {"day": "Today", "temp_max": 30, "temp_min": 22, "condition": "Partly Cloudy", "rain": 15},
                {"day": "Tomorrow", "temp_max": 31, "temp_min": 23, "condition": "Sunny", "rain": 5},
                {"day": "Day 3", "temp_max": 29, "temp_min": 21, "condition": "Light Rain", "rain": 45},
                {"day": "Day 4", "temp_max": 28, "temp_min": 20, "condition": "Cloudy", "rain": 20},
                {"day": "Day 5", "temp_max": 32, "temp_min": 24, "condition": "Sunny", "rain": 0},
            ]
        }

weather_service = WeatherService()
