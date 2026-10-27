import React from 'react';
import { HelpCircle, Users, Gift, ShieldAlert } from 'lucide-react';
import { MysteryBox } from '../types';

interface BoardGridProps {
  boxes: MysteryBox[];
  onSelectBox: (boxNumber: number) => void;
  lastOpenedNumber?: number | null;
}

export const BoardGrid: React.FC<BoardGridProps> = ({ boxes, onSelectBox, lastOpenedNumber }) => {
  return (
    <section className="lg:col-span-8 xl:col-span-9 bg-[#081538]/95 border-2 border-blue-700/80 rounded-3xl p-3 sm:p-5 shadow-2xl relative">
      {/* Board Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-blue-800/80">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-yellow-400 text-slate-950 font-display font-bold text-xs sm:text-sm shadow">
            PAPAN 100 KOTAK MISTERI
          </span>
          <span className="text-xs text-blue-200 hidden sm:inline">
            Klik nomor kotak untuk membuka tantangan warga negara!
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px]">
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-900/70 text-blue-200 border border-blue-600/50">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block"></span> Belum Dibuka
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-sky-300 border border-sky-500/40">
            <HelpCircle className="w-3 h-3" /> Pertanyaan
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
            <Users className="w-3 h-3" /> Tugas
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950 text-yellow-300 border border-yellow-500/40">
            <Gift className="w-3 h-3" /> Kejutan
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
            <ShieldAlert className="w-3 h-3" /> Strategi
          </span>
        </div>
      </div>

      {/* 10 x 10 Mystery Box Grid */}
      <div className="grid-100">
        {boxes.map((box) => {
          const isJustOpened = box.opened && lastOpenedNumber === box.number;

          if (!box.opened) {
            return (
              <button
                key={box.number}
                type="button"
                onClick={() => onSelectBox(box.number)}
                className="group aspect-square relative rounded-xl cursor-pointer flex flex-col items-center justify-center transition-all duration-200 transform-gpu bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] border-2 border-blue-400/60 shadow-[0_4px_0_#0f296b,0_6px_12px_rgba(0,0,0,0.4)] hover:-translate-y-1.5 hover:scale-105 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-amber-500 hover:border-yellow-200 hover:shadow-[0_6px_0_#854d0e,0_0_22px_rgba(250,204,21,0.7)] hover:z-10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                title={`Pilih Kotak #${box.number}`}
              >
                <span className="font-display text-base sm:text-xl md:text-2xl font-bold text-white group-hover:text-slate-950 drop-shadow transition-colors duration-200">
                  {box.number}
                </span>
              </button>
            );
          }

          // Opened State styling
          let bgClass = "bg-gradient-to-br from-slate-900 to-slate-800 border-sky-400/80 text-sky-300";
          let IconComponent = HelpCircle;

          if (box.type === 'TASK') {
            bgClass = "bg-gradient-to-br from-emerald-950 to-teal-900 border-emerald-400/80 text-emerald-300";
            IconComponent = Users;
          } else if (box.type === 'SURPRISE') {
            bgClass = "bg-gradient-to-br from-amber-950 to-yellow-950 border-yellow-400/80 text-yellow-300";
            IconComponent = Gift;
          } else if (box.type === 'STRATEGY') {
            bgClass = "bg-gradient-to-br from-purple-950 to-indigo-950 border-purple-400/80 text-purple-300";
            IconComponent = ShieldAlert;
          }

          const animationClass = isJustOpened 
            ? "animate-card-flip animate-shimmer-glow ring-2 ring-yellow-400 z-10" 
            : "scale-95 opacity-85";

          return (
            <div
              key={box.number}
              className={`aspect-square relative rounded-xl flex flex-col items-center justify-center border-2 shadow-inner select-none transition-all duration-300 transform-gpu ${animationClass} ${bgClass}`}
              title={`Kotak #${box.number} sudah dibuka (${box.type})`}
            >
              <span className="font-display text-xs sm:text-sm font-bold opacity-80 leading-none mb-0.5">
                {box.number}
              </span>
              <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-90 transition-transform duration-300 group-hover:scale-110" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
