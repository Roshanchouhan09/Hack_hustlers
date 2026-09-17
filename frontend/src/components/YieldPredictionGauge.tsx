'use client';
import React from 'react';
import { TrendingUp } from 'lucide-react';

export const YieldPredictionGauge: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <h4 className="text-white font-bold">AI Projected Harvest Yield</h4>
        </div>
        <span className="text-emerald-400 font-mono text-[11px]">+14% vs Regional Avg</span>
      </div>
      <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
        <div>
          <span className="text-slate-500 text-[10px] block">Projected Total Harvest</span>
          <strong className="text-white text-lg font-mono">27.5 Metric Tonnes</strong>
        </div>
        <strong className="text-emerald-400 font-mono text-base">2.2 T/Acre</strong>
      </div>
    </div>
  );
};
