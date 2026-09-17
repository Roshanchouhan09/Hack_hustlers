# AgriVision — AI-Powered Precision Agriculture Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/Roshanchouhan09/Hack_hustlers)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016%20(Turbopack)-black.svg)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20Python-009688.svg)](https://fastapi.tiangolo.com/)
[![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20WebGL-blue.svg)](https://threejs.org/)
[![YOLOv8](https://img.shields.io/badge/AI%20Model-YOLOv8%20PyTorch-orange.svg)](https://ultralytics.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

AgriVision is an enterprise-grade, full-stack, multilingual precision-agriculture platform designed for farmers, FPOs, drone operators, agronomists, and agribusiness organizations across India.

---

## Key Innovations

### 1. 3D Spatial Farm Digital Twin ([Three.js](https://threejs.org/))
- **Interactive 3D Field Mesh**: Real-time terrain elevation, soil boundaries, and chlorophyll vegetation layers.
- **Autonomous Drone Simulation**: 3D DJI Agras T40 quadcopter executing automated lawnmower survey flight paths with spinning propellers and FAA navigation strobes.
- **LiDAR Multispectral Scanning Cone**: Dynamic laser scan pyramid actively projecting onto crop canopies with ground sweep radar.
- **Drone Telemetry HUD**: Real-time altitude, ground speed, battery consumption, and RTK GPS fix indicators.
- **Lighting & Spectral Shaders**: Golden hour sunlight, night thermal infrared, and NDVI false-color heatmaps.

### 2. AI Computer Vision Pipeline (YOLOv8)
- Millimeter-level leaf disease segmentation (e.g. *Puccinia striiformis* / Yellow Rust with 91% confidence).
- Automated disease severity grading (Stages 1-4) and spot-spraying chemical dosage calculation.

### 3. Voice-First Multilingual Access
- Built-in speech recognition and audio synthesizer supporting **Hindi**, **Bhojpuri**, and **English** for regional Indian farmers.

### 4. Precision Drone Booking & Weather Radar
- Pay-per-scan marketplace connecting DGCA-certified drone pilots with smallholder farmers.
- Micro-climate weather radar evaluating wind gust drift and Delta T evaporation indexes.

---

## Documentation & Jury Evaluation Kit

| Document | Description |
|---|---|
| 📖 [**Judges Evaluation Guide**](docs/JUDGES_GUIDE.md) | 5-minute live demo walkthrough, test credentials, and feature checklist |
| 🚀 [**Hackathon Pitch Deck**](docs/PITCH_DECK.md) | Problem statement, TAM/SAM/SOM market size, unit economics, and moat |
| 🏛️ [**System Architecture**](docs/ARCHITECTURE.md) | End-to-end data flow diagram, microservices breakdown, and contracts |
| 📡 [**REST API Specification**](docs/API_SPECIFICATION.md) | Comprehensive API endpoint reference, schemas, and error codes |
| 🌾 [**Farmer Personas & Impact**](docs/PERSONAS_AND_IMPACT.md) | Smallholder farmer case studies across Bihar, Punjab, and Maharashtra |
| 💰 [**Sustainability & ROI Model**](docs/SUSTAINABILITY_ROI_MODEL.md) | Chemical reduction savings, ESG metrics, and carbon offset calculations |
| 🎤 [**3-Minute Winning Pitch Script**](docs/HACKATHON_DEMO_SCRIPT.md) | Word-for-word pitch presentation script with slide cues |

---

## Architecture Overview

```text
agrivision/
├── frontend/               # Next.js 16 App Router, React 19, Three.js, Tailwind CSS v4, Recharts
│   └── src/
│       ├── components/     # Farm3DViewer, WheatLeaf3DInspector, FarmMap, WeatherSprayRadar
│       └── lib/            # Health calculator, voice vocabulary, API client
├── backend/                # FastAPI Python REST API, SQLAlchemy models, Rate limiting
│   ├── app/
│   │   ├── api/            # REST endpoints (health, weather, farms, telemetry)
│   │   ├── services/       # AI engine, weather service, spatial 3D, telemetry
│   │   └── database/       # Multi-state seed data generator (Punjab, Bihar, MH, KA, WB)
│   └── tests/              # Pytest test suite (unit, integration, fixtures)
├── ml/                     # Computer Vision & PyTorch/YOLO inference contracts
├── docs/                   # Full Hackathon Documentation & Pitch Kit
├── .github/workflows/      # Automated CI/CD (Frontend build, Backend pytest, Docker build)
├── docker-compose.yml      # Multi-container orchestration with healthchecks
└── README.md
```

---

## Quick Start Guide

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
Navigate to [http://localhost:3000/farms/1/health-map](http://localhost:3000/farms/1/health-map) for the **3D Farm Digital Twin**.

### Backend
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
Interactive Swagger API documentation available at [http://localhost:8000/docs](http://localhost:8000/docs).

### Automated Tests
```bash
# Backend pytest suite
cd backend
pytest

# Frontend build check
cd frontend
npm run build
```
