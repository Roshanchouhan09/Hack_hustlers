'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { FarmMap } from '@/components/FarmMap';
import { ReportDownloadButton } from '@/components/ReportDownloadButton';
import { Layers, PlaneTakeoff, Radio, Activity, ShieldCheck, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function DedicatedHealthMapPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Farm Header with Telemetry Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Live Drone Telemetry Connected</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>Patna District, Bihar (12.5 Acres)</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
              <Layers className="w-7 h-7 text-emerald-400" />
              Green Valley Farm — 3D Digital Twin & Health Map
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Real-time spatial visualization powered by autonomous drone LiDAR, multispectral NDVI sensors, and YOLOv8 crop disease AI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/book-drone"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-lg transition"
            >
              <PlaneTakeoff className="w-4 h-4" />
              <span>Schedule Respray</span>
            </Link>
            <ReportDownloadButton farmName="Green Valley Farm" />
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div className="text-slate-400 text-[11px]">Primary Crop</div>
            <div className="text-white font-bold text-base mt-1 flex items-center gap-1.5">
              🌾 Wheat (HD-2967)
            </div>
            <span className="text-emerald-400 text-[10px] font-medium">Flowering Stage (Day 68)</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div className="text-slate-400 text-[11px]">Overall Health Score</div>
            <div className="text-emerald-400 font-bold text-base mt-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> 82 / 100
            </div>
            <span className="text-slate-400 text-[10px]">Optimal Vegetation Index</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div className="text-slate-400 text-[11px]">Active Disease Alert</div>
            <div className="text-red-400 font-bold text-base mt-1 flex items-center gap-1.5">
              ⚠️ Yellow Rust (7.4%)
            </div>
            <span className="text-red-300 text-[10px]">Puccinia striiformis • 0.92 Ac</span>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
            <div className="text-slate-400 text-[11px]">Drone Coverage</div>
            <div className="text-sky-400 font-bold text-base mt-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% Surveyed
            </div>
            <span className="text-slate-400 text-[10px]">GSD: 1.2 cm/pixel RTK</span>
          </div>
        </div>

        {/* 3D Digital Twin / 2D Map Container */}
        <FarmMap defaultMode="3d" />
      </main>
    </div>
  );
}
