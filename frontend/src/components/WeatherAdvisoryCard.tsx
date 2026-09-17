'use client';
import React from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';

export const WeatherAdvisoryCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <CloudSun className="w-4 h-4 text-sky-400" />
          <h4 className="text-white font-bold">Next 7-Day Precision Spray Outlook</h4>
        </div>
        <span className="text-emerald-400 font-mono text-[11px]">Clear Skies</span>
      </div>
      <p className="text-slate-300 text-[11px] leading-relaxed">
        Morning winds below 8 km/h and zero precipitation through Thursday afternoon provide ideal conditions for fungicide application.
      </p>
    </div>
  );
};
