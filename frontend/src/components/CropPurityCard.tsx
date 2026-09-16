'use client';
import React from 'react';
import { Sprout } from 'lucide-react';

export const CropPurityCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
          <Sprout className="w-4 h-4" />
        </div>
        <div>
          <span className="text-slate-400 text-[11px] block">Canopy Purity & Weed Index</span>
          <strong className="text-emerald-400 text-sm font-mono">98.4% Pure Canopy</strong>
        </div>
      </div>
      <span className="text-slate-400 text-[10px]">Low Weed Pressure</span>
    </div>
  );
};
