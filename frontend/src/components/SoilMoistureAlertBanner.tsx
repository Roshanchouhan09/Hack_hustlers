'use client';
import React from 'react';
import { AlertCircle } from 'lucide-react';

export const SoilMoistureAlertBanner: React.FC = () => {
  return (
    <div className="bg-blue-950/40 border border-blue-800/40 p-3 rounded-2xl flex items-center justify-between text-xs text-blue-200">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-blue-400" />
        <span>Root zone moisture dropped to 42% in Eastern Quad. Scheduled drip irrigation trigger active.</span>
      </div>
      <span className="text-sky-300 font-mono text-[11px] font-bold">2,500 L / Ac</span>
    </div>
  );
};
