'use client';

import React from 'react';
import { Droplets, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const SoilMoistureDepthChart: React.FC = () => {
  const depthData = [
    { depth: '0-10 cm (Topsoil)', moisture: 54, optimal: 65 },
    { depth: '10-20 cm (Root Zone)', moisture: 42, optimal: 70 },
    { depth: '20-30 cm (Mid Subsoil)', moisture: 61, optimal: 68 },
    { depth: '30-50 cm (Deep Aquifer)', moisture: 78, optimal: 72 },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Soil Moisture Profile by Root Depth</h3>
            <p className="text-slate-400 text-xs">IoT Capacitive Sensor Telemetry • Sector 3</p>
          </div>
        </div>

        <span className="text-blue-400 font-bold text-xs bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full">
          Deficit at 10-20cm Depth
        </span>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={depthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="depth" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Area type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#moistureGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-slate-400 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
        <span>Recommended Action: Trigger 2.5 hour drip cycle via automated solenoid valve 3 tonight.</span>
        <strong className="text-sky-400 font-mono">2,500 L / Acre</strong>
      </div>
    </div>
  );
};
