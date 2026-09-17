from app.services.soil_moisture_index import soil_moisture_service

def test_ndmi_calculation():
    val = soil_moisture_service.calculate_ndmi(nir_reflectance=0.6, swir_reflectance=0.2)
    assert val == 0.5

def test_water_stress_alert():
    status = soil_moisture_service.evaluate_water_stress(ndmi=0.08)
    assert status == "SEVERE_WATER_DEFICIT"
