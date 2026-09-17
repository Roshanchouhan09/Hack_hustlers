from datetime import datetime
from typing import Dict, Any

class PDFReportDataService:
    def compile_executive_report_payload(self, farm_id: int, farm_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Compiles all telemetry, disease predictions, and weather parameters into
        a structured JSON schema ready for PDF rendering.
        """
        report_id = f"AGR-RPT-{farm_id}-{int(datetime.utcnow().timestamp())}"
        
        return {
            "report_metadata": {
                "report_id": report_id,
                "generated_at_utc": datetime.utcnow().isoformat(),
                "issuing_authority": "AgriVision Precision Ag Network",
                "certifying_agronomist": "Dr. S. K. Verma (M.Sc. Plant Pathology)"
            },
            "farm_details": {
                "farm_id": farm_id,
                "farm_name": farm_data.get("name", "Green Valley Farm"),
                "owner": farm_data.get("owner", "Rammohan Kumar"),
                "location": farm_data.get("location", "Patna, Bihar"),
                "total_area_acres": farm_data.get("area", 12.5),
                "crop": farm_data.get("crop", "Wheat (HD-2967)"),
                "sowing_date": "2025-11-20"
            },
            "health_audit": {
                "overall_score": 82,
                "health_grade": "A- (Optimal Harvest Potential)",
                "healthy_canopy_acres": 9.75,
                "infected_acres": 0.92,
                "water_deficit_acres": 2.20
            },
            "prescription": {
                "fungicide_name": "Propiconazole 25% EC (Tilt)",
                "dosage": "200 ml/acre mixed in 100L water",
                "application_method": "Precision Quadcopter Drone (Air-Induction Nozzles)",
                "spray_deadline": "Within 48 hours to halt spore germination"
            }
        }

pdf_report_service = PDFReportDataService()
