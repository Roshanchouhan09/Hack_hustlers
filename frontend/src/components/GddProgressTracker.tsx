import React from 'react';

export const GddProgressTracker: React.FC<{ accumulatedGdd: number; targetGdd: number; cropName: string }> = ({
  accumulatedGdd,
  targetGdd,
  cropName,
}) => {
  const pct = Math.min(100, Math.round((accumulatedGdd / targetGdd) * 100));

  return (
    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
      <div className="flex justify-between text-slate-300">
        <span>{cropName} Thermal Maturity</span>
        <span className="font-bold text-emerald-400">{pct}% ({accumulatedGdd} / {targetGdd} GDD)</span>
      </div>
      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
