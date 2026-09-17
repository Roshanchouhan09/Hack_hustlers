'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Activity, Server, Database, Radio, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SystemStatusPage() {
  const services = [
    { name: 'FastAPI REST Gateway', status: 'OPERATIONAL', latency: '24ms', icon: Server, color: 'text-emerald-400' },
    { name: 'YOLOv8 PyTorch Inference Pipeline', status: 'OPERATIONAL', latency: '180ms', icon: Activity, color: 'text-emerald-400' },
    { name: 'SQLite / Spatial DB Connection', status: 'CONNECTED', latency: '4ms', icon: Database, color: 'text-emerald-400' },
    { name: 'DJI Agras T40 RTK Telemetry Gateway', status: 'STREAMING', latency: '65ms', icon: Radio, color: 'text-sky-400' },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-emerald-400" />
              AgriVision System Status & API Monitor
            </h1>
            <p className="text-slate-400 text-xs mt-1">Real-time health telemetry across microservices, ML pipelines, and avionics gateways.</p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            All Systems Operational (99.98% Uptime)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.name} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-white text-sm block">{srv.name}</strong>
                    <span className="text-slate-400 text-xs">Response latency: {srv.latency}</span>
                  </div>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-950 border border-slate-800 ${srv.color}`}>
                  {srv.status}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
