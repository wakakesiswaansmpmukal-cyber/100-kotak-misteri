import React, { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface CustomDialogProps {
  title: string;
  message: string;
  showInput?: boolean;
  defaultInput?: string;
  inputPlaceholder?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: (inputText: string) => void;
  onCancel: () => void;
}

export const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  message,
  showInput = false,
  defaultInput = '',
  inputPlaceholder = 'Ketik di sini...',
  confirmText = 'Lanjutkan',
  cancelText = 'Batal',
  isDestructive = false,
  onConfirm,
  onCancel
}) => {
  const [inputValue, setInputValue] = useState(defaultInput);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(inputValue.trim());
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/85 flex items-center justify-center p-4">
      <div className="bg-[#0b1c47] border-2 border-yellow-400 rounded-2xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-reveal">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
            isDestructive ? 'bg-rose-600 text-white' : 'bg-yellow-400 text-slate-950'
          }`}>
            {isDestructive ? <AlertCircle className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
          </div>
          <h3 className="font-display text-base sm:text-lg font-bold text-white">
            {title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
          {message}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {showInput && (
            <div>
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-blue-700 text-white text-xs sm:text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-800">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs cursor-pointer transition"
            >
              {cancelText}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-xl font-bold text-xs shadow transition cursor-pointer ${
                isDestructive
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-yellow-400 hover:bg-yellow-300 text-slate-950'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
