class EvaporationDeficitService:
    def estimate_eto_hargreaves(self, t_min_c: float, t_max_c: float, extraterrestrial_rad_mm: float) -> float:
        t_mean = (t_max_c + t_min_c) / 2.0
        t_range = max(0.0, t_max_c - t_min_c)
        # Hargreaves-Samani formula: 0.0023 * (Tmean + 17.8) * sqrt(Trange) * Ra
        eto = 0.0023 * (t_mean + 17.8) * (t_range ** 0.5) * extraterrestrial_rad_mm
        return round(eto, 2)

evaporation_service = EvaporationDeficitService()
