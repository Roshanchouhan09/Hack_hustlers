class CanopyDensityService:
    @staticmethod
    def compute_leaf_area_index(ndvi: float) -> float:
        if ndvi < 0.1: return 0.0
        return round(0.57 * (2.718 ** (2.33 * ndvi)), 2)

canopy_density_service = CanopyDensityService()
