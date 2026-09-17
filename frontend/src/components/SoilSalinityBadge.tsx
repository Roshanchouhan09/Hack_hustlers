import React from 'react';
import { classifySalinityHazard } from '../lib/soilSalinity';

export const SoilSalinityBadge: React.FC<{ ecDsM: number }> = ({ ecDsM }) => {
  const { hazard, advice } = classifySalinityHazard(ecDsM);
  const isDanger = hazard.includes('MODERATE') || hazard.includes('STRONG');

  return (
    <div className={`p-3 rounded-lg border text-xs ${isDanger ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-green-50 border-green-200 text-green-900'}`}>
      <div className="font-bold flex justify-between">
        <span>Soil EC: {ecDsM.toFixed(1)} dS/m</span>
        <span>{hazard}</span>
      </div>
      <p className="mt-1 text-[11px] opacity-90">{advice}</p>
    </div>
  );
};
