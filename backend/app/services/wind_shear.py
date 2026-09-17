class WindShearService:
    @staticmethod
    def extrapolate_wind_at_drone_altitude(speed_at_2m: float, drone_alt_m: float = 18.0) -> float:
        # Power law wind profile (alpha = 0.14 for open agricultural fields)
        return round(speed_at_2m * ((drone_alt_m / 2.0) ** 0.14), 2)

wind_shear_service = WindShearService()
