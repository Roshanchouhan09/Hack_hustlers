from app.services.geo_calc_service import geo_calculator

def test_acre_calculation():
    acres = geo_calculator.approx_acres_from_coords(200.0, 200.0)
    assert 9.0 <= acres <= 11.0
