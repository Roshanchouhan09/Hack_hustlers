class ThermalTimeService:
    def calculate_thermal_time(self, t_max: float, t_min: float, t_base = 5.0, t_cutoff = 35.0) -> float:
        # Cap t_max at biological upper cutoff to model heat shock stress
        capped_tmax = min(t_max, t_cutoff)
        capped_tmin = max(t_min, t_base)
        t_mean = (capped_tmax + capped_tmin) / 2.0
        return max(0.0, round(t_mean - t_base, 2))

thermal_time_service = ThermalTimeService()
