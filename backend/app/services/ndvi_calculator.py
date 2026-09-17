class NDVICalculator:
    @staticmethod
    def compute_ndvi(nir_reflectance: float, red_reflectance: float) -> float:
        denom = nir_reflectance + red_reflectance
        if denom == 0: return 0.0
        return round((nir_reflectance - red_reflectance) / denom, 3)

ndvi_calculator = NDVICalculator()
