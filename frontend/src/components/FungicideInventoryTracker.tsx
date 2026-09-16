'use client';
import React from 'react';
import { Package } from 'lucide-react';

export const FungicideInventoryTracker: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-slate-800 text-slate-300">
          <Package className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-white text-sm block">Tilt (Propiconazole 25% EC)</strong>
          <span className="text-slate-400 text-[11px]">Batch #AGR-2026-88 • Exp: Oct 2027</span>
        </div>
      </div>
      <span className="text-emerald-400 font-mono font-bold">2.5 L in Stock</span>
    </div>
  );
};
