from app.services.degree_days import gdd_service

def test_growing_degree_days_accumulation():
    gdd = gdd_service.compute_gdd(t_max=28.0, t_min=16.0, base_temp=5.0)
    assert gdd == 17.0
