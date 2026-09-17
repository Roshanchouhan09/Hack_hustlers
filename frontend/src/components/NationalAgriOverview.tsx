'use client';

import React from 'react';
import { Globe, MapPin, TrendingUp, ShieldCheck, AlertCircle } from 'lucide-react';

export const NationalAgriOverview: React.FC = () => {
  const states = [
    { state: 'Punjab', district: 'Ludhiana', crop: 'Durum Wheat', acres: 25.0, score: 89, status: 'Optimal' },
    { state: 'Bihar', district: 'Patna', crop: 'Wheat (HD-2967)', acres: 12.5, score: 82, status: 'Action Needed' },
    { state: 'Maharashtra', district: 'Yavatmal', crop: 'Bt Cotton', acres: 18.0, score: 74, status: 'Monitoring' },
    { state: 'Karnataka', district: 'Chikkamagaluru', crop: 'Arabica Coffee', acres: 30.0, score: 93, status: 'Optimal' },
    { state: 'West Bengal', district: 'Burdwan', crop: 'Aman Paddy', acres: 14.0, score: 79, status: 'Fair' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">National Precision Agriculture Command Network</h3>
            <p className="text-slate-400 text-xs">Multi-state federated IoT sensor & drone fleet aggregation</p>
          </div>
        </div>

        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
          99.5 Total Acres Monitored
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
            <tr>
              <th className="p-3 rounded-l-xl">State & District</th>
              <th className="p-3">Primary Crop</th>
              <th className="p-3">Acreage</th>
              <th className="p-3">Health Index</th>
              <th className="p-3 rounded-r-xl">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {states.map((item) => (
              <tr key={item.state} className="hover:bg-slate-800/40 transition">
                <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  {item.state} ({item.district})
                </td>
                <td className="p-3 text-slate-300">{item.crop}</td>
                <td className="p-3 font-mono">{item.acres} Ac</td>
                <td className="p-3 font-bold font-mono">
                  <span className={item.score >= 85 ? 'text-emerald-400' : item.score >= 75 ? 'text-amber-400' : 'text-red-400'}>
                    {item.score} / 100
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.score >= 85 ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
