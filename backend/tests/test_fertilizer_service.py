from app.services.fertilizer_service import fertilizer_engine

def test_wheat_fertilizer_dosage():
    res = fertilizer_engine.calculate_dosage("Wheat", 10.0)
    assert res["urea_kg"] == 1150.0
    assert res["dap_kg"] == 550.0
