from typing import List, Dict, Any

class MandiPriceService:
    def get_spot_rates(self, state: str = "Bihar") -> List[Dict[str, Any]]:
        return [
            {"mandi": "Patna APMC", "commodity": "Wheat", "modal_price_rs_qtl": 2450, "msp_rs_qtl": 2275},
            {"mandi": "Mokama", "commodity": "Gram (Chana)", "modal_price_rs_qtl": 5800, "msp_rs_qtl": 5440},
            {"mandi": "Muzaffarpur", "commodity": "Maize", "modal_price_rs_qtl": 2150, "msp_rs_qtl": 2090}
        ]

mandi_service = MandiPriceService()
