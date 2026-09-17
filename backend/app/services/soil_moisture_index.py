class SoilMoistureIndexService:
    def calculate_ndmi(self, nir_reflectance: float, swir_reflectance: float) -> float:
        denom = nir_reflectance + swir_reflectance
        if denom == 0:
            return 0.0
        return round((nir_reflectance - swir_reflectance) / denom, 3)

    def evaluate_water_stress(self, ndmi: float) -> str:
        if ndmi < 0.1:
            return "SEVERE_WATER_DEFICIT"
        elif ndmi < 0.3:
            return "MILD_STRESS"
        return "OPTIMAL_HYDRATION"

soil_moisture_service = SoilMoistureIndexService()
