import React from 'react';
import { calculatePumpDurationHours } from '../lib/irrigationDuration';

export const PumpRunTimeCard: React.FC<{ acres: number; depthMm: number; dischargeLph: number }> = ({
  acres,
  depthMm,
  dischargeLph,
}) => {
  const hours = calculatePumpDurationHours(acres, depthMm, dischargeLph);
  const electricityKwh = Number((hours * 3.75).toFixed(1)); // 5 HP tubewell pump ~ 3.75 kW

  return (
    <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 space-y-1">
      <div className="font-bold flex justify-between">
        <span>Tubewell Irrigation Run-Time</span>
        <span>{hours} Hours</span>
      </div>
      <p className="text-[11px] text-sky-700">Estimated Power Consumption: {electricityKwh} kWh for {acres} acres.</p>
    </div>
  );
};
