import React from 'react';
import { getCurrentCroppingSeason } from '../lib/cropSeasonHelper';

export const CroppingSeasonBanner: React.FC = () => {
  const season = getCurrentCroppingSeason();
  const seasonTitles = {
    KHARIF: '🌾 Kharif Season (Monsoon High-Moisture Cycle)',
    RABI: '❄️ Rabi Season (Temperate Grain & Oilseed Cycle)',
    ZAID: '☀️ Zaid Season (Summer Short-Duration Cycle)',
  };

  return (
    <div className="px-3.5 py-2 bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-xl text-xs flex items-center justify-between text-slate-200">
      <span className="font-semibold">{seasonTitles[season]}</span>
      <span className="text-[11px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full font-mono">
        ACTIVE CALENDAR
      </span>
    </div>
  );
};
