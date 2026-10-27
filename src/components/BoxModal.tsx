import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  KeyRound, 
  X, 
  Timer, 
  Pause, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Share2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  Check, 
  HelpCircle,
  Users,
  Gift,
  ShieldAlert,
  FastForward,
  Undo2
} from 'lucide-react';
import { MysteryBox, Team, TaskFormat } from '../types';
import { playSound } from '../utils/sound';

interface BoxModalProps {
  box: MysteryBox;
  teams: Team[];
  currentTurnIndex: number;
  wrongPenalty: number;
  onClose: () => void;
  onCancelSelection: () => void;
  onResolveQuestion: (boxNumber: number, teamIndex: number, isCorrect: boolean) => void;
  onResolveTask: (boxNumber: number, teamIndex: number, isSuccess: boolean, format: TaskFormat) => void;
  onResolveSpecial: (
    boxNumber: number, 
    originTeamIndex: number, 
    payload: {
      targetTeamIndex?: number;
      customPoints?: number;
      isWin?: boolean;
      outcome?: 'TARGET_WIN' | 'ORIGIN_WIN';
    }
  ) => void;
  onSkipBox: (boxNumber: number) => void;
}

export const BoxModal: React.FC<BoxModalProps> = ({
  box,
  teams,
  currentTurnIndex,
  onClose,
  onCancelSelection,
  onResolveQuestion,
  onResolveTask,
  onResolveSpecial,
  onSkipBox
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [taskFormat, setTaskFormat] = useState<TaskFormat>(box.taskFormat || 'Lisan');

  // Referee / Turn State
  const [responderTeamIndex, setResponderTeamIndex] = useState<number>(currentTurnIndex);
  const [isRebound, setIsRebound] = useState(false);
  const [decisionMade, setDecisionMade] = useState(false);
  const [decisionSummary, setDecisionSummary] = useState<{
    isPositive: boolean;
    title: string;
    subtitle: string;
    keepTurn?: boolean;
  } | null>(null);

  // Special Box interactive controls state
  const [specialTargetIndex, setSpecialTargetIndex] = useState<number>(
    teams.findIndex((_, idx) => idx !== currentTurnIndex) !== -1 
      ? teams.findIndex((_, idx) => idx !== currentTurnIndex) 
      : 0
  );
  const [specialResult, setSpecialResult] = useState<'WIN' | 'LOSE' | 'TARGET_WIN' | 'ORIGIN_WIN'>('WIN');
  const [specialCustomPoints, setSpecialCustomPoints] = useState<number>(100);

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(box.timer || 30);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeTeam = teams[responderTeamIndex] || teams[0];

  let effectivePoints = box.points;
  if (activeTeam.doubleNext && (box.type === 'QUESTION' || box.type === 'TASK')) {
    effectivePoints = box.points * 2;
  }

  // Handle countdown timer
  useEffect(() => {
    if (!isRevealed || decisionMade) return;

    timerRef.current = setInterval(() => {
      if (!isTimerPaused) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            playSound('buzz');
            return 0;
          }
          if (prev <= 6) {
            playSound('tick');
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRevealed, isTimerPaused, decisionMade]);

  const handleReveal = () => {
    playSound('reveal');
    setIsRevealed(true);
    setTimeLeft(box.timer || 30);
    setIsTimerPaused(false);
  };

  const handleSelectOption = (idx: number) => {
    if (decisionMade) return;
    playSound('click');
    setSelectedOptionIndex(idx);
  };

  const handleVerifyOption = () => {
    if (decisionMade || selectedOptionIndex === null || !box.options) return;

    const chosenText = box.options[selectedOptionIndex].trim();
    const answerKey = box.answer.trim();

    const chosenLetter = chosenText.charAt(0).toUpperCase();
    const answerLetter = answerKey.charAt(0).toUpperCase();

    const isCorrect = chosenLetter === answerLetter || chosenText.toLowerCase() === answerKey.toLowerCase();
    setShowAnswerKey(true);
    handleQuestionAnswer(isCorrect);
  };

  const handleQuestionAnswer = (isCorrect: boolean) => {
    if (decisionMade) return;
    setDecisionMade(true);
    if (timerRef.current) clearInterval(timerRef.current);

    onResolveQuestion(box.number, responderTeamIndex, isCorrect);

    if (isCorrect) {
      playSound('correct');
      setDecisionSummary({
        isPositive: true,
        title: `Jawaban Benar! +${effectivePoints} Poin untuk ${activeTeam.name}`,
        subtitle: `Kotak #${box.number} telah disahkan dan dikunci secara permanen.`
      });
    } else {
      playSound('wrong');
      setDecisionSummary({
        isPositive: false,
        title: `Jawaban Kurang Tepat untuk ${activeTeam.name}`,
        subtitle: `Kotak #${box.number} telah dikunci.`
      });
    }
  };

  const handleRebound = () => {
    if (decisionMade) return;
    const nextIdx = (responderTeamIndex + 1) % teams.length;
    setResponderTeamIndex(nextIdx);
    setIsRebound(true);
    setTimeLeft(20);
    setIsTimerPaused(false);
    playSound('click');
  };

  const handleTaskAnswer = (isSuccess: boolean) => {
    if (decisionMade) return;
    setDecisionMade(true);
    if (timerRef.current) clearInterval(timerRef.current);

    onResolveTask(box.number, responderTeamIndex, isSuccess, taskFormat);

    if (isSuccess) {
      playSound('correct');
      setDecisionSummary({
        isPositive: true,
        title: `Tugas Berhasil (${taskFormat})! +${effectivePoints} Poin untuk ${activeTeam.name}`,
        subtitle: `Kotak #${box.number} telah disahkan dan dikunci secara permanen.`
      });
    } else {
      playSound('wrong');
      setDecisionSummary({
        isPositive: false,
        title: `Tugas Belum Berhasil (${activeTeam.name})`,
        subtitle: `Kotak #${box.number} telah dikunci.`
      });
    }
  };

  const handleSpecialAction = () => {
    if (decisionMade) return;
    setDecisionMade(true);
    if (timerRef.current) clearInterval(timerRef.current);
    playSound('fanfare');

    const code = box.effectCode;
    let keep = false;

    if (code === 'EXTRA_TURN') {
      keep = true;
    }

    onResolveSpecial(box.number, responderTeamIndex, {
      targetTeamIndex: specialTargetIndex,
      customPoints: specialCustomPoints,
      isWin: specialResult === 'WIN',
      outcome: specialResult === 'TARGET_WIN' ? 'TARGET_WIN' : 'ORIGIN_WIN'
    });

    let title = `Efek Khusus Diaktifkan untuk ${activeTeam.name}!`;
    let subtitle = `Kotak #${box.number} telah digunakan dan dikunci.`;

    if (code === 'EXTRA_TURN') {
      title = `+${box.points} Poin & Giliran Tambahan untuk ${activeTeam.name}!`;
      subtitle = `${activeTeam.name} berhak memilih 1 kotak lagi setelah ini.`;
    } else if (code === 'STEAL_POINTS') {
      const targetTeam = teams[specialTargetIndex];
      title = `${activeTeam.name} Berhasil Mengambil Poin dari ${targetTeam?.name || 'Lawan'}!`;
    } else if (code === 'BUZZER_CHALLENGE') {
      const winner = teams[specialTargetIndex];
      title = `Pemenang Rebutan: ${winner?.name || activeTeam.name} (+${box.points} Poin)!`;
    } else if (code === 'DOUBLE_NEXT') {
      title = `Efek 2x Poin Aktif untuk ${activeTeam.name}!`;
      subtitle = `Pertanyaan/tugas berikutnya yang diselesaikan akan bernilai 2x lipat.`;
    }

    setDecisionSummary({
      isPositive: true,
      title,
      subtitle,
      keepTurn: keep
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-gradient-to-b from-[#0f255e] via-[#09173d] to-[#050d24] border-2 border-yellow-400 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-[0_0_50px_rgba(234,179,8,0.35)] animate-reveal my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-600 text-slate-950 font-display text-2xl sm:text-3xl font-bold flex items-center justify-center shadow-lg border-2 border-white">
              #{box.number}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  box.type === 'QUESTION' ? 'bg-sky-400 text-slate-950' :
                  box.type === 'TASK' ? 'bg-emerald-400 text-slate-950' :
                  box.type === 'SURPRISE' ? 'bg-yellow-400 text-slate-950' :
                  'bg-purple-400 text-slate-950'
                }`}>
                  {isRevealed ? (
                    box.type === 'QUESTION' ? 'Pertanyaan Pancasila' :
                    box.type === 'TASK' ? 'Tugas Kelompok' :
                    box.type === 'SURPRISE' ? 'Kotak Kejutan' : 'Kotak Strategi'
                  ) : 'Kotak Misteri'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-900 text-yellow-300 border border-yellow-400/50">
                  {isRevealed ? `${box.difficulty} · ${effectivePoints} Poin` : 'Rahasia'}
                </span>
                <span className="text-xs text-blue-300 hidden sm:inline">
                  {isRevealed ? box.topic : 'Siap Dibuka'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blue-200 mt-1">
                Giliran: <strong className="text-yellow-300">{activeTeam.name}</strong>
                {isRebound && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-rose-600 text-white text-xs font-bold">
                    Mode Lemparan Rebutan!
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Countdown Stopwatch Timer */}
          {isRevealed && (
            <div className="flex items-center gap-2 bg-slate-950/90 border border-blue-600 px-3.5 py-1.5 rounded-2xl">
              <Timer className="w-5 h-5 text-yellow-400" />
              <span className={`font-display text-2xl font-bold tabular-nums ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
                {timeLeft}s
              </span>
              <button
                onClick={() => setIsTimerPaused(!isTimerPaused)}
                className="ml-1 p-1.5 rounded bg-blue-800 hover:bg-blue-700 text-xs text-blue-100 transition cursor-pointer"
                title={isTimerPaused ? "Lanjutkan" : "Jeda"}
              >
                {isTimerPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setTimeLeft(box.timer || 30);
                  setIsTimerPaused(false);
                }}
                className="p-1.5 rounded bg-blue-900 hover:bg-blue-800 text-xs text-blue-200 transition cursor-pointer"
                title="Ulangi Waktu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* STEP 1: PRE-OPEN STAGE */}
        {!isRevealed ? (
          <div className="py-10 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-500 to-yellow-700 flex items-center justify-center text-slate-950 text-5xl shadow-2xl pulse-gold">
              <Box className="w-12 h-12" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              Kotak Misteri Nomor #{box.number} Siap Dibuka!
            </h3>
            <p className="text-sm text-blue-200 max-w-md mx-auto mb-6">
              Apakah berisi Pertanyaan Pilihan Ganda, Tantangan Kelompok, Kotak Kejutan, atau Kotak Strategi?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={handleReveal}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-display font-bold text-lg shadow-xl transform hover:scale-105 transition flex items-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-5 h-5" />
                <span>BUKA KOTAK SEKARANG</span>
              </button>
              <button
                onClick={onCancelSelection}
                className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-600 transition cursor-pointer"
              >
                Batal Pilih Kotak
              </button>
            </div>
          </div>
        ) : (
          /* STEP 2: REVEALED CONTENT STAGE */
          <div className="py-5 space-y-5 animate-card-flip">
            
            {/* Task Format Selector (Visible for TASK) */}
            {box.type === 'TASK' && (
              <div className="bg-emerald-950/80 border border-emerald-600/60 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Mode Pelaksanaan Tugas (Dipilih Guru):
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  {(['Lisan', 'Tertulis', 'Peragaan / Simulasi'] as TaskFormat[]).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setTaskFormat(fmt)}
                      className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                        taskFormat === fmt 
                          ? 'bg-emerald-400 text-slate-950' 
                          : 'bg-emerald-900/80 text-emerald-200 hover:bg-emerald-800'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Prompt */}
            <div className="bg-blue-950/90 border-2 border-blue-700/80 rounded-2xl p-5 sm:p-6 shadow-inner">
              <div className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed">
                {box.prompt}
              </div>

              {/* Multiple Choice Options */}
              {box.options && box.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {box.options.map((optText, idx) => {
                    const letter = ['A', 'B', 'C', 'D'][idx] || String.fromCharCode(65 + idx);
                    const cleanText = optText.replace(/^[A-D]\.\s*/i, '');
                    const isSelected = selectedOptionIndex === idx;

                    // Option color highlighting after decision or verification
                    let optStyle = 'bg-slate-900/90 hover:bg-blue-900/80 border-blue-600/70 text-blue-100';
                    if (isSelected && !decisionMade) {
                      optStyle = 'bg-amber-500/25 border-yellow-400 text-white ring-2 ring-yellow-400/50';
                    } else if (decisionMade) {
                      const answerLetter = box.answer.trim().charAt(0).toUpperCase();
                      if (letter === answerLetter) {
                        optStyle = 'bg-emerald-600/40 border-emerald-400 text-white ring-2 ring-emerald-400/50';
                      } else if (isSelected) {
                        optStyle = 'bg-rose-700/40 border-rose-400 text-rose-100';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={decisionMade}
                        className={`text-left p-3.5 sm:p-4 rounded-xl border-2 font-semibold transition flex items-start gap-3 shadow cursor-pointer ${optStyle}`}
                      >
                        <span className="w-7 h-7 rounded-lg bg-blue-800 text-yellow-300 font-display font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 border border-blue-500">
                          {letter}
                        </span>
                        <span className="flex-1 leading-snug">{cleanText}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Selected Option Verification Bar */}
              {selectedOptionIndex !== null && !decisionMade && box.options && (
                <div className="mt-4 text-xs sm:text-sm font-semibold text-yellow-300 flex flex-wrap items-center justify-between bg-blue-900/60 border border-yellow-400/40 px-3.5 py-2 rounded-xl gap-2">
                  <span>
                    Pilihan Kelompok: <strong className="text-white">{box.options[selectedOptionIndex]}</strong>
                  </span>
                  <button
                    onClick={handleVerifyOption}
                    className="px-3.5 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                  >
                    Periksa Pilihan Ini
                  </button>
                </div>
              )}
            </div>

            {/* Special Controls (SURPRISE / STRATEGY) */}
            {(box.type === 'SURPRISE' || box.type === 'STRATEGY') && !decisionMade && (
              <div className="bg-purple-950/75 border border-purple-500/60 rounded-2xl p-4 space-y-3">
                {box.effectCode === 'STEAL_POINTS' && (
                  <div>
                    <label className="block text-xs font-bold text-yellow-300 mb-1">
                      Pilih Kelompok Lawan yang Akan Diambil 50 Poinnya:
                    </label>
                    <select
                      value={specialTargetIndex}
                      onChange={(e) => setSpecialTargetIndex(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-sm font-bold"
                    >
                      {teams
                        .map((t, idx) => ({ ...t, idx }))
                        .filter(t => t.idx !== responderTeamIndex)
                        .map(t => (
                          <option key={t.id} value={t.idx}>
                            {t.name} (Skor: {t.score}) {t.shield ? '[🛡️ Perisai Aktif]' : ''}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {box.effectCode === 'BUZZER_CHALLENGE' && (
                  <div>
                    <label className="block text-xs font-bold text-yellow-300 mb-1">
                      Pilih Kelompok Pemenang Tantangan Rebutan (+{box.points} Poin):
                    </label>
                    <select
                      value={specialTargetIndex}
                      onChange={(e) => setSpecialTargetIndex(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-sm font-bold"
                    >
                      {teams.map((t, idx) => (
                        <option key={t.id} value={idx}>
                          {t.name} (Skor: {t.score})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {(box.effectCode === 'TRUE_FALSE_CHALLENGE' || box.effectCode === 'DOUBLE_INSTANT') && (
                  <div>
                    <label className="block text-xs font-bold text-yellow-300 mb-1">
                      Hasil Jawaban Kelompok terhadap Tantangan Ini:
                    </label>
                    <select
                      value={specialResult as 'WIN' | 'LOSE'}
                      onChange={(e) => setSpecialResult(e.target.value as 'WIN' | 'LOSE')}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-sm font-bold"
                    >
                      <option value="WIN">Jawaban Tepat! Berikan +{box.points} Poin</option>
                      <option value="LOSE">Jawaban Kurang Tepat (0 Poin)</option>
                    </select>
                  </div>
                )}

                {box.effectCode === 'TEACHER_MYSTERY' && (
                  <div>
                    <label className="block text-xs font-bold text-yellow-300 mb-1">
                      Tentukan Besaran Bonus Apresiasi Guru:
                    </label>
                    <select
                      value={specialCustomPoints}
                      onChange={(e) => setSpecialCustomPoints(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-sm font-bold"
                    >
                      <option value={50}>Apresiasi Baik (+50 Poin)</option>
                      <option value={100}>Apresiasi Sangat Kompak (+100 Poin)</option>
                      <option value={150}>Apresiasi Istimewa Pelajar Pancasila (+150 Poin)</option>
                    </select>
                  </div>
                )}

                {box.effectCode === 'ASSIGN_OTHER_TEAM' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-yellow-300 mb-1">Kelompok yang Ditunjuk Menjawab:</label>
                      <select
                        value={specialTargetIndex}
                        onChange={(e) => setSpecialTargetIndex(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-xs font-bold"
                      >
                        {teams
                          .map((t, idx) => ({ ...t, idx }))
                          .filter(t => t.idx !== responderTeamIndex)
                          .map(t => (
                            <option key={t.id} value={t.idx}>{t.name}</option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-yellow-300 mb-1">Hasil Jawaban Kelompok Lawan:</label>
                      <select
                        value={specialResult}
                        onChange={(e) => setSpecialResult(e.target.value as 'TARGET_WIN' | 'ORIGIN_WIN')}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-xs font-bold"
                      >
                        <option value="TARGET_WIN">Lawan Menjawab BENAR (+100 untuk mereka)</option>
                        <option value="ORIGIN_WIN">Lawan SALAH (+100 untuk kelompokmu)</option>
                      </select>
                    </div>
                  </div>
                )}

                {box.effectCode === 'SWAP_TURN' && (
                  <div>
                    <label className="block text-xs font-bold text-yellow-300 mb-1">
                      Pilih Kelompok yang Akan Diberi Giliran Berikutnya (+75 Poin untuk kelompokmu):
                    </label>
                    <select
                      value={specialTargetIndex}
                      onChange={(e) => setSpecialTargetIndex(parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-purple-400 text-white text-sm font-bold"
                    >
                      {teams
                        .map((t, idx) => ({ ...t, idx }))
                        .filter(t => t.idx !== responderTeamIndex)
                        .map(t => (
                          <option key={t.id} value={t.idx}>{t.name}</option>
                        ))}
                    </select>
                  </div>
                )}
              </div>
            )}

            {/* Teacher Answer Key & Rubric Drawer */}
            <div className="bg-slate-900/95 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                  <KeyRound className="w-3.5 h-3.5" /> Kunci Jawaban & Pedoman Penilaian Guru
                </span>
                <button
                  type="button"
                  onClick={() => setShowAnswerKey(!showAnswerKey)}
                  className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-xs font-bold text-yellow-300 border border-yellow-400/40 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showAnswerKey ? "Sembunyikan" : "Lihat Kunci Jawaban"}</span>
                </button>
              </div>

              {showAnswerKey && (
                <div className="mt-3 pt-3 border-t border-slate-700 text-sm text-emerald-300 space-y-1">
                  <div className="font-bold text-white leading-relaxed">
                    {box.answer}
                  </div>
                  <div className="text-xs text-slate-300 italic">
                    *Catatan Guru: Untuk soal studi kasus atau simulasi, terima penjelasan siswa yang tepat secara substansi materi Bab 2 Pendidikan Pancasila.
                  </div>
                </div>
              )}
            </div>

            {/* Moderator Decision Actions */}
            {!decisionMade ? (
              <div className="pt-2 border-t border-blue-800/80">
                <div className="text-[11px] uppercase tracking-wider text-blue-300 mb-2.5 font-bold">
                  Keputusan Guru / Moderator:
                </div>

                {box.type === 'QUESTION' && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleQuestionAnswer(true)}
                      className="flex-1 min-w-[150px] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>JAWABAN BENAR</span>
                    </button>
                    <button
                      onClick={() => handleQuestionAnswer(false)}
                      className="flex-1 min-w-[150px] py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>JAWABAN SALAH</span>
                    </button>
                    <button
                      onClick={handleRebound}
                      className="py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-purple-400 transition cursor-pointer"
                      title="Lempar kesempatan ke kelompok berikutnya"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Lempar ke Kelompok Lain</span>
                    </button>
                  </div>
                )}

                {box.type === 'TASK' && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => handleTaskAnswer(true)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>TUGAS BERHASIL</span>
                    </button>
                    <button
                      onClick={() => handleTaskAnswer(false)}
                      className="flex-1 min-w-[160px] py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <XCircle className="w-5 h-5" />
                      <span>TUGAS BELUM BERHASIL</span>
                    </button>
                  </div>
                )}

                {(box.type === 'SURPRISE' || box.type === 'STRATEGY') && (
                  <button
                    onClick={handleSpecialAction}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-display font-bold text-base shadow-lg flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>GUNAKAN BONUS / EFEK KHUSUS</span>
                  </button>
                )}

                {/* Secondary Bottom Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-blue-900/60 text-xs">
                  <button
                    onClick={onCancelSelection}
                    className="text-slate-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                  >
                    <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Batalkan Pembukaan Kotak (Salah Klik)</span>
                  </button>
                  <button
                    onClick={() => onSkipBox(box.number)}
                    className="text-blue-300 hover:text-yellow-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Lewati Tanpa Poin (Kunci Kotak)</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Post Decision Banner */
              <div className="mt-3 bg-slate-950/90 border border-yellow-400/70 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 animate-reveal">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                    decisionSummary?.isPositive ? 'bg-emerald-500 text-slate-950' : 'bg-rose-600 text-white'
                  }`}>
                    {decisionSummary?.isPositive ? <Check className="w-6 h-6 stroke-[3]" /> : <X className="w-6 h-6 stroke-[3]" />}
                  </div>
                  <div>
                    <div className="font-bold text-base text-white">{decisionSummary?.title}</div>
                    <div className="text-xs text-blue-200">{decisionSummary?.subtitle}</div>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-display font-bold text-sm sm:text-base shadow-lg flex items-center gap-2 transition cursor-pointer"
                >
                  <span>{decisionSummary?.keepTurn ? "Main Lagi (Giliran Tambahan)" : "Lanjutkan ke Kelompok Berikutnya"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
