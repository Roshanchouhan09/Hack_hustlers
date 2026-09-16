'use client';
import React from 'react';
import { Radio } from 'lucide-react';

export const GpsRtkStatusBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl text-xs">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
      <span className="text-slate-300 font-semibold">RTK Lock:</span>
      <strong className="text-emerald-400 font-mono text-[11px]">18 Satellites (1.2cm RMS)</strong>
    </div>
  );
};
