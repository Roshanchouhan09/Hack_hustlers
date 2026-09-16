class GrowingDegreeDays:
    @staticmethod
    def compute_gdd(t_max: float, t_min: float, base_temp: float = 5.0) -> float:
        t_mean = (t_max + t_min) / 2.0
        return round(max(0.0, t_mean - base_temp), 1)

gdd_service = GrowingDegreeDays()
