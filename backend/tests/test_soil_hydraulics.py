from app.services.soil_texture_hydraulics import soil_hydraulics_service

def test_alluvial_soil_available_water():
    res = soil_hydraulics_service.get_water_constants("Alluvial Loam")
    assert res["available_water_pct"] == 16.0
