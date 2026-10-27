import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  UserCheck, 
  Trophy, 
  Maximize, 
  Minimize,
  HelpCircle,
  Users,
  Gift,
  ShieldAlert,
  LogOut,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { MysteryBox, UserRole } from '../types';

interface HeaderProps {
  boxes: MysteryBox[];
  currentRole: UserRole;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenGuide: () => void;
  onOpenTeacher: () => void;
  onOpenFinal: () => void;
  onLogout: () => void;
  onSwitchToTeacher?: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  boxes,
  currentRole,
  soundEnabled,
  onToggleSound,
  onOpenGuide,
  onOpenTeacher,
  onOpenFinal,
  onLogout,
  onSwitchToTeacher,
  isFullscreen,
  onToggleFullscreen
}) => {
  const openedCount = boxes.filter(b => b.opened).length;
  const remainingCount = 100 - openedCount;

  const qCount = boxes.filter(b => b.type === 'QUESTION').length;
  const tCount = boxes.filter(b => b.type === 'TASK').length;
  const sCount = boxes.filter(b => b.type === 'SURPRISE').length;
  const stCount = boxes.filter(b => b.type === 'STRATEGY').length;

  return (
    <header className="bg-[#071334]/95 border-b border-blue-800/80 sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-300 via-yellow-500 to-amber-700 flex items-center justify-center shadow-lg border border-yellow-200 text-slate-950 font-display text-xl font-bold">
            100
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-lg sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-200 to-yellow-400">
                100 KOTAK TANTANGAN WARGA NEGARA
              </h1>
              <span className="hidden xl:inline-block text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-900/90 text-yellow-300 border border-yellow-400/40">
                Kelas IX SMP
              </span>
            </div>
            <p className="text-xs text-blue-200/90 hidden sm:block">
              Pendidikan Pancasila — Bab 2: Tantangan Pemenuhan Hak dan Kewajiban Warga Negara
            </p>
          </div>
        </div>

        {/* Live Game Stats Pill */}
        <div className="flex items-center gap-2 sm:gap-4 bg-blue-950/90 border border-blue-700/70 px-3.5 py-1.5 rounded-xl shadow-inner">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Kotak Terbuka</div>
            <div className="font-display text-sm sm:text-base font-bold text-yellow-400">
              <span>{openedCount}</span> / 100
            </div>
          </div>
          <div className="h-6 w-[1px] bg-blue-800"></div>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-wider text-blue-300 font-semibold">Tersisa</div>
            <div className="font-display text-sm sm:text-base font-bold text-emerald-400">
              {remainingCount}
            </div>
          </div>
          <div className="h-6 w-[1px] bg-blue-800 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-700/60 flex items-center gap-1" title="70 Kotak Pertanyaan">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{qCount}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60 flex items-center gap-1" title="15 Kotak Tugas Kelompok">
              <Users className="w-3.5 h-3.5" />
              <span>{tCount}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/60 flex items-center gap-1" title="10 Kotak Kejutan">
              <Gift className="w-3.5 h-3.5" />
              <span>{sCount}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/60 flex items-center gap-1" title="5 Kotak Strategi">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{stCount}</span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Role Status Indicator */}
          {currentRole === 'TEACHER' ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-yellow-400/50 text-yellow-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span>Guru</span>
            </div>
          ) : (
            <button
              onClick={onSwitchToTeacher}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-900/60 hover:bg-blue-800 border border-blue-600/70 text-blue-200 hover:text-white text-xs font-semibold transition cursor-pointer"
              title="Verifikasi PIN untuk akses Guru"
            >
              <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
              <span>Siswa</span>
            </button>
          )}

          <button
            onClick={onToggleSound}
            className="p-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600 text-yellow-300 transition cursor-pointer"
            title={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={onOpenGuide}
            className="px-3 py-2 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition text-blue-100 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">Panduan</span>
          </button>

          <button
            onClick={onOpenTeacher}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Panel Guru</span>
          </button>

          <button
            onClick={onOpenFinal}
            className="px-3 py-2 rounded-xl bg-rose-600/90 hover:bg-rose-500 border border-rose-400 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition shadow cursor-pointer"
            title="Akhiri & Lihat Juara"
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="hidden sm:inline">Hasil Akhir</span>
          </button>

          <button
            onClick={onToggleFullscreen}
            className="p-2.5 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-blue-600 text-white transition cursor-pointer"
            title="Layar Penuh (Proyektor Kelas)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-slate-800/90 hover:bg-rose-900/80 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-white transition cursor-pointer"
            title="Keluar / Ganti Peran (Log Out)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="stage-glow"></div>
    </header>
  );
};
