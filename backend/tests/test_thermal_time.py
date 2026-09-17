from app.services.thermal_time_service import thermal_time_service

def test_thermal_time_within_normal_range():
    gdd = thermal_time_service.calculate_thermal_time(t_max=28.0, t_min=12.0, t_base=5.0)
    assert gdd == 15.0

def test_thermal_time_upper_cutoff_capping():
    # Heat stress day: 42°C capped to 35°C
    gdd = thermal_time_service.calculate_thermal_time(t_max=42.0, t_min=20.0, t_base=5.0, t_cutoff=35.0)
    assert gdd == 22.5
