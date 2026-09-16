'use client';
import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const DroneSafetyBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-sm">
      <ShieldCheck className="w-3.5 h-3.5" />
      <span>DGCA Certified UAV Pilot & Airframe</span>
    </div>
  );
};
