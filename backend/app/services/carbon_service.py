class CarbonOffsetEstimator:
    @staticmethod
    def estimate_avoided_diesel_co2(acres_sprayed: float) -> float:
        # Avoids 4.2 kg CO2 per acre by replacing 50HP tractor with battery drone
        return round(acres_sprayed * 4.2, 1)

carbon_service = CarbonOffsetEstimator()
