# AgriVision — REST API Specification

Base URL: `http://localhost:8000/api/v1`

## 1. Authentication Endpoints
- `POST /auth/login`
  - Body: `{ "email": "user@example.com", "password": "string" }`
  - Returns: `{ "access_token": "JWT_TOKEN", "token_type": "bearer", "role": "farmer" }`
- `POST /auth/register`
  - Body: `{ "full_name": "string", "email": "string", "phone": "string", "role": "farmer" }`

## 2. Farm Health & 3D Spatial Endpoints
- `GET /farms/{farm_id}/health-summary`
  - Returns: Current health score (0-100), NDVI index, water stress percentage, active disease alerts.
- `GET /farms/{farm_id}/3d-spatial-mesh`
  - Returns: 3D GeoJSON boundary coordinates, elevation bounds, and zone segmentation masks.

## 3. Drone Mission & Telemetry Endpoints
- `GET /drones/{drone_id}/telemetry/live`
  - Returns: Altitude (m), ground speed (m/s), battery (%), RTK GPS lock, heading degree.
- `POST /drones/missions/plan`
  - Body: `{ "farm_id": 1, "flight_altitude": 18.0, "overlap_ratio": 0.75, "sensor_type": "multispectral" }`
  - Returns: Generated lawnmower flight waypoints with estimated duration.

## 4. ML Inference Endpoints
- `POST /ml/predict-disease`
  - Multipart form upload with drone image file.
  - Returns: Detected disease classes, confidence scores, bounding boxes, and prescribed chemical treatment.
