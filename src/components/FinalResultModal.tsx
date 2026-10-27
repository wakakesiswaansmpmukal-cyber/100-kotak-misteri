import React from 'react';
import { Trophy, Medal, FileDown, RotateCcw, X, CheckCircle, Users, Gift } from 'lucide-react';
import { Team } from '../types';

interface FinalResultModalProps {
  teams: Team[];
  onClose: () => void;
  onExportReport: () => void;
  onResetSession: () => void;
}

export const FinalResultModal: React.FC<FinalResultModalProps> = ({
  teams,
  onClose,
  onExportReport,
  onResetSession
}) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const podiumConfig = [
    { label: "JUARA I", icon: "🥇", border: "border-yellow-400", bg: "from-yellow-500/30 to-amber-950/40" },
    { label: "JUARA II", icon: "🥈", border: "border-slate-300", bg: "from-slate-400/25 to-slate-900/40" },
    { label: "JUARA III", icon: "🥉", border: "border-amber-600", bg: "from-amber-700/25 to-slate-900/40" }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#081538] border-2 border-yellow-400 rounded-3xl max-w-4xl w-full p-5 sm:p-8 space-y-6 shadow-[0_0_60px_rgba(234,179,8,0.4)] animate-reveal my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-lg">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                PANGGUNG JUARA TANTANGAN WARGA NEGARA
              </h2>
              <p className="text-xs sm:text-sm text-blue-200">
                Pendidikan Pancasila Kelas IX — Evaluasi Pemenuhan Hak & Kewajiban
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Podium Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sortedTeams.slice(0, 3).map((team, idx) => {
            const conf = podiumConfig[idx];
            return (
              <div
                key={team.id}
                className={`bg-gradient-to-b ${conf.bg} border-2 ${conf.border} rounded-2xl p-5 text-center space-y-2 shadow-xl relative overflow-hidden`}
              >
                <div className="text-4xl">{conf.icon}</div>
                <div className="text-xs font-bold tracking-widest uppercase text-yellow-300">{conf.label}</div>
                <div className="font-display text-xl sm:text-2xl font-bold text-white truncate">{team.name}</div>
                <div className="font-display text-3xl font-bold text-yellow-400">{team.score} Poin</div>
                <div className="text-xs text-blue-200 flex justify-center gap-3 pt-2 border-t border-white/10">
                  <span title="Pertanyaan Benar">Benar: <strong>{team.correctCount}</strong></span>
                  <span title="Tugas Berhasil">Tugas: <strong>{team.taskCount}</strong></span>
                  <span title="Kotak Kejutan/Strategi">Bonus: <strong>{team.bonusCount}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Standings Table */}
        <div className="bg-blue-950/60 border border-blue-800 rounded-2xl overflow-hidden shadow">
          <div className="p-3 bg-slate-950/80 border-b border-blue-800 font-bold text-sm text-yellow-300 flex items-center gap-2">
            <Medal className="w-4 h-4" /> Klasemen Akhir Seluruh Kelompok
          </div>
          <div className="overflow-x-auto max-h-56">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-blue-300 sticky top-0">
                <tr>
                  <th className="p-3">Peringkat</th>
                  <th className="p-3">Nama Kelompok</th>
                  <th className="p-3 text-center">Total Poin</th>
                  <th className="p-3 text-center">Soal Benar</th>
                  <th className="p-3 text-center">Tugas Berhasil</th>
                  <th className="p-3 text-center">Bonus/Strategi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/50">
                {sortedTeams.map((team, idx) => (
                  <tr key={team.id} className={idx === 0 ? 'bg-yellow-500/10 font-bold' : ''}>
                    <td className="p-3 font-display text-yellow-400">#{idx + 1}</td>
                    <td className="p-3 text-white font-medium">{team.name}</td>
                    <td className="p-3 text-center font-display text-base text-yellow-300 font-bold">{team.score}</td>
                    <td className="p-3 text-center text-sky-300">{team.correctCount}</td>
                    <td className="p-3 text-center text-emerald-300">{team.taskCount}</td>
                    <td className="p-3 text-center text-amber-300">{team.bonusCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-blue-800">
          <div className="flex items-center gap-2">
            <button
              onClick={onResetSession}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Mulai Sesi Baru</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onExportReport}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow transition cursor-pointer"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh Laporan Hasil</span>
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm shadow transition cursor-pointer"
            >
              Kembali ke Papan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
