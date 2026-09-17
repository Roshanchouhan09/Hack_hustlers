'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  Layers, AlertTriangle, ShieldCheck, Droplets, Camera,
  Compass, Play, Pause, RotateCcw, Activity, Eye, Info,
  BatteryCharging, Navigation, Wind, CheckCircle2, Crosshair
} from 'lucide-react';

export type CameraPreset = 'orbit' | 'chase' | 'topdown' | 'disease';
export type SpectralMode = 'rgb' | 'ndvi' | 'thermal';

interface ZoneInfo {
  id: string;
  name: string;
  type: 'healthy' | 'disease' | 'water';
  area: string;
  status: string;
  score: string;
  color: string;
  details: string;
  action: string;
}

const ZONES: ZoneInfo[] = [
  {
    id: 'healthy',
    name: 'North Block A — Healthy Wheat Zone',
    type: 'healthy',
    area: '7.8 Acres (62.4%)',
    status: 'Optimal Health',
    score: 'NDVI 0.78',
    color: '#10b981',
    details: 'Dense wheat canopy with strong photosynthetic activity and chlorophyll concentration. Low weed pressure.',
    action: 'No intervention required. Scheduled drone monitoring in 4 days.'
  },
  {
    id: 'disease',
    name: 'North Block A — Yellow Rust Hotspot',
    type: 'disease',
    area: '0.92 Acres (7.4%)',
    status: 'High Fungal Infection',
    score: 'AI Confidence 91%',
    color: '#ef4444',
    details: 'Puccinia striiformis (Yellow Stripe Rust) detected along upper leaf sheaths. Rapid spore dispersal risk under current 72% humidity.',
    action: 'Prescription: Propiconazole 25% EC (200ml/acre) via targeted precision drone spray.'
  },
  {
    id: 'water',
    name: 'Eastern Quad — Moisture Deficit Zone',
    type: 'water',
    area: '2.2 Acres (17.6%)',
    status: 'Moderate Water Stress',
    score: 'Moisture 42%',
    color: '#3b82f6',
    details: 'Sub-surface soil sensor array indicates moisture depletion in root zone (15-25cm depth). Minor leaf curling noted.',
    action: 'Schedule 2.5 hours drip cycle via Sector-3 solenoid valves tonight.'
  }
];

interface Farm3DViewerProps {
  height?: string;
  className?: string;
  onZoneSelect?: (zone: ZoneInfo | null) => void;
}

