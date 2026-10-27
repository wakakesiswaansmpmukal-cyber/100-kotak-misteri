import React from 'react';
import { Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[80] animate-bounce-short">
      <div className="bg-slate-950/95 border-2 border-yellow-400 text-yellow-300 font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm backdrop-blur-md">
        <Info className="w-4 h-4 text-yellow-400 shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
