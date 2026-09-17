class GeoCalculator:
    @staticmethod
    def approx_acres_from_coords(width_meters: float, length_meters: float) -> float:
        sq_meters = width_meters * length_meters
        return round(sq_meters / 4046.86, 2)

geo_calculator = GeoCalculator()
