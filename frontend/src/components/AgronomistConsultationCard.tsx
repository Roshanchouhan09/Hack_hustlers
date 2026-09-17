'use client';
import React from 'react';
import { Video, Award, Star } from 'lucide-react';

export const AgronomistConsultationCard: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <h4 className="text-white font-bold">Direct Agronomist Tele-Consult</h4>
        </div>
        <span className="text-amber-400 font-bold flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400" /> 4.95</span>
      </div>
      <p className="text-slate-400 text-[11px]">Dr. Ananya Sharma (Ph.D. Plant Pathology, ICAR). 15-min audio/video triage session.</p>
      <button className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2">
        <Video className="w-3.5 h-3.5" /> Book 1-on-1 Video Session (Free)
      </button>
    </div>
  );
};
