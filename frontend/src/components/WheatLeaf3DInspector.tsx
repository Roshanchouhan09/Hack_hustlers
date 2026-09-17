'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ShieldAlert, CheckCircle2, RotateCcw, ZoomIn, Info } from 'lucide-react';

interface LeafInspectorProps {
  onClose?: () => void;
}

export const WheatLeaf3DInspector: React.FC<LeafInspectorProps> = ({ onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPustule, setSelectedPustule] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030712);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 5;
    controls.maxDistance = 25;

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x166534, 1.2);
    scene.add(hemiLight);

    const spotLight = new THREE.SpotLight(0xffedd5, 2.5);
    spotLight.position.set(10, 15, 10);
    scene.add(spotLight);

    // 3D Wheat Leaf Blade Geometry (Curved elongated shape)
    const leafCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, -6, 0),
      new THREE.Vector3(1.2, 0, 1.0),
      new THREE.Vector3(0.5, 6, -0.5)
    );
    const leafPoints = leafCurve.getPoints(50);
    const leafGeo = new THREE.PlaneGeometry(2.4, 12, 16, 32);
    
    // Deform plane to curl like a real cereal leaf
    const pos = leafGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      // Curl edges
      pos.setZ(i, -Math.pow(x, 2) * 0.25 + Math.sin(y * 0.4) * 0.4);
    }
    leafGeo.computeVertexNormals();

    const leafMat = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      roughness: 0.4,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const leafMesh = new THREE.Mesh(leafGeo, leafMat);
    scene.add(leafMesh);

    // Yellow Rust Stripe Lesions (Orange-yellow elongated spore pustules)
    const pustulesGroup = new THREE.Group();
    const pustuleMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.5,
      roughness: 0.6
    });

    // Create characteristic parallel linear stripes of Puccinia striiformis
    [-0.4, 0.1, 0.5].forEach((xOffset, colIdx) => {
      for (let y = -3; y <= 4; y += 0.9) {
        const pGeo = new THREE.CapsuleGeometry(0.12, 0.4, 4, 8);
        const pMesh = new THREE.Mesh(pGeo, pustuleMat);
        pMesh.position.set(xOffset + (Math.random() - 0.5) * 0.1, y, 0.2);
        pMesh.rotation.z = (Math.random() - 0.5) * 0.1;
        pustulesGroup.add(pMesh);
      }
    });
    scene.add(pustulesGroup);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      leafMesh.rotation.y = Math.sin(Date.now() * 0.0008) * 0.12;
      pustulesGroup.rotation.y = leafMesh.rotation.y;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">3D Wheat Leaf Pathology Inspector</h3>
            <p className="text-slate-400 text-xs">Puccinia striiformis (Yellow Stripe Rust) Sporulation Analysis</p>
          </div>
        </div>

        {onClose && (
          <button onClick={onClose} className="text-slate-400 hover:text-white px-2 py-1 font-bold text-xs">
            ✕ Close
          </button>
        )}
      </div>

      <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-800">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-xl text-xs space-y-1 backdrop-blur-md">
          <div className="text-amber-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Parallel Uredinial Stripes Detected
          </div>
          <p className="text-slate-300 text-[11px]">Sub-epidermal spore pustules rupturing leaf cuticle</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase">Pathogen Classification</span>
          <strong className="text-white">Puccinia striiformis f. sp. tritici</strong>
          <p className="text-slate-400 text-[11px]">Identified via YOLOv8 fungal texture segmentation (91% confidence).</p>
        </div>

        <div className="bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40 text-emerald-300 space-y-1">
          <span className="text-emerald-400 font-bold block text-[10px] uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Prescribed Treatment
          </span>
          <strong className="text-white">Propiconazole 25% EC (Tilt)</strong>
          <p className="text-emerald-200 text-[11px]">Apply 200 ml/acre via drone ultra-low volume (ULV) coarse spray.</p>
        </div>
      </div>
    </div>
  );
};
