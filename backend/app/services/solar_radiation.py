class SolarRadiationService:
    @staticmethod
    def compute_daily_par(solar_irradiance_wm2: float, sunshine_hours: float) -> float:
        # 1 W/m2 ≈ 2.1 umol/m2/s PAR
        total_mols = (solar_irradiance_wm2 * 2.1 * sunshine_hours * 3600) / 1000000.0
        return round(total_mols, 2)

solar_radiation_service = SolarRadiationService()
