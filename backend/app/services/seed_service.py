class SeedDrillService:
    @staticmethod
    def calculate_seed_rate(target_population_per_sqm: int, test_weight_grams: float, germination_pct: float) -> float:
        """
        Calculates recommended seed rate in kg/ha based on plant population density,
        1,000-grain test weight, and seed germination percentage.
        """
        target_plants_per_ha = target_population_per_sqm * 10000.0
        total_grams = target_plants_per_ha * (test_weight_grams / 1000.0)
        total_kg = total_grams / 1000.0
        rate_kg_ha = total_kg / (germination_pct / 100.0)
        return round(rate_kg_ha, 1)

seed_service = SeedDrillService()
