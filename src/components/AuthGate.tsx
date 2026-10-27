import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  KeyRound, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Lock,
  GraduationCap
} from 'lucide-react';
import { playSound } from '../utils/sound';

interface AuthGateProps {
  onLoginTeacher: (pin: string) => boolean;
  onLoginStudent: () => void;
  onOpenGuide: () => void;
  defaultTeacherPin: string;
}

export const AuthGate: React.FC<AuthGateProps> = ({
  onLoginTeacher,
  onLoginStudent,
  onOpenGuide,
  defaultTeacherPin
}) => {
  const [activeTab, setActiveTab] = useState<'TEACHER' | 'STUDENT'>('TEACHER');
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) {
      setErrorMessage("Silakan masukkan PIN Guru terlebih dahulu.");
      playSound('wrong');
      return;
    }

    const success = onLoginTeacher(pinInput.trim());
    if (!success) {
      setErrorMessage("PIN salah! Silakan periksa kembali PIN Anda.");
      playSound('wrong');
    } else {
      playSound('correct');
    }
  };

  const handleStudentEnter = () => {
    playSound('fanfare');
    onLoginStudent();
  };

  const handleKeypadPress = (digit: string) => {
    if (pinInput.length < 6) {
      playSound('click');
      setPinInput(prev => prev + digit);
      setErrorMessage(null);
    }
  };

  const handleKeypadBackspace = () => {
    playSound('click');
    setPinInput(prev => prev.slice(0, -1));
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-radial from-[#122b6a] via-[#081538] to-[#030716] text-white px-4 py-6 sm:py-10">
      
      {/* Top Bar Branding */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between border-b border-blue-900/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 font-display font-bold text-lg shadow-lg">
            100
          </div>
          <div>
            <div className="font-display font-bold text-base sm:text-lg text-white tracking-wide">
              100 KOTAK TANTANGAN WARGA NEGARA
            </div>
            <div className="text-[11px] text-blue-300">
              Pendidikan Pancasila Kelas IX SMP — Bab 2: Hak dan Kewajiban
            </div>
          </div>
        </div>

        <button
          onClick={onOpenGuide}
          className="px-3 py-1.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 border border-blue-700/80 text-xs font-semibold text-blue-200 flex items-center gap-1.5 transition cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-yellow-400" />
          <span>Panduan</span>
        </button>
      </div>

      {/* Main Authentication Card */}
      <main className="max-w-xl w-full mx-auto my-auto py-6">
        <div className="bg-[#091842]/95 border-2 border-yellow-400/90 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(234,179,8,0.3)] animate-reveal relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-xl">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
              GERBANG AKSES GAME SHOW
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-sm mx-auto">
              Pilih peran akses Anda untuk memulai pembelajaran interaktif di kelas.
            </p>
          </div>

          {/* Role Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950/80 border border-blue-900 rounded-2xl mb-6 text-xs sm:text-sm font-bold">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('TEACHER');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'TEACHER'
                  ? 'bg-yellow-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Akses Guru</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                setActiveTab('STUDENT');
                setErrorMessage(null);
              }}
              className={`py-2.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                activeTab === 'STUDENT'
                  ? 'bg-yellow-400 text-slate-950 shadow-md font-extrabold'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Mode Siswa / Kelas</span>
            </button>
          </div>

          {/* Tab 1: TEACHER LOGIN WITH PIN */}
          {activeTab === 'TEACHER' ? (
            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Masukkan PIN Guru:</span>
                </label>

                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    maxLength={8}
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setErrorMessage(null);
                    }}
                    placeholder="Ketik 4-digit PIN..."
                    className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border-2 border-blue-600 focus:border-yellow-400 text-white font-mono text-center text-xl tracking-[0.3em] font-bold outline-none transition shadow-inner"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white transition cursor-pointer"
                    title={showPin ? "Sembunyikan PIN" : "Tampilkan PIN"}
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Quick Keypad */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => handleKeypadPress(num)}
                      className="py-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-800 border border-blue-700/60 text-sm font-bold text-blue-100 transition active:scale-95 cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPinInput('')}
                    className="py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-blue-800/60 text-xs font-semibold text-slate-400 transition cursor-pointer"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleKeypadPress('0')}
                    className="py-2.5 rounded-xl bg-slate-900/90 hover:bg-blue-800 border border-blue-700/60 text-sm font-bold text-blue-100 transition active:scale-95 cursor-pointer"
                  >
                    0
                  </button>
                  <button
                    type="button"
                    onClick={handleKeypadBackspace}
                    className="py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-blue-800/60 text-xs font-semibold text-slate-300 transition cursor-pointer"
                  >
                    ⌫ Hapus
                  </button>
                </div>

                {errorMessage && (
                  <div className="text-xs text-rose-300 font-semibold bg-rose-950/80 border border-rose-600/60 px-3 py-2 rounded-xl text-center animate-shake">
                    {errorMessage}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-display font-bold text-base shadow-xl flex items-center justify-center gap-2 transition cursor-pointer transform hover:scale-[1.02]"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>MASUK SEBAGAI GURU & MODERATOR</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
          ) : (
            /* Tab 2: STUDENT / CLASSROOM VIEW */
            <div className="space-y-5 text-center py-2">
              <div className="bg-blue-950/80 border border-blue-800 rounded-2xl p-4 text-xs sm:text-sm text-blue-200 leading-relaxed text-left space-y-2">
                <div className="font-bold text-yellow-300 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Mode Siswa / Tampilan Proyektor:</span>
                </div>
                <p>
                  Siswa dan kelompok dapat langsung bermain memilih 100 kotak misteri, menjawab soal, dan melihat skor live di layar proyektor tanpa memerlukan kata sandi.
                </p>
                <p className="text-[11px] text-blue-300 italic">
                  *Akses Panel Guru dan pengubahan bank soal akan tetap terkunci dengan PIN pengaman.
                </p>
              </div>

              <button
                type="button"
                onClick={handleStudentEnter}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-display font-bold text-base shadow-xl flex items-center justify-center gap-2 transition cursor-pointer transform hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5" />
                <span>MULAI PERMAINAN (MODE KELAS)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-5xl w-full mx-auto text-center text-xs text-blue-300/80 border-t border-blue-900/60 pt-4">
        100 Kotak Tantangan Warga Negara — Game Show Pembelajaran Interaktif Kurikulum Merdeka
      </footer>

    </div>
  );
};
