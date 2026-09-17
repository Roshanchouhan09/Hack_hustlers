from typing import Dict, Any, List

class Spatial3DService:
    def get_digital_twin_metadata(self, farm_id: int) -> Dict[str, Any]:
        """
        Provides 3D spatial boundaries, terrain elevation bounds, and health segmentation
        coordinates for Three.js rendering.
        """
        return {
            "farm_id": farm_id,
            "farm_name": "Green Valley Farm",
            "location": "Patna, Bihar",
            "total_area_acres": 12.5,
            "terrain": {
                "grid_size": [50, 50],
                "elevation_base_m": 53.2,
                "elevation_variance_m": 1.4,
                "soil_type": "Alluvial Loam (Indo-Gangetic Plain)",
                "ph_level": 6.8
            },
            "zones_3d": [
                {
                    "zone_id": "zone-healthy",
                    "label": "North Block A — Healthy Wheat",
                    "color_hex": "#10b981",
                    "center_local_coords": [-9.0, 0.0, 0.0],
                    "dimensions": [28.0, 44.0],
                    "ndvi_mean": 0.78,
                    "chlorophyll_index": 0.74,
                    "crop_status": "OPTIMAL"
                },
                {
                    "zone_id": "zone-yellow-rust",
                    "label": "North Block A — Yellow Rust Hotspot",
                    "color_hex": "#ef4444",
                    "center_local_coords": [13.0, 0.0, -11.0],
                    "dimensions": [16.0, 18.0],
                    "pathogen": "Puccinia striiformis",
                    "ai_confidence_score": 0.91,
                    "affected_area_acres": 0.92,
                    "crop_status": "HIGH_RISK_INFECTION"
                },
                {
                    "zone_id": "zone-water-stress",
                    "label": "Eastern Quad — Moisture Deficit",
                    "color_hex": "#3b82f6",
                    "center_local_coords": [13.0, 0.0, 10.0],
                    "dimensions": [16.0, 22.0],
                    "soil_moisture_pct": 42.0,
                    "drought_severity": "MODERATE",
                    "crop_status": "WATER_DEFICIT"
                }
            ]
        }

spatial_3d_service = Spatial3DService()
