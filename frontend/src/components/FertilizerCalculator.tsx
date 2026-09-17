'use client';
import React, { useState } from 'react';
import { Scale } from 'lucide-react';

export const FertilizerCalculator: React.FC = () => {
  const [acres, setAcres] = useState(12.5);
  const ureaBags = Math.round(acres * 2.5);
  const dapBags = Math.round(acres * 1.2);
  const mopBags = Math.round(acres * 0.8);
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Scale className="w-5 h-5 text-amber-400" />
        <h3 className="text-white font-bold text-sm">NPK Balanced Fertilizer Recommendation</h3>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <span className="text-slate-500 text-[10px] block">Nitrogen (Urea 46% N)</span>
          <strong className="text-white text-base font-mono">{ureaBags} Bags</strong>
        </div>
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <span className="text-slate-500 text-[10px] block">Phosphorus (DAP 18:46)</span>
          <strong className="text-emerald-400 text-base font-mono">{dapBags} Bags</strong>
        </div>
        <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
          <span className="text-slate-500 text-[10px] block">Potassium (MOP 60% K)</span>
          <strong className="text-sky-400 text-base font-mono">{mopBags} Bags</strong>
        </div>
      </div>
    </div>
  );
};
