class NitrogenEfficiencyService:
    def calculate_pfpn(self, grain_yield_kg_ha: float, applied_n_kg_ha: float) -> float:
        # Partial Factor Productivity of Nitrogen: kg grain per kg N applied
        if applied_n_kg_ha <= 0:
            return 0.0
        return round(grain_yield_kg_ha / applied_n_kg_ha, 2)

    def calculate_agronomic_efficiency(self, yield_fertilized_kg: float, yield_unfertilized_kg: float, applied_n_kg: float) -> float:
        if applied_n_kg <= 0:
            return 0.0
        return round((yield_fertilized_kg - yield_unfertilized_kg) / applied_n_kg, 2)

nitrogen_efficiency_service = NitrogenEfficiencyService()
