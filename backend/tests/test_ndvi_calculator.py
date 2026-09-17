from app.services.ndvi_calculator import ndvi_calculator

def test_healthy_vegetation_ndvi():
    ndvi = ndvi_calculator.compute_ndvi(nir_reflectance=0.8, red_reflectance=0.1)
    assert ndvi == 0.778
