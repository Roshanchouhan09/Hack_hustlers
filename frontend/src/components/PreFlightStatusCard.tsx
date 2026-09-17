import React from 'react';

interface PreFlightStatusProps {
  satellites: number;
  batteryPct: number;
  isGreenZone: boolean;
  onConfirmReady: () => void;
}

export const PreFlightStatusCard: React.FC<PreFlightStatusProps> = ({
  satellites,
  batteryPct,
  isGreenZone,
  onConfirmReady,
}) => {
  const isReady = satellites >= 12 && batteryPct >= 90 && isGreenZone;

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm space-y-3">
      <h3 className="font-bold text-gray-900 text-sm flex items-center justify-between">
        <span>Pre-Flight Readiness Audit</span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isReady ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
          {isReady ? 'READY FOR TAKEOFF' : 'INSPECTION PENDING'}
        </span>
      </h3>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-gray-50 rounded">
          <div className="text-gray-500">GNSS Lock</div>
          <div className="font-bold text-gray-800">{satellites} Sats</div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="text-gray-500">Battery</div>
          <div className="font-bold text-gray-800">{batteryPct}%</div>
        </div>
        <div className="p-2 bg-gray-50 rounded">
          <div className="text-gray-500">Digital Sky</div>
          <div className="font-bold text-gray-800">{isGreenZone ? 'Green Zone' : 'Restricted'}</div>
        </div>
      </div>
      <button
        disabled={!isReady}
        onClick={onConfirmReady}
        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg transition-colors"
      >
        ARM MOTORS & BEGIN SURVEY
      </button>
    </div>
  );
};
