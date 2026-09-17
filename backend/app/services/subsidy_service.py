from typing import List, Dict, Any

class SubsidyAdvisorService:
    def get_eligible_subsidies(self, state: str, land_acres: float) -> List[Dict[str, Any]]:
        return [
            {"scheme": "Sub-Mission on Agricultural Mechanization (SMAM)", "subsidy_pct": 50, "max_amount_rs": 400000},
            {"scheme": "PM Krishi Sinchayee Yojana (Drip Subsidy)", "subsidy_pct": 55, "max_amount_rs": 45000}
        ]

subsidy_service = SubsidyAdvisorService()
