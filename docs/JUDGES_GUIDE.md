# AgriVision — Hackathon Judge's Evaluation Guide

Welcome Judges! This guide provides a rapid 5-minute evaluation checklist, pre-configured demo credentials, and highlights of technical innovation.

---

## 1. Five-Minute Live Demo Walkthrough

### Step 1: 3D Digital Twin & Autonomous Drone (The "WOW" Factor)
- **URL**: `http://localhost:3000/farms/1/health-map`
- **What to Observe**:
  1. Full **3D Farm Digital Twin** with realistic terrain, crop furrows, and soil bed.
  2. Autonomous **Quadcopter Drone** flying a lawnmower waypoint pattern with spinning rotors and navigation LEDs.
  3. **LiDAR / Multispectral Laser Scanning Cone** actively projecting onto the crop canopy with real-time ground sweep radar.
  4. Live **Telemetry HUD** showing dynamic altitude, ground speed, battery %, and scanned acreage.
  5. Camera Presets: Click **Drone Chase** for first-person flight tracking, or **Disease Hotspot** to zoom directly into the fungal infection.
  6. Toggle to **2D Map** using the top switcher to verify dual-mode flexibility.

### Step 2: AI Disease Detection Pipeline
- **URL**: `http://localhost:3000/analysis/101`
- **What to Observe**:
  - YOLOv8 bounding box overlay identifying **Yellow Rust (Puccinia striiformis)** with 91% confidence score.
  - Severity metric (7.4% infected area across 0.92 acres).
  - Recommended chemical dosage and autonomous spraying window based on weather intelligence.

### Step 3: Multilingual Voice Assistant
- Click the **Voice Assistant** floating button on any page.
- Select **Hindi**, **Bhojpuri**, or **English**.
- Ask: *"Fasal me kaun sa rog hai?"* (What disease is in my crop?) to hear synthesized spoken audio guidance.

---

## 2. Test User Accounts
All roles have pre-seeded test data:
| Role | Email | Password | Access Area |
|---|---|---|---|
| **Farmer** | `farmer@agrivision.com` | `password123` | Farm Health, Drone Booking, PDF Report |
| **Drone Operator** | `operator@agrivision.com` | `password123` | Flight Missions, Battery Health, Pay-per-scan |
| **Agronomist** | `expert@agrivision.com` | `password123` | Disease Validation, Chemical Prescriptions |
| **FPO Admin** | `admin@agrivision.com` | `password123` | Aggregate Village Analytics, Fleet Tracking |
