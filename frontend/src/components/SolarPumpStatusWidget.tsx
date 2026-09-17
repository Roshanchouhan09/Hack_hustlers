'use client';
import React from 'react';
import { Sun, Power } from 'lucide-react';

export const SolarPumpStatusWidget: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <h4 className="text-white font-bold">PM-KUSUM 7.5 HP Solar Pump</h4>
        </div>
        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">ONLINE</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-[11px]">
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block">Solar PV Output:</span>
          <strong className="text-white font-mono">5.8 kW (92%)</strong>
        </div>
        <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <span className="text-slate-500 block">Water Discharge:</span>
          <strong className="text-sky-400 font-mono">240 LPM</strong>
        </div>
      </div>
    </div>
  );
};
