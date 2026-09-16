'use client';
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export const NetworkStatusIndicator: React.FC = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="bg-amber-500/20 border border-amber-500/40 px-4 py-2 rounded-xl text-xs text-amber-300 flex items-center gap-2">
      <WifiOff className="w-4 h-4" />
      <span>Offline mode active: Cached farm maps and offline voice commands enabled.</span>
    </div>
  );
};
