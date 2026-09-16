'use client';
import React from 'react';
import { DollarSign } from 'lucide-react';

export const YieldLossAvoidanceCard: React.FC = () => {
  return (
    <div className="bg-emerald-950/30 border border-emerald-800/40 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
      <div>
        <span className="text-slate-400 text-[10px] uppercase block">Salvaged Harvest Value</span>
        <strong className="text-white text-lg font-mono">Rs 48,000 Saved</strong>
      </div>
      <span className="text-emerald-400 font-bold bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-500/40">Early Intervention</span>
    </div>
  );
};
