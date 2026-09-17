from app.services.mandi_service import mandi_service

def test_mandi_spot_rates():
    rates = mandi_service.get_spot_rates()
    assert len(rates) > 0
    assert rates[0]["modal_price_rs_qtl"] > rates[0]["msp_rs_qtl"]
