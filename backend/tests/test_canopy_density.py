from app.services.canopy_density import canopy_density_service

def test_dense_canopy_leaf_area():
    lai = canopy_density_service.compute_leaf_area_index(0.78)
    assert lai > 2.5
