'use client';
import React from 'react';
import { Clock, Check } from 'lucide-react';

export const SprayingWindowIndicator: React.FC<{ isOptimal?: boolean }> = ({ isOptimal = true }) => {
  return (
    <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
      isOptimal ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' : 'bg-red-950/30 border-red-800/40 text-red-300'
    }`}>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-emerald-400" />
        <strong className="text-white">Live Spraying Window:</strong>
        <span>{isOptimal ? 'Open (Next 18 Hours Optimal)' : 'Closed (High Wind/Rain Drift)'}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 px-2 py-0.5 rounded">Verified</span>
    </div>
  );
};
