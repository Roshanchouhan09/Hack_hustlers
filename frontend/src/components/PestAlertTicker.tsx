'use client';
import React from 'react';
import { AlertOctagon } from 'lucide-react';

export const PestAlertTicker: React.FC = () => {
  return (
    <div className="bg-red-950/40 border border-red-800/50 p-4 rounded-2xl text-xs text-red-200 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
          <AlertOctagon className="w-4 h-4 animate-bounce" />
        </div>
        <div>
          <strong className="text-white font-bold">Regional Fungal Outbreak Alert:</strong> Yellow Stripe Rust detected in 4 neighboring farms within 3.5 km radius of Bihta block.
        </div>
      </div>
      <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full font-bold text-[10px] uppercase border border-red-500/40 whitespace-nowrap">High Advisory</span>
    </div>
  );
};
