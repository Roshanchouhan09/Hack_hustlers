# AgriVision — System Architecture & Data Flow

AgriVision is an enterprise-ready precision agriculture platform combining autonomous drone telemetry, computer vision disease segmentation, and 3D spatial digital twins.

## 1. High-Level Architecture

```text
+-------------------------------------------------------------------------------+
|                                CLIENT TIER                                    |
|                                                                               |
|   +--------------------------+   +----------------------------------------+   |
|   |   Web App (Next.js 16)   |   |   3D Farm Digital Twin (Three.js)      |   |
|   |   - Responsive UI        |   |   - Soil elevation & canopy shaders    |   |
|   |   - Multilingual Voice   |   |   - Autonomous drone flight physics    |   |
|   |   - Dynamic Health Gauge |   |   - Real-time LiDAR scanning cone      |   |
|   +--------------------------+   +----------------------------------------+   |
+-------------------------------------------------------------------------------+
                                      |  REST / WebSockets
                                      v
+-------------------------------------------------------------------------------+
|                                BACKEND TIER                                   |
|                                                                               |
|   +-----------------------------------------------------------------------+   |
|   |   FastAPI Application Gateway (Port 8000)                             |   |
|   |   - JWT Authentication & RBAC (Farmer, Operator, Agronomist, FPO)     |   |
|   |   - Spraying Window Advisory Algorithm (Weather matrix)               |   |
|   |   - Dynamic PDF Report Engine (html2canvas / jspdf)                   |   |
|   |   - Drone Mission Telemetry Dispatcher                                |   |
|   +-----------------------------------------------------------------------+   |
+-------------------------------------------------------------------------------+
                 |                                      |
                 v                                      v
+---------------------------------+   +-----------------------------------------+
|           DATA LAYER            |   |               ML PIPELINE               |
|                                 |   |                                         |
|  - SQLite / PostgreSQL (25 tbl) |   |  - YOLOv8 Crop Disease Model            |
|  - Farm spatial boundaries      |   |  - Puccinia striiformis (Yellow Rust)   |
|  - Pilot profiles & drone fleet |   |  - Water stress estimation matrix       |
+---------------------------------+   +-----------------------------------------+
```

## 2. Core Detection & Treatment Workflow

```text
[ Drone Flight ] ---> [ Multispectral Imagery ] ---> [ YOLOv8 Inference ]
       |                                                    |
       v                                                    v
[ 3D LiDAR Map ] <----------------------------- [ Heatmap Generation ]
       |
       +---> [ AI Agronomist Action Plan ] ---> [ Precision Spray Booking ]
```

## 3. Technology Stack Breakdown
- **Frontend**: Next.js 16, React 19, Tailwind CSS v4, Three.js, Lucide Icons, Recharts.
- **Backend**: FastAPI, Python 3.11+, SQLAlchemy, SQLite/PostgreSQL, Pydantic v2.
- **ML / AI**: YOLOv8 PyTorch inference pipeline, OpenCV image processing.
- **DevOps**: Docker, Docker Compose, GitHub Actions CI/CD.
