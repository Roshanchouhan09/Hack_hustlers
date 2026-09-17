'use client';

import React, { useState } from 'react';
import { PlaneTakeoff, Navigation, Sliders, Battery, Clock, Check, Plus, Trash2 } from 'lucide-react';

interface Waypoint {
  id: number;
  altitude: number;
  speed: number;
  action: 'SCAN_MULTISPECTRAL' | 'PRECISION_SPRAY' | 'RETURN_TO_HOME';
}

export const WaypointMissionPlanner: React.FC = () => {
  const [altitude, setAltitude] = useState(18);
  const [swathWidth, setSwathWidth] = useState(6.5);
  const [flightSpeed, setFlightSpeed] = useState(5.0);
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: 1, altitude: 18, speed: 5.0, action: 'SCAN_MULTISPECTRAL' },
    { id: 2, altitude: 18, speed: 5.0, action: 'SCAN_MULTISPECTRAL' },
    { id: 3, altitude: 15, speed: 3.5, action: 'PRECISION_SPRAY' },
    { id: 4, altitude: 20, speed: 6.0, action: 'RETURN_TO_HOME' },
  ]);

  const addWaypoint = () => {
    setWaypoints((prev) => [
      ...prev,
      { id: prev.length + 1, altitude, speed: flightSpeed, action: 'SCAN_MULTISPECTRAL' }
    ]);
  };

  const removeWaypoint = (id: number) => {
    setWaypoints((prev) => prev.filter((w) => w.id !== id));
  };

  const estimatedFlightTimeMinutes = Math.round((waypoints.length * 2.2));
  const estimatedBatteryUsage = Math.min(95, waypoints.length * 9);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-white font-extrabold text-lg flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-400" />
            Autonomous Drone Mission Planner
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            Configure RTK-guided waypoint vectors, flight swath overlap, and precision spraying altitudes.
          </p>
        </div>

        <button
          onClick={addWaypoint}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-600/30"
        >
          <Plus className="w-4 h-4" /> Add Waypoint
        </button>
      </div>

      {/* Flight Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-slate-300">
            <span className="font-semibold">Survey Altitude</span>
            <strong className="text-emerald-400 font-mono">{altitude} m</strong>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500 block">Ground Sampling Distance (GSD): 1.1 cm/px</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-slate-300">
            <span className="font-semibold">Swath Width</span>
            <strong className="text-sky-400 font-mono">{swathWidth} m</strong>
          </div>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={swathWidth}
            onChange={(e) => setSwathWidth(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500 block">75% side-lap overlap for 3D reconstruction</span>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-slate-300">
            <span className="font-semibold">Flight Speed</span>
            <strong className="text-amber-400 font-mono">{flightSpeed} m/s</strong>
          </div>
          <input
            type="range"
            min="2"
            max="8"
            step="0.5"
            value={flightSpeed}
            onChange={(e) => setFlightSpeed(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <span className="text-[10px] text-slate-500 block">Optimized for motion-blur free shutter</span>
        </div>
      </div>

      {/* Flight Estimate Badges */}
      <div className="flex flex-wrap items-center gap-3 text-xs">
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Estimated Mission Time: <strong className="text-white">{estimatedFlightTimeMinutes} mins</strong></span>
        </div>
        <div className="flex items-center gap-2 bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
          <Battery className="w-4 h-4 text-sky-400" />
          <span>Battery Consumption: <strong className="text-white">{estimatedBatteryUsage}%</strong></span>
        </div>
      </div>

      {/* Waypoint Sequence Table */}
      <div className="space-y-2">
        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Flight Waypoint Queue</span>
        <div className="space-y-2">
          {waypoints.map((wp, index) => (
            <div key={wp.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <div>
                  <span className="text-white font-semibold">{wp.action.replace(/_/g, ' ')}</span>
                  <div className="text-[11px] text-slate-400">
                    Alt: {wp.altitude}m • Speed: {wp.speed}m/s
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeWaypoint(wp.id)}
                className="text-slate-500 hover:text-red-400 p-1 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
