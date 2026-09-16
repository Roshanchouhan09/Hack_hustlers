class SoilBufferService:
    @staticmethod
    def calculate_lime_requirement(initial_ph: float, target_ph: float, buffer_ph: float) -> float:
        deficit = target_ph - initial_ph
        if deficit <= 0: return 0.0
        return round(deficit * 1.85, 2)

soil_buffer_service = SoilBufferService()
