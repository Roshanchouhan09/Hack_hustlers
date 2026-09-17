class SeedDrillService:
    @staticmethod
    def calculate_seed_rate(target_population_per_sqm: int, test_weight_grams: float, germination_pct: float) -> float:
        rate_kg_ha = (target_population_per_sqm * test_weight_grams * 100) / (germination_pct * 1000)
        return round(rate_kg_ha, 1)

seed_service = SeedDrillService()
