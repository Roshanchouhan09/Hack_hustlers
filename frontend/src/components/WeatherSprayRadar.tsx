'use client';

import React from 'react';
import { Wind, Droplets, CloudRain, Sun, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const WeatherSprayRadar: React.FC = () => {
  const currentMetrics = {
    windSpeedKmh: 8.5,
    gustSpeedKmh: 12.0,
    humidityPct: 72,
    rainProbabilityPct: 15,
    temperatureC: 28.5,
    deltaT: 4.8, // Optimal between 2 and 8
    isSafeToSpray: true
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Agricultural Spraying Weather Radar</h3>
            <p className="text-slate-400 text-xs">Micro-climate spray drift & evaporation assessment</p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" /> Optimal Spray Window
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Wind Velocity</span>
          <strong className="text-white text-base font-mono mt-0.5 block">{currentMetrics.windSpeedKmh} km/h</strong>
          <span className="text-emerald-400 text-[10px]">Gusts: {currentMetrics.gustSpeedKmh} km/h (Safe)</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Delta T Index</span>
          <strong className="text-emerald-400 text-base font-mono mt-0.5 block">{currentMetrics.deltaT} °C</strong>
          <span className="text-slate-400 text-[10px]">Optimal (2 - 8 range)</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Relative Humidity</span>
          <strong className="text-sky-400 text-base font-mono mt-0.5 block">{currentMetrics.humidityPct}%</strong>
          <span className="text-amber-300 text-[10px]">Fungal Risk: Moderate</span>
        </div>

        <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
          <span className="text-slate-400 text-[10px] block">Rain Probability</span>
          <strong className="text-white text-base font-mono mt-0.5 block">{currentMetrics.rainProbabilityPct}%</strong>
          <span className="text-emerald-400 text-[10px]">Zero wash-off risk</span>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 text-emerald-300 text-xs flex items-center gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span className="leading-relaxed text-[11px]">
          Drone spraying advisory: Next 18 hours are ideal for targeted Yellow Rust spot treatments. Recommended nozzle: Standard Air-Induction flat fan at 2.5 bar pressure.
        </span>
      </div>
    </div>
  );
};
