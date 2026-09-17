'use client';

import React from 'react';
import { Volume2, Mic, Sparkles } from 'lucide-react';

interface AudioFeedbackProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  language?: string;
}

export const AudioVoiceFeedback: React.FC<AudioFeedbackProps> = ({
  isListening = false,
  isSpeaking = false,
  language = 'hi'
}) => {
  return (
    <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl shadow-xl">
      <div className={`p-2 rounded-xl border ${
        isListening
          ? 'bg-red-500/20 border-red-500/40 text-red-400 animate-pulse'
          : isSpeaking
          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
          : 'bg-slate-800 border-slate-700 text-slate-400'
      }`}>
        {isListening ? <Mic className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
          <span>{isListening ? 'Listening...' : isSpeaking ? 'Speaking Advisory' : 'Voice Assistant Ready'}</span>
          <span className="text-[10px] text-slate-400 font-mono uppercase bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800">
            {language}
          </span>
        </div>

        {/* Animated Sound Wave Bars */}
        <div className="flex items-center gap-1 h-3">
          {[40, 70, 30, 90, 60, 80, 50].map((h, i) => (
            <span
              key={i}
              className={`w-1 rounded-full transition-all duration-200 ${
                isSpeaking
                  ? 'bg-emerald-400 animate-bounce'
                  : isListening
                  ? 'bg-red-400 animate-pulse'
                  : 'bg-slate-700'
              }`}
              style={{
                height: isSpeaking || isListening ? `${h}%` : '20%',
                animationDelay: `${i * 80}ms`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
