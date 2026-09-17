from app.services.weed_density import weed_density_classifier

def test_low_weed_infestation():
    res = weed_density_classifier.classify_infestation(1.2)
    assert res["risk"] == "LOW"
