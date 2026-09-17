class ThermalChillingService:
    def calculate_daily_chilling_hours(self, hourly_temperatures: list[float]) -> int:
        # Standard Weinberger model: hours between 0°C and 7.2°C
        return sum(1 for t in hourly_temperatures if 0.0 <= t <= 7.2)

thermal_chilling_service = ThermalChillingService()
