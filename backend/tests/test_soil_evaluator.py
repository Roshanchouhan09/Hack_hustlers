from app.services.soil_lab_evaluator import soil_lab_evaluator

def test_soil_ph_neutral():
    res = soil_lab_evaluator.evaluate_ph(6.5)
    assert res == "OPTIMAL_NEUTRAL"
