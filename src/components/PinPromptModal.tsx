import React, { useState } from 'react';
import { ShieldAlert, X, KeyRound, Check, Eye, EyeOff } from 'lucide-react';
import { playSound } from '../utils/sound';

interface PinPromptModalProps {
  onSuccess: () => void;
  onCancel: () => void;
  correctPin: string;
  actionTitle?: string;
}

export const PinPromptModal: React.FC<PinPromptModalProps> = ({
  onSuccess,
  onCancel,
  correctPin,
  actionTitle = "Akses Panel Guru & Moderator"
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === correctPin.trim()) {
      playSound('correct');
      onSuccess();
    } else {
      playSound('wrong');
      setError(true);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#091842] border-2 border-yellow-400 rounded-3xl max-w-sm w-full p-6 shadow-2xl animate-reveal space-y-4">
        
        <div className="flex items-center justify-between border-b border-blue-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Verifikasi PIN Guru</h3>
              <p className="text-[11px] text-blue-300">{actionTitle}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-blue-200">
          Fitur ini dilindungi. Masukkan PIN Guru untuk melanjutkan.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPin ? "text" : "password"}
              maxLength={8}
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Masukkan PIN..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-blue-600 focus:border-yellow-400 text-white font-mono text-center text-lg tracking-[0.25em] font-bold outline-none shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-3 text-slate-400 hover:text-white transition cursor-pointer"
            >
              {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <div className="text-xs text-rose-300 font-semibold bg-rose-950/80 border border-rose-600 px-3 py-1.5 rounded-xl text-center">
              PIN salah! Silakan coba lagi.
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Verifikasi</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
