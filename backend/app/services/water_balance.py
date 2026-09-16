class WaterBalanceService:
    @staticmethod
    def compute_daily_depletion(et0: float, kc: float, rain_mm: float) -> float:
        etc = et0 * kc
        effective_rain = rain_mm * 0.8
        return round(max(0.0, etc - effective_rain), 2)

water_balance_service = WaterBalanceService()
