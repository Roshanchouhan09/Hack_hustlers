from app.services.soil_ph_buffer import soil_buffer_service

def test_lime_deficit_calculation():
    req = soil_buffer_service.calculate_lime_requirement(initial_ph=5.2, target_ph=6.5, buffer_ph=6.0)
    assert req > 2.0
