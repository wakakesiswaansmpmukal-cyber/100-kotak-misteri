import React from 'react';
import { 
  Trophy, 
  RotateCw, 
  Dices, 
  History, 
  CheckCircle2, 
  Users, 
  Gift, 
  Shield, 
  Zap,
  FastForward,
  Settings2
} from 'lucide-react';
import { Team, HistoryLog } from '../types';

interface TeamsSidebarProps {
  teams: Team[];
  currentTurnIndex: number;
  history: HistoryLog[];
  onSelectTurn: (index: number) => void;
  onSkipTurn: () => void;
  onPickRandomBox: () => void;
  onOpenTeacherTeams: () => void;
}

export const TeamsSidebar: React.FC<TeamsSidebarProps> = ({
  teams,
  currentTurnIndex,
  history,
  onSelectTurn,
  onSkipTurn,
  onPickRandomBox,
  onOpenTeacherTeams
}) => {
  const activeTeam = teams[currentTurnIndex] || teams[0];

  return (
    <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
      {/* Active Turn Banner */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 rounded-2xl p-4 border-2 border-yellow-400/80 shadow-xl relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-400/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
            Giliran Bermain Sekarang
          </span>
          {activeTeam && (activeTeam.doubleNext || activeTeam.shield) && (
            <div className="flex items-center gap-1">
              {activeTeam.doubleNext && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white border border-purple-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-300" />
                  2x Poin!
                </span>
              )}
              {activeTeam.shield && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-600 text-white border border-sky-300 flex items-center gap-1" title="Perisai Perlindungan Bebas Pengurangan Poin">
                  <Shield className="w-3 h-3" />
                  Perisai
                </span>
              )}
            </div>
          )}
        </div>

        <div className="font-display text-2xl sm:text-3xl font-bold text-white truncate my-1">
          {activeTeam ? activeTeam.name : "Kelompok 1"}
        </div>
        <p className="text-xs text-blue-200 mb-3">
          Pilih satu nomor kotak pada papan misteri (1–100) untuk dibuka!
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-blue-800/80">
          <button
            onClick={onSkipTurn}
            className="px-3 py-2 rounded-xl bg-blue-800/80 hover:bg-blue-700 text-xs font-semibold text-blue-100 flex items-center justify-center gap-1.5 border border-blue-600/60 transition cursor-pointer"
          >
            <FastForward className="w-3.5 h-3.5 text-yellow-400" />
            <span>Lewati Giliran</span>
          </button>
          <button
            onClick={onPickRandomBox}
            className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-semibold text-yellow-300 flex items-center justify-center gap-1.5 border border-yellow-500/40 transition cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5 text-yellow-400" />
            <span>Acak Kotak</span>
          </button>
        </div>
      </div>

      {/* Team Scoreboard List */}
      <div className="bg-[#09173d]/90 border border-blue-800/80 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-base sm:text-lg font-bold text-yellow-300 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>PAPAN SKOR KELOMPOK</span>
          </h2>
          <button
            onClick={onOpenTeacherTeams}
            className="text-xs text-blue-300 hover:text-yellow-300 flex items-center gap-1 transition cursor-pointer"
          >
            <Settings2 className="w-3 h-3" />
            <span>Atur</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {teams.map((team, idx) => {
            const isTurn = idx === currentTurnIndex;
            return (
              <div
                key={team.id}
                className={`rounded-xl p-3 transition flex items-center justify-between gap-2 border ${
                  isTurn
                    ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.35)]'
                    : 'bg-slate-900/80 border-blue-800/60 hover:border-blue-600'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => onSelectTurn(idx)}
                    title="Klik untuk memilih giliran kelompok ini"
                    className={`w-8 h-8 rounded-lg font-display font-bold text-xs flex items-center justify-center shrink-0 cursor-pointer transition ${
                      isTurn
                        ? 'bg-yellow-400 text-slate-950 shadow-md ring-2 ring-yellow-300'
                        : 'bg-blue-950 text-blue-300 border border-blue-700 hover:bg-blue-900'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                  <div className="min-w-0">
                    <div className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                      <span>{team.name}</span>
                      {team.doubleNext && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-600 text-white font-bold">2x</span>
                      )}
                      {team.shield && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-600 text-white font-bold" title="Perisai Perlindungan">🛡️</span>
                      )}
                    </div>
                    <div className="text-[11px] text-blue-300 flex items-center gap-2.5">
                      <span className="flex items-center gap-0.5" title="Pertanyaan Benar">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {team.correctCount}
                      </span>
                      <span className="flex items-center gap-0.5" title="Tugas Berhasil">
                        <Users className="w-3 h-3 text-sky-400" />
                        {team.taskCount}
                      </span>
                      <span className="flex items-center gap-0.5" title="Kotak Bonus/Strategi">
                        <Gift className="w-3 h-3 text-yellow-400" />
                        {team.bonusCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className={`font-display text-xl font-bold ${team.score >= 0 ? 'text-yellow-400' : 'text-rose-400'}`}>
                    {team.score}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Poin</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Score History Log */}
      <div className="bg-[#09173d]/90 border border-blue-800/80 rounded-2xl p-4 shadow-xl flex flex-col h-60">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-display text-sm font-bold text-blue-200 flex items-center gap-2">
            <History className="w-3.5 h-3.5 text-yellow-400" />
            <span>RIWAYAT AKTIVITAS & SKOR</span>
          </h3>
          <span className="text-[11px] text-blue-400 font-mono">
            {history.length} catatan
          </span>
        </div>

        <div className="overflow-y-auto space-y-1.5 pr-1 text-xs flex-1">
          {history.length === 0 ? (
            <div className="text-slate-400 text-center py-6 text-xs">Belum ada aktivitas tercatat.</div>
          ) : (
            [...history].reverse().map(item => (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-blue-900/70 rounded-lg px-2.5 py-1.5 flex items-start gap-2"
              >
                <span className="text-[10px] font-mono text-yellow-400 shrink-0 mt-0.5">
                  {item.time}
                </span>
                <span className="text-blue-100 leading-snug">
                  {item.text}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};
