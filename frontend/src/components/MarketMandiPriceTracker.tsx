'use client';
import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

export const MarketMandiPriceTracker: React.FC = () => {
  const mandis = [
    { mandi: 'Patna APMC', crop: 'Wheat (Mill Quality)', msp: 2275, rate: 2450, change: '+Rs 175' },
    { mandi: 'Mokama Mandi', crop: 'Wheat (Sharbati)', msp: 2275, rate: 2680, change: '+Rs 405' },
    { mandi: 'Danapur Market', crop: 'Mustard Seed', msp: 5650, rate: 5820, change: '+Rs 170' },
  ];
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h3 className="text-white font-bold text-sm">Live Mandi APMC Spot Prices & MSP</h3>
        </div>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">MSP Guaranteed</span>
      </div>
      <div className="space-y-2 text-xs">
        {mandis.map((m) => (
          <div key={m.mandi} className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <strong className="text-white">{m.crop}</strong>
              <span className="text-slate-500 block text-[11px]">{m.mandi} • MSP: Rs {m.msp}/Qtl</span>
            </div>
            <div className="text-right">
              <strong className="text-emerald-400 text-sm font-mono">Rs {m.rate} / Qtl</strong>
              <span className="text-emerald-300 text-[10px] block font-bold">{m.change} above MSP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
