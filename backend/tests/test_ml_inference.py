import pytest
from app.services.ai_engine import BoundingBoxFormatter, ai_service

def test_bounding_box_pixel_conversion():
    norm_box = {"x_min": 0.1, "y_min": 0.2, "x_max": 0.5, "y_max": 0.6, "label": "Yellow Rust", "confidence": 0.92}
    result = BoundingBoxFormatter.format_box_to_pixels(norm_box, img_w=1000, img_h=1000)

    assert result["pixel_coords"]["x"] == 100
    assert result["pixel_coords"]["y"] == 200
    assert result["pixel_coords"]["width"] == 400
    assert result["pixel_coords"]["height"] == 400

def test_disease_severity_grading():
    stage1 = BoundingBoxFormatter.classify_severity(3.5)
    assert stage1["grade"] == "STAGE_1_EARLY_ONSET"

    stage2 = BoundingBoxFormatter.classify_severity(12.0)
    assert stage2["grade"] == "STAGE_2_MODERATE_SPREAD"

    stage4 = BoundingBoxFormatter.classify_severity(45.0)
    assert stage4["grade"] == "STAGE_4_CATASTROPHIC"

def test_ai_service_scan_image():
    result = ai_service.process_scan_image("sample_path.jpg", crop_type="Wheat")
    assert "health_score" in result
    assert result["health_score"] > 0
    assert result["disease_detected"] is True
    assert len(result["bounding_boxes"]) > 0
