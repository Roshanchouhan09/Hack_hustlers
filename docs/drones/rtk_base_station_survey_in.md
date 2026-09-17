# RTK GNSS Base Station Survey-In & NTRIP Setup

Centimeter-level positioning for agricultural survey drones requires strict base station convergence:
- **Minimum Duration**: 15 minutes of uninterrupted satellite observation.
- **Accuracy Threshold**: 3D position variance < 0.8 meters before switching to fixed RTCM3 broadcast.
- **Satellite Constellation**: Concurrent multi-band tracking across GPS (L1/L2), GLONASS (G1/G2), Galileo (E1/E5b), and BeiDou (B1I/B2I).
- **Mount Height**: Minimum 2.5 meters above local canopy to eliminate multipath ground reflections.