export const Farm3DViewer: React.FC<Farm3DViewerProps> = ({
  height = '560px',
  className = '',
  onZoneSelect
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('orbit');
  const [spectralMode, setSpectralMode] = useState<SpectralMode>('rgb');
  const [lightingPreset, setLightingPreset] = useState<'noon' | 'golden' | 'night'>('noon');
  const [selectedZone, setSelectedZone] = useState<ZoneInfo | null>(null);

  // Telemetry real-time indicators
  const [telemetry, setTelemetry] = useState({
    altitude: 18.5,
    speed: 5.2,
    battery: 84,
    scannedPercent: 46,
    satellites: 14,
    signal: 'RTK Fix'
  });

  // Mutable refs for Three.js state
  const threeStateRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    droneGroup: THREE.Group;
    propellers: THREE.Mesh[];
    scanBeam: THREE.Mesh;
    scanGroundRing: THREE.Mesh;
    diseaseBeaconRing: THREE.Mesh;
    diseaseHoloBeam: THREE.Mesh;
    healthyMesh: THREE.Mesh;
    diseaseMesh: THREE.Mesh;
    waterMesh: THREE.Mesh;
    materials: {
      healthy: { rgb: THREE.Material; ndvi: THREE.Material; thermal: THREE.Material };
      disease: { rgb: THREE.Material; ndvi: THREE.Material; thermal: THREE.Material };
      water: { rgb: THREE.Material; ndvi: THREE.Material; thermal: THREE.Material };
    };
    droneFlightT: number;
    isPlaying: boolean;
    activeCameraPreset: CameraPreset;
  } | null>(null);

  // Synchronize playing state with animation loop ref
  useEffect(() => {
    if (threeStateRef.current) {
      threeStateRef.current.isPlaying = isPlaying;
    }
  }, [isPlaying]);

  // Synchronize camera preset
  useEffect(() => {
    if (!threeStateRef.current) return;
    const { camera, controls } = threeStateRef.current;
    threeStateRef.current.activeCameraPreset = cameraPreset;

    if (cameraPreset === 'orbit') {
      controls.enabled = true;
      controls.target.set(0, 0, 0);
      camera.position.set(38, 28, 38);
      camera.lookAt(0, 0, 0);
    } else if (cameraPreset === 'topdown') {
      controls.enabled = true;
      controls.target.set(0, 0, 0);
      camera.position.set(0, 65, 0.1);
      camera.lookAt(0, 0, 0);
    } else if (cameraPreset === 'disease') {
      controls.enabled = true;
      // Yellow rust hotspot is at x: 13, z: -11
      controls.target.set(13, 1, -11);
      camera.position.set(19, 10, -3);
      camera.lookAt(13, 1, -11);
      setSelectedZone(ZONES[1]);
      onZoneSelect?.(ZONES[1]);
    } else if (cameraPreset === 'chase') {
      controls.enabled = false;
    }
  }, [cameraPreset, onZoneSelect]);

  // Synchronize spectral mode material swap
  useEffect(() => {
    if (!threeStateRef.current) return;
    const { healthyMesh, diseaseMesh, waterMesh, materials } = threeStateRef.current;

    healthyMesh.material = materials.healthy[spectralMode];
    diseaseMesh.material = materials.disease[spectralMode];
    waterMesh.material = materials.water[spectralMode];
  }, [spectralMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.009);

    const width = container.clientWidth || 800;
    const heightPx = container.clientHeight || 560;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(36, 26, 36);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent camera from dipping below ground
    controls.minDistance = 6;
    controls.maxDistance = 140;
    controls.target.set(0, 0, 0);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xdcfce7, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.8);
    sunLight.position.set(40, 60, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 150;
    sunLight.shadow.camera.left = -35;
    sunLight.shadow.camera.right = 35;
    sunLight.shadow.camera.top = 35;
    sunLight.shadow.camera.bottom = -35;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Subtle blue fill light for cinematic contrast
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x166534, 0.4);
    scene.add(hemiLight);

    // 6. Terrain & Base Field
    // Farm boundaries: 50 x 50 units
    const soilGeo = new THREE.BoxGeometry(52, 1.5, 52);
    const soilMat = new THREE.MeshStandardMaterial({
      color: 0x24180d,
      roughness: 0.95,
      metalness: 0.05
    });
    const soilBase = new THREE.Mesh(soilGeo, soilMat);
    soilBase.position.y = -0.75;
    soilBase.receiveShadow = true;
    scene.add(soilBase);

    // Outer boundary fence & glowing boundary line
    const boundaryPoints = [
      new THREE.Vector3(-25, 0.1, -25),
      new THREE.Vector3(25, 0.1, -25),
      new THREE.Vector3(25, 0.1, 25),
      new THREE.Vector3(-25, 0.1, 25),
      new THREE.Vector3(-25, 0.1, -25)
    ];
    const boundaryGeo = new THREE.BufferGeometry().setFromPoints(boundaryPoints);
    const boundaryMat = new THREE.LineDashedMaterial({
      color: 0x10b981,
      dashSize: 1.5,
      gapSize: 0.8,
      linewidth: 2
    });
    const boundaryLine = new THREE.Line(boundaryGeo, boundaryMat);
    boundaryLine.computeLineDistances();
    scene.add(boundaryLine);

    // Grid helper on soil
    const gridHelper = new THREE.GridHelper(50, 25, 0x059669, 0x1f2937);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 7. MULTI-LAYER SPECTRAL MATERIALS
    const materials = {
      healthy: {
        rgb: new THREE.MeshStandardMaterial({
          color: 0x15803d,
          roughness: 0.65,
          metalness: 0.1
        }),
        ndvi: new THREE.MeshStandardMaterial({
          color: 0x22c55e, // High NDVI bright green
          emissive: 0x14532d,
          emissiveIntensity: 0.3
        }),
        thermal: new THREE.MeshStandardMaterial({
          color: 0x0284c7, // Cool transpiration temperature
          emissive: 0x0369a1,
          emissiveIntensity: 0.2
        })
      },
      disease: {
        rgb: new THREE.MeshStandardMaterial({
          color: 0xca8a04, // Yellow Rust diseased hue
          roughness: 0.8,
          metalness: 0.05
        }),
        ndvi: new THREE.MeshStandardMaterial({
          color: 0xef4444, // Low NDVI red stress
          emissive: 0x7f1d1d,
          emissiveIntensity: 0.6
        }),
        thermal: new THREE.MeshStandardMaterial({
          color: 0xf97316, // Hot transpiration shutdown
          emissive: 0xc2410c,
          emissiveIntensity: 0.5
        })
      },
      water: {
        rgb: new THREE.MeshStandardMaterial({
          color: 0x57534e, // Dry dusty soil
          roughness: 0.9,
          metalness: 0.05
        }),
        ndvi: new THREE.MeshStandardMaterial({
          color: 0xeab308, // Moderate stress yellow
          emissive: 0x713f12,
          emissiveIntensity: 0.4
        }),
        thermal: new THREE.MeshStandardMaterial({
          color: 0xec4899, // Elevated drought temperature
          emissive: 0x9d174d,
          emissiveIntensity: 0.4
        })
      }
    };

    // 8. Farm Zone Meshes
    // Zone 1: Healthy Wheat Zone (covers left half and north)
    const healthyGeo = new THREE.PlaneGeometry(28, 44);
    healthyGeo.rotateX(-Math.PI / 2);
    const healthyMesh = new THREE.Mesh(healthyGeo, materials.healthy.rgb);
    healthyMesh.position.set(-9, 0.05, 0);
    healthyMesh.receiveShadow = true;
    healthyMesh.userData = { zone: ZONES[0] };
    scene.add(healthyMesh);

    // Zone 2: Yellow Rust Hotspot (North-East corner)
    const diseaseGeo = new THREE.PlaneGeometry(16, 18);
    diseaseGeo.rotateX(-Math.PI / 2);
    const diseaseMesh = new THREE.Mesh(diseaseGeo, materials.disease.rgb);
    diseaseMesh.position.set(13, 0.06, -11);
    diseaseMesh.receiveShadow = true;
    diseaseMesh.userData = { zone: ZONES[1] };
    scene.add(diseaseMesh);

    // Zone 3: Water Stress Zone (South-East corner)
    const waterGeo = new THREE.PlaneGeometry(16, 22);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, materials.water.rgb);
    waterMesh.position.set(13, 0.05, 10);
    waterMesh.receiveShadow = true;
    waterMesh.userData = { zone: ZONES[2] };
    scene.add(waterMesh);

    // 9. 3D Crop Rows / Stalks (Instanced Meshes for high performance)
    const stalkCount = 750;
    const stalkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.7, 4);
    stalkGeo.translate(0, 0.35, 0);
    const stalkMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
    const cropInstances = new THREE.InstancedMesh(stalkGeo, stalkMat, stalkCount);
    cropInstances.castShadow = true;
    cropInstances.receiveShadow = true;

    const dummy = new THREE.Object3D();
    let instanceIdx = 0;
    // Populate healthy zone crop rows
    for (let x = -21; x <= 3; x += 1.8) {
      for (let z = -20; z <= 20; z += 1.6) {
        if (instanceIdx >= stalkCount) break;
        dummy.position.set(x + (Math.random() - 0.5) * 0.4, 0.05, z + (Math.random() - 0.5) * 0.4);
        dummy.scale.set(1, 0.8 + Math.random() * 0.4, 1);
        dummy.rotation.y = Math.random() * Math.PI;
        dummy.updateMatrix();
        cropInstances.setMatrixAt(instanceIdx++, dummy.matrix);
      }
    }
    cropInstances.instanceMatrix.needsUpdate = true;
    scene.add(cropInstances);

    // 10. Disease Hotspot Visual FX (Glowing 3D Warning Beacon & Hologram Ring)
    const diseaseBeaconGroup = new THREE.Group();
    diseaseBeaconGroup.position.set(13, 0.1, -11);

    // Pulsing floor ring
    const ringGeo = new THREE.RingGeometry(2.5, 3.2, 32);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const diseaseBeaconRing = new THREE.Mesh(ringGeo, ringMat);
    diseaseBeaconGroup.add(diseaseBeaconRing);

    // Vertical translucent warning column
    const holoGeo = new THREE.CylinderGeometry(2.8, 2.8, 12, 32, 1, true);
    holoGeo.translate(0, 6, 0);
    const holoMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18
    });
    const diseaseHoloBeam = new THREE.Mesh(holoGeo, holoMat);
    diseaseBeaconGroup.add(diseaseHoloBeam);

    // Alert diamond floating icon
    const diamondGeo = new THREE.OctahedronGeometry(0.9);
    const diamondMat = new THREE.MeshStandardMaterial({
      color: 0xff2222,
      emissive: 0xef4444,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });
    const diseaseIcon = new THREE.Mesh(diamondGeo, diamondMat);
    diseaseIcon.position.y = 8.5;
    diseaseBeaconGroup.add(diseaseIcon);

    scene.add(diseaseBeaconGroup);

    // 11. AUTONOMOUS 3D DRONE ASSEMBLY
    const droneGroup = new THREE.Group();
    droneGroup.position.set(-15, 12, -15);

    // Central chassis body
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.45, 1.6);
    const droneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.8
    });
    const droneBody = new THREE.Mesh(bodyGeo, droneBodyMat);
    droneBody.castShadow = true;
    droneGroup.add(droneBody);

    // Sensor top dome
    const domeGeo = new THREE.SphereGeometry(0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, metalness: 0.5 });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = 0.22;
    droneGroup.add(dome);

    // 4 Carbon Fiber Motor Arms
    const armGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.6);
    armGeo.rotateZ(Math.PI / 2);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.9 });

    const arm1 = new THREE.Mesh(armGeo, armMat);
    arm1.rotation.y = Math.PI / 4;
    arm1.castShadow = true;
    droneGroup.add(arm1);

    const arm2 = new THREE.Mesh(armGeo, armMat);
    arm2.rotation.y = -Math.PI / 4;
    arm2.castShadow = true;
    droneGroup.add(arm2);

    // 4 Motor Pods & Propellers
    const motorOffsets = [
      { x: 0.95, z: 0.95 },
      { x: -0.95, z: 0.95 },
      { x: 0.95, z: -0.95 },
      { x: -0.95, z: -0.95 }
    ];

    const propellers: THREE.Mesh[] = [];
    const propGeo = new THREE.BoxGeometry(1.5, 0.02, 0.12);
    const propMat = new THREE.MeshBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.75 });

    motorOffsets.forEach((pos) => {
      // Motor pod
      const podGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.35, 12);
      const podMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const pod = new THREE.Mesh(podGeo, podMat);
      pod.position.set(pos.x, 0.12, pos.z);
      droneGroup.add(pod);

      // Nav LED under motor pod
      const ledGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const isFront = pos.z < 0;
      const ledMat = new THREE.MeshBasicMaterial({
        color: isFront ? 0x22c55e : 0xef4444
      });
      const led = new THREE.Mesh(ledGeo, ledMat);
      led.position.set(pos.x, -0.15, pos.z);
      droneGroup.add(led);

      // Propeller
      const prop = new THREE.Mesh(propGeo, propMat);
      prop.position.set(pos.x, 0.32, pos.z);
      droneGroup.add(prop);
      propellers.push(prop);
    });

    // Landing skids
    const skidLegGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.7);
    const skidBarGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8);
    skidBarGeo.rotateX(Math.PI / 2);

    [-0.7, 0.7].forEach((xOffset) => {
      const leg1 = new THREE.Mesh(skidLegGeo, armMat);
      leg1.position.set(xOffset, -0.4, 0.5);
      leg1.rotation.z = xOffset > 0 ? -0.25 : 0.25;
      droneGroup.add(leg1);

      const leg2 = new THREE.Mesh(skidLegGeo, armMat);
      leg2.position.set(xOffset, -0.4, -0.5);
      leg2.rotation.z = xOffset > 0 ? -0.25 : 0.25;
      droneGroup.add(leg2);

      const bar = new THREE.Mesh(skidBarGeo, armMat);
      bar.position.set(xOffset * 1.15, -0.72, 0);
      droneGroup.add(bar);
    });

    // 12. LiDAR / Multispectral Laser Scanning Cone
    const coneHeight = 12;
    const scanConeGeo = new THREE.ConeGeometry(5.2, coneHeight, 32, 1, true);
    scanConeGeo.translate(0, -coneHeight / 2, 0);
    const scanConeMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });
    const scanBeam = new THREE.Mesh(scanConeGeo, scanConeMat);
    scanBeam.position.y = -0.3;
    droneGroup.add(scanBeam);

    // Projected laser scanning ground ring
    const groundRingGeo = new THREE.RingGeometry(4.8, 5.2, 32);
    groundRingGeo.rotateX(-Math.PI / 2);
    const groundRingMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const scanGroundRing = new THREE.Mesh(groundRingGeo, groundRingMat);
    scene.add(scanGroundRing);

    scene.add(droneGroup);

    // 13. Waypoint Flight Trajectory Definition (Lawnmower scanning pattern)
    const waypoints = [
      new THREE.Vector3(-18, 12, -18),
      new THREE.Vector3(18, 12, -18),
      new THREE.Vector3(18, 12, -8),
      new THREE.Vector3(-18, 12, -8),
      new THREE.Vector3(-18, 12, 2),
      new THREE.Vector3(18, 12, 2),
      new THREE.Vector3(18, 12, 12),
      new THREE.Vector3(-18, 12, 12),
      new THREE.Vector3(-18, 12, 18),
      new THREE.Vector3(18, 12, 18),
      new THREE.Vector3(18, 12, -18)
    ];
    const flightCurve = new THREE.CatmullRomCurve3(waypoints, true, 'centripetal');

    // Flight path visualizer line
    const pathPoints = flightCurve.getPoints(120);
    const pathGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const pathMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
    const pathLine = new THREE.Line(pathGeo, pathMat);
    scene.add(pathLine);

    // 14. Raycasting for Zone / Marker Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([healthyMesh, diseaseMesh, waterMesh, diseaseIcon]);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.zone) {
          const zone = hit.userData.zone as ZoneInfo;
          setSelectedZone(zone);
          onZoneSelect?.(zone);
        } else if (hit === diseaseIcon) {
          setSelectedZone(ZONES[1]);
          onZoneSelect?.(ZONES[1]);
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Store state in ref
    threeStateRef.current = {
      scene,
      camera,
      renderer,
      controls,
      droneGroup,
      propellers,
      scanBeam,
      scanGroundRing,
      diseaseBeaconRing,
      diseaseHoloBeam,
      healthyMesh,
      diseaseMesh,
      waterMesh,
      materials,
      droneFlightT: 0,
      isPlaying: true,
      activeCameraPreset: cameraPreset
    };

    // 15. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let elapsedTime = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const currentTime = performance.now();
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      elapsedTime += delta;
      const state = threeStateRef.current;
      if (!state) return;

      const {
        controls: activeControls,
        camera: activeCam,
        droneGroup: drone,
        propellers: props,
        scanGroundRing: groundRing,
        diseaseBeaconRing: beaconRing,
        diseaseHoloBeam: holoBeam,
        activeCameraPreset: currentCamPreset
      } = state;

      // Rotate Propellers
      props.forEach((prop, i) => {
        prop.rotation.y += (i % 2 === 0 ? 1 : -1) * 35 * delta;
      });

      // Pulse Disease Beacon
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.15;
      beaconRing.scale.set(pulse, pulse, pulse);
      if (holoBeam.material instanceof THREE.Material) {
        holoBeam.material.opacity = 0.14 + Math.sin(elapsedTime * 3) * 0.08;
      }
      diseaseIcon.rotation.y += delta * 1.5;
      diseaseIcon.position.y = 8.5 + Math.sin(elapsedTime * 2) * 0.3;

      // Drone autonomous flight progression along curve
      if (state.isPlaying) {
        state.droneFlightT = (state.droneFlightT + delta * 0.04) % 1.0;
      }

      const currentPos = flightCurve.getPointAt(state.droneFlightT);
      const lookAheadPos = flightCurve.getPointAt((state.droneFlightT + 0.01) % 1.0);

      drone.position.copy(currentPos);

      // Smooth heading & bank angle
      const forwardDir = lookAheadPos.clone().sub(currentPos).normalize();
      const targetRotationY = Math.atan2(forwardDir.x, forwardDir.z);
      drone.rotation.y = THREE.MathUtils.lerp(drone.rotation.y, targetRotationY, 0.1);
      drone.rotation.z = THREE.MathUtils.lerp(drone.rotation.z, -forwardDir.x * 0.25, 0.1); // subtle bank

      // Position ground scanning ring directly under drone
      groundRing.position.set(currentPos.x, 0.12, currentPos.z);
      groundRing.rotation.z += delta * 2; // rotating radar sweep ring

      // Telemetry update simulation
      setTelemetry((prev) => ({
        ...prev,
        altitude: +(18 + Math.sin(elapsedTime * 0.8) * 0.6).toFixed(1),
        speed: +(5.2 + Math.cos(elapsedTime * 0.5) * 0.4).toFixed(1),
        battery: Math.max(76, +(84 - state.droneFlightT * 3).toFixed(0)),
        scannedPercent: Math.min(100, +(35 + state.droneFlightT * 60).toFixed(0))
      }));

      // Camera preset behavior
      if (currentCamPreset === 'chase') {
        // Position camera behind and above drone
        const chaseOffset = new THREE.Vector3(0, 4.5, 9);
        chaseOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), drone.rotation.y);
        const desiredCamPos = drone.position.clone().add(chaseOffset);
        activeCam.position.lerp(desiredCamPos, 0.08);
        activeCam.lookAt(drone.position.x, drone.position.y + 0.5, drone.position.z);
      } else {
        activeControls.update();
      }

      renderer.render(scene, activeCam);
    };

    animate();

    // 16. Window resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // 17. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose scene geometries and materials
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      threeStateRef.current = null;
    };
  }, []);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 select-none shadow-2xl ${className}`}
      style={{ height }}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* TOP CONTROL BAR: Camera & Spectral Presets */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none z-10">
        {/* Left: Camera Angles */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/70 p-1 rounded-xl backdrop-blur-md shadow-lg pointer-events-auto">
          <button
            onClick={() => setCameraPreset('orbit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              cameraPreset === 'orbit'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Free Orbit</span>
          </button>
          <button
            onClick={() => setCameraPreset('chase')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              cameraPreset === 'chase'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-sky-400" />
            <span>Drone Chase</span>
          </button>
          <button
            onClick={() => setCameraPreset('topdown')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              cameraPreset === 'topdown'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Top-Down</span>
          </button>
          <button
            onClick={() => setCameraPreset('disease')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              cameraPreset === 'disease'
                ? 'bg-red-600 text-white shadow animate-pulse'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Disease Hotspot</span>
          </button>
        </div>

        {/* Right: Spectral Filter Modes */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/70 p-1 rounded-xl backdrop-blur-md shadow-lg pointer-events-auto">
          <span className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider">Filter:</span>
          <button
            onClick={() => setSpectralMode('rgb')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              spectralMode === 'rgb' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            RGB Natural
          </button>
          <button
            onClick={() => setSpectralMode('ndvi')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              spectralMode === 'ndvi' ? 'bg-emerald-600/90 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            NDVI Heatmap
          </button>
          <button
            onClick={() => setSpectralMode('thermal')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              spectralMode === 'thermal' ? 'bg-indigo-600/90 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Thermal Stress
          </button>
        </div>

        {/* Time of Day Lighting Modes */}
        <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-700/70 p-1 rounded-xl backdrop-blur-md shadow-lg pointer-events-auto">
          <button
            onClick={() => setLightingPreset('noon')}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
              lightingPreset === 'noon' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            ☀️ Noon
          </button>
          <button
            onClick={() => setLightingPreset('golden')}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
              lightingPreset === 'golden' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌅 Golden
          </button>
          <button
            onClick={() => setLightingPreset('night')}
            className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
              lightingPreset === 'night' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌙 Night
          </button>
        </div>
      </div>

      {/* BOTTOM-LEFT: Live Telemetry HUD */}
      <div className="absolute bottom-3 left-3 bg-slate-900/95 border border-slate-800 p-3.5 rounded-2xl backdrop-blur-md shadow-2xl text-xs space-y-2 pointer-events-auto max-w-xs z-10">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-white text-xs tracking-wide">DJI AGRAS T40 — LIVE</span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-0.8 rounded text-[11px] font-medium transition"
          >
            {isPlaying ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
        </div>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Altitude:</span>
            <strong className="text-emerald-400 font-mono">{telemetry.altitude} m</strong>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Ground Speed:</span>
            <strong className="text-sky-400 font-mono">{telemetry.speed} m/s</strong>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Battery Level:</span>
            <strong className="text-emerald-300 font-mono flex items-center gap-1">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> {telemetry.battery}%
            </strong>
          </div>
          <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
            <span className="text-slate-400 block text-[10px]">Area Scanned:</span>
            <strong className="text-amber-400 font-mono">{telemetry.scannedPercent}% (12.5 Ac)</strong>
          </div>
        </div>

        {/* Scan Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-500 to-sky-400 h-full transition-all duration-300"
            style={{ width: `${telemetry.scannedPercent}%` }}
          />
        </div>
      </div>

      {/* BOTTOM-RIGHT: 3D Legend & Zone Hotspots */}
      <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl backdrop-blur-md shadow-xl text-xs space-y-1.5 pointer-events-auto z-10 hidden sm:block">
        <div className="font-bold text-slate-300 text-[11px] mb-1 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-400" /> 3D Digital Twin Legend
        </div>
        <button
          onClick={() => { setSelectedZone(ZONES[0]); onZoneSelect?.(ZONES[0]); }}
          className="w-full flex items-center justify-between gap-3 text-left hover:bg-slate-800/80 p-1 rounded transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
            <span className="text-slate-300">Healthy Wheat (62.4%)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">NDVI 0.78</span>
        </button>

        <button
          onClick={() => { setSelectedZone(ZONES[1]); setCameraPreset('disease'); }}
          className="w-full flex items-center justify-between gap-3 text-left hover:bg-slate-800/80 p-1 rounded transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50 animate-ping" />
            <span className="text-slate-200 font-semibold">Yellow Rust (7.4%)</span>
          </div>
          <span className="text-[10px] text-red-400 font-mono font-bold">91% Conf</span>
        </button>

        <button
          onClick={() => { setSelectedZone(ZONES[2]); onZoneSelect?.(ZONES[2]); }}
          className="w-full flex items-center justify-between gap-3 text-left hover:bg-slate-800/80 p-1 rounded transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
            <span className="text-slate-300">Moisture Deficit (17.6%)</span>
          </div>
          <span className="text-[10px] text-blue-400 font-mono">42% Hum</span>
        </button>
      </div>

      {/* MODAL / DRAWER FOR SELECTED ZONE */}
      {selectedZone && (
        <div className="absolute top-16 right-3 max-w-sm w-80 bg-slate-900/95 border border-slate-700/80 p-4 rounded-2xl shadow-2xl backdrop-blur-xl text-xs text-slate-200 space-y-2.5 z-20 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span
              className="font-bold flex items-center gap-1.5 text-sm"
              style={{ color: selectedZone.color }}
            >
              {selectedZone.type === 'disease' ? (
                <AlertTriangle className="w-4 h-4 text-red-400 animate-bounce" />
              ) : selectedZone.type === 'water' ? (
                <Droplets className="w-4 h-4 text-blue-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              )}
              {selectedZone.name}
            </span>
            <button
              onClick={() => setSelectedZone(null)}
              className="text-slate-400 hover:text-white p-1 font-bold text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Coverage:</span>
              <strong className="text-white">{selectedZone.area}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Sensor Index:</span>
              <strong style={{ color: selectedZone.color }}>{selectedZone.score}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Health Status:</span>
              <strong className="text-slate-200">{selectedZone.status}</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 leading-relaxed text-[11px]">
            {selectedZone.details}
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-[11px] space-y-1">
            <div className="font-bold flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> AI Agronomist Action:
            </div>
            <div>{selectedZone.action}</div>
          </div>
        </div>
      )}
    </div>
  );
};
