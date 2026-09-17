'use client';

import React, { useState } from 'react';
import { UserCheck, Star, Battery, Radio, ShieldCheck, Send } from 'lucide-react';

interface Pilot {
  id: string;
  name: string;
  distanceKm: number;
  droneModel: string;
  rating: number;
  completedScans: number;
  batteryPct: number;
  isAvailable: boolean;
}

export const PilotDispatchWidget: React.FC = () => {
  const [pilots] = useState<Pilot[]>([
    {
      id: 'pilot-1',
      name: 'Amit Singh',
      distanceKm: 2.8,
      droneModel: 'DJI Agras T40 (RTK Fix)',
      rating: 4.9,
      completedScans: 142,
      batteryPct: 92,
      isAvailable: true
    },
    {
      id: 'pilot-2',
      name: 'Rajesh Sharma',
      distanceKm: 5.4,
      droneModel: 'AgriFlyer Pro X8',
      rating: 4.8,
      completedScans: 89,
      batteryPct: 78,
      isAvailable: true
    }
  ]);

  const [dispatchedId, setDispatchedId] = useState<string | null>(null);

  const handleDispatch = (id: string) => {
    setDispatchedId(id);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Nearby Certified Drone Pilots</h3>
            <p className="text-slate-400 text-xs">DGCA-certified agricultural UAV operators within 10 km</p>
          </div>
        </div>

        <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full">
          2 Pilots Active
        </span>
      </div>

      <div className="space-y-3">
        {pilots.map((pilot) => (
          <div
            key={pilot.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-white text-sm">{pilot.name}</strong>
                <span className="text-amber-400 flex items-center gap-0.5 text-[11px] font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {pilot.rating}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-sky-400 font-medium">{pilot.distanceKm} km away</span>
              </div>

              <div className="text-slate-400 text-[11px] flex items-center gap-2">
                <span>{pilot.droneModel}</span>
                <span>•</span>
                <span className="text-emerald-300 font-mono flex items-center gap-1">
                  <Battery className="w-3 h-3" /> {pilot.batteryPct}%
                </span>
                <span>•</span>
                <span>{pilot.completedScans} Missions Completed</span>
              </div>
            </div>

            <button
              onClick={() => handleDispatch(pilot.id)}
              disabled={dispatchedId === pilot.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold transition shadow ${
                dispatchedId === pilot.id
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/20'
              }`}
            >
              {dispatchedId === pilot.id ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Mission Dispatched</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Instant Dispatch</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
