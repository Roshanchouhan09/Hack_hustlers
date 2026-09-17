class SeedViabilityService:
    @staticmethod
    def calculate_tetrazolium_vigor(viable_count: int, total_seeds: int) -> float:
        if total_seeds == 0: return 0.0
        return round((viable_count / total_seeds) * 100.0, 1)

seed_viability_service = SeedViabilityService()
