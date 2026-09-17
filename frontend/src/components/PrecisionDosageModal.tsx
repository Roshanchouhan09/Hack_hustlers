'use client';

import React, { useState } from 'react';
import { Calculator, Check, AlertCircle, Droplet, DollarSign, X } from 'lucide-react';

interface DosageModalProps {
  isOpen: boolean;
  onClose: () => void;
  affectedAcreage?: number;
  cropName?: string;
  chemicalName?: string;
}

export const PrecisionDosageModal: React.FC<DosageModalProps> = ({
  isOpen,
  onClose,
  affectedAcreage = 0.92,
  cropName = "Wheat",
  chemicalName = "Propiconazole 25% EC"
}) => {
  const [acres, setAcres] = useState(affectedAcreage);
  const [dosagePerAcreMl, setDosagePerAcreMl] = useState(200);
  const [waterPerAcreL, setWaterPerAcreL] = useState(10); // Ultra-low volume drone spray (10L/acre)
  const droneTankCapacityL = 40; // DJI Agras T40 capacity

  if (!isOpen) return null;

  const totalChemicalMl = Math.round(acres * dosagePerAcreMl);
  const totalWaterL = Math.round(acres * waterPerAcreL);
  const requiredDroneSorties = Math.max(1, Math.ceil(totalWaterL / droneTankCapacityL));
  const estimatedChemicalCostRs = Math.round((totalChemicalMl / 1000) * 1450); // Rs 1450 / Liter
  const droneSprayingFeeRs = Math.round(acres * 450); // Rs 450 / Acre

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Precision Chemical Dosage Calculator</h3>
              <p className="text-slate-400 text-xs">{cropName} • {chemicalName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px]">Target Spray Area (Acres)</span>
            <input
              type="number"
              step="0.1"
              value={acres}
              onChange={(e) => setAcres(Math.max(0.1, Number(e.target.value)))}
              className="w-full bg-transparent text-white font-bold text-base focus:outline-none"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-slate-400 block text-[10px]">Drone Water Rate (L/Acre)</span>
            <input
              type="number"
              value={waterPerAcreL}
              onChange={(e) => setWaterPerAcreL(Math.max(5, Number(e.target.value)))}
              className="w-full bg-transparent text-emerald-400 font-bold text-base focus:outline-none"
            />
          </div>
        </div>

        {/* Calculations Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Total Chemical Required</span>
            <strong className="text-amber-400 text-base font-mono">{totalChemicalMl} ml</strong>
            <span className="text-slate-500 text-[10px] block">Active Concentrate</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] block">Spray Carrier Water</span>
            <strong className="text-sky-400 text-base font-mono">{totalWaterL} Liters</strong>
            <span className="text-slate-500 text-[10px] block">{requiredDroneSorties} Drone Sortie(s)</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-slate-400 text-[10px] block">Total Budget Estimate</span>
            <strong className="text-emerald-400 text-base font-mono">Rs {estimatedChemicalCostRs + droneSprayingFeeRs}</strong>
            <span className="text-slate-500 text-[10px] block">Chemical + Pilot</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Spot spraying saves 92% chemical volume compared to whole-field broadcast spraying.</span>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-600/30"
        >
          Confirm & Forward to Drone Operator
        </button>
      </div>
    </div>
  );
};
