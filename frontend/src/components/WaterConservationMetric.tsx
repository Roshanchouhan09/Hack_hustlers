'use client';
import React from 'react';
import { Droplets } from 'lucide-react';

export const WaterConservationMetric: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
          <Droplets className="w-4 h-4" />
        </div>
        <div>
          <span className="text-slate-400 text-[11px] block">Season Water Saved</span>
          <strong className="text-white text-sm font-mono">182,500 Liters</strong>
        </div>
      </div>
      <span className="text-blue-400 text-[10px] font-bold bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30">Drip Optimized</span>
    </div>
  );
};
