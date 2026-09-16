'use client';
import React from 'react';
import { Quote } from 'lucide-react';

export const FarmerTestimonialCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl text-xs space-y-2">
      <Quote className="w-5 h-5 text-emerald-400/50" />
      <p className="text-slate-300 italic text-[11px] leading-relaxed">
        "AgriVision ke 3D map aur drone chhidkaw se mere 12.5 acre khet me peeli gerui turant ruk gayi aur dawai ka kharcha aadha ho gaya."
      </p>
      <div className="text-slate-400 text-[10px] font-bold">— Rammohan Kumar (Patna, Bihar)</div>
    </div>
  );
};
