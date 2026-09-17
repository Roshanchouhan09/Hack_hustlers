class SoilSalinityService:
    def calculate_osmotic_potential_bar(self, ec_dsm: float) -> float:
        # Approximate osmotic potential: -0.36 * ECe (bars)
        return round(-0.36 * ec_dsm, 2)

    def calculate_wheat_yield_penalty_pct(self, ec_dsm: float, threshold_ec = 6.0, slope_pct = 7.1) -> float:
        if ec_dsm <= threshold_ec:
            return 0.0
        penalty = (ec_dsm - threshold_ec) * slope_pct
        return round(min(100.0, penalty), 1)

soil_salinity_service = SoilSalinityService()
