'use client';
import React from 'react';
import { FileText } from 'lucide-react';

export const SoilHealthCardSummary: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <FileText className="w-4 h-4 text-emerald-400" />
        <h4 className="text-white font-bold">Soil Health Card Lab Parameters</h4>
      </div>
      <div className="grid grid-cols-3 gap-2 text-[11px]">
        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
          <span className="text-slate-500 text-[10px] block">Soil pH</span>
          <strong className="text-white font-mono">6.5 (Neutral)</strong>
        </div>
        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
          <span className="text-slate-500 text-[10px] block">Organic Carbon</span>
          <strong className="text-amber-400 font-mono">0.52% (Medium)</strong>
        </div>
        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
          <span className="text-slate-500 text-[10px] block">Zinc (Zn)</span>
          <strong className="text-red-400 font-mono">0.45 ppm (Deficient)</strong>
        </div>
      </div>
    </div>
  );
};
