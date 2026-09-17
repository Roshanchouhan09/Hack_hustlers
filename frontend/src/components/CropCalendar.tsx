'use client';
import React from 'react';
import { Calendar, Clock, Sprout } from 'lucide-react';

export const CropCalendar: React.FC = () => {
  const stages = [
    { name: 'Sowing & Germination', day: 'Day 1-10', status: 'COMPLETED' },
    { name: 'Crown Root Initiation (CRI)', day: 'Day 21-25', status: 'COMPLETED' },
    { name: 'Tillering & Jointing', day: 'Day 45-60', status: 'COMPLETED' },
    { name: 'Flowering & Anthesis', day: 'Day 65-75', status: 'CURRENT' },
    { name: 'Grain Filling', day: 'Day 85-100', status: 'UPCOMING' },
    { name: 'Harvest Maturity', day: 'Day 115-125', status: 'UPCOMING' },
  ];
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <Calendar className="w-5 h-5 text-emerald-400" />
        <h3 className="text-white font-bold text-sm">Rabi Wheat Crop Growth Stage Timeline</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
        {stages.map((s) => (
          <div key={s.name} className={`p-3 rounded-2xl border ${s.status === 'CURRENT' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
            <span className="text-[10px] block text-slate-500">{s.day}</span>
            <strong className="text-white block mt-0.5">{s.name}</strong>
            <span className={`text-[9px] font-bold uppercase mt-1 inline-block px-1.5 py-0.2 rounded ${s.status === 'CURRENT' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
