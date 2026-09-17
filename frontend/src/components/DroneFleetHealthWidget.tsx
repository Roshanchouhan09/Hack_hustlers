'use client';
import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';

export const DroneFleetHealthWidget: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <h4 className="text-white font-bold">UAV Avionics Diagnostics</h4>
        </div>
        <span className="text-emerald-400 text-[10px] font-bold">ALL SYSTEMS NORMAL</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block">Motor Vibration:</span>
          <strong className="text-emerald-400 font-mono">0.02g (Nominal)</strong>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block">IMU Drift:</span>
          <strong className="text-sky-400 font-mono">Zero Offset</strong>
        </div>
      </div>
    </div>
  );
};
