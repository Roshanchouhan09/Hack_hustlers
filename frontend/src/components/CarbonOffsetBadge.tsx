'use client';
import React from 'react';
import { Leaf } from 'lucide-react';

export const CarbonOffsetBadge: React.FC = () => {
  return (
    <div className="bg-emerald-950/30 border border-emerald-800/40 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
      <div className="flex items-center gap-2">
        <Leaf className="w-4 h-4 text-emerald-400" />
        <span>Electric Drone Precision Operations Carbon Offset:</span>
      </div>
      <strong className="text-white font-mono bg-emerald-900/60 px-2 py-0.5 rounded-lg border border-emerald-500/40">525 kg CO2e Avoided</strong>
    </div>
  );
};
