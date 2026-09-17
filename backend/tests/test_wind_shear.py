from app.services.wind_shear import wind_shear_service

def test_wind_extrapolation_at_flight_altitude():
    spd = wind_shear_service.extrapolate_wind_at_drone_altitude(speed_at_2m=10.0, drone_alt_m=18.0)
    assert spd > 10.0
