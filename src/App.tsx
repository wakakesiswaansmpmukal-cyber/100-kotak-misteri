/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { GameState, MysteryBox, Team, GameSettings, TaskFormat } from './types';
import { buildDefault100Boxes } from './data/boxesData';
import { setMuted, getMuted, playSound } from './utils/sound';
import { Header } from './components/Header';
import { TeamsSidebar } from './components/TeamsSidebar';
import { BoardGrid } from './components/BoardGrid';
import { BoxModal } from './components/BoxModal';
import { TeacherModal } from './components/TeacherModal';
import { EditBoxModal } from './components/EditBoxModal';
import { FinalResultModal } from './components/FinalResultModal';
import { GuideModal } from './components/GuideModal';
import { CustomDialog } from './components/CustomDialog';
import { Toast } from './components/Toast';
import { AuthGate } from './components/AuthGate';
import { PinPromptModal } from './components/PinPromptModal';

const STORAGE_KEY = "PANCASILA_100_KOTAK_MC_V3";

function createInitialState(): GameState {
  return {
    teams: [
      { id: "t1", name: "Kelompok Garuda", score: 0, correctCount: 0, taskCount: 0, bonusCount: 0, doubleNext: false, shield: false },
      { id: "t2", name: "Kelompok Bhinneka", score: 0, correctCount: 0, taskCount: 0, bonusCount: 0, doubleNext: false, shield: false },
      { id: "t3", name: "Kelompok Nusantara", score: 0, correctCount: 0, taskCount: 0, bonusCount: 0, doubleNext: false, shield: false },
      { id: "t4", name: "Kelompok Konstitusi", score: 0, correctCount: 0, taskCount: 0, bonusCount: 0, doubleNext: false, shield: false }
    ],
    currentTurnIndex: 0,
    settings: {
      ptsEasy: 50,
      ptsMed: 100,
      ptsHard: 150,
      wrongPenalty: 0,
      timeQuestion: 30,
      timeHard: 45,
      timeTask: 60
    },
    boxes: buildDefault100Boxes(),
    history: [
      {
        id: "h_init",
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        text: "Sesi permainan 100 Kotak Tantangan Warga Negara siap dimulai (100 kotak terverifikasi)."
      }
    ],
    auth: {
      teacherPin: "1945",
      currentRole: null
    }
  };
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.boxes) && parsed.boxes.length === 100 && Array.isArray(parsed.teams)) {
          return {
            ...parsed,
            auth: parsed.auth || { teacherPin: "1945", currentRole: null }
          };
        }
      }
    } catch {
      // fallback
    }
    return createInitialState();
  });

  // Sound and UI controls
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active modal targets
  const [activeBoxNumber, setActiveBoxNumber] = useState<number | null>(null);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [teacherDefaultTab, setTeacherDefaultTab] = useState<'teams' | 'settings' | 'bank' | 'composition' | 'security'>('teams');
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [editingBox, setEditingBox] = useState<MysteryBox | null>(null);

  // Auth gate & PIN prompt state
  const [isPinPromptOpen, setIsPinPromptOpen] = useState(false);
  const [pinPromptAction, setPinPromptAction] = useState<string>("Akses Panel Guru & Moderator");

  // Custom in-app dialog state
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    showInput?: boolean;
    defaultInput?: string;
    inputPlaceholder?: string;
    confirmText?: string;
    isDestructive?: boolean;
    onConfirm: (val: string) => void;
  } | null>(null);

  // Turn continuation modifiers
  const [keepTurnForCurrentTeam, setKeepTurnForCurrentTeam] = useState(false);
  const [forcedNextTeamIndex, setForcedNextTeamIndex] = useState<number | null>(null);
  const [lastOpenedNumber, setLastOpenedNumber] = useState<number | null>(null);

  // Save state on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // ignore
    }
  }, [gameState]);

  // Toast helper
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const addLog = useCallback((text: string) => {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logItem = {
      id: "log_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      time,
      text
    };
    setGameState((prev) => ({
      ...prev,
      history: [...prev.history, logItem]
    }));
  }, []);

  // Authentication Handlers
  const handleLoginTeacher = (pin: string): boolean => {
    const correctPin = (gameState.auth?.teacherPin || '1945').trim();
    if (pin.trim() === correctPin) {
      setGameState(prev => ({
        ...prev,
        auth: {
          ...prev.auth,
          currentRole: 'TEACHER'
        }
      }));
      addLog("Guru berhasil masuk ke game show menggunakan PIN.");
      showToast("Selamat datang, Guru & Moderator!");
      return true;
    }
    return false;
  };

  const handleLoginStudent = () => {
    setGameState(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        currentRole: 'STUDENT'
      }
    }));
    addLog("Aplikasi diakses dalam Mode Siswa / Kelas (Proyektor).");
    showToast("Mode Kelas aktif. Selamat bermain!");
  };

  const handleLogout = () => {
    setGameState(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        currentRole: null
      }
    }));
    setIsTeacherModalOpen(false);
    setActiveBoxNumber(null);
    setIsPinPromptOpen(false);
    addLog("Pengguna keluar dari sesi ke gerbang masuk.");
    showToast("Anda telah keluar.");
  };

  const handleChangeTeacherPin = (newPin: string) => {
    setGameState(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        teacherPin: newPin
      }
    }));
    addLog("Guru memperbarui PIN akses aplikasi.");
    showToast("PIN Guru berhasil diperbarui!");
  };

  const handleOpenTeacherProtected = (targetTab: 'teams' | 'settings' | 'bank' | 'composition' | 'security' = 'teams') => {
    setTeacherDefaultTab(targetTab);
    if (gameState.auth?.currentRole === 'TEACHER') {
      setIsTeacherModalOpen(true);
    } else {
      setPinPromptAction("Buka Panel Guru & Moderator");
      setIsPinPromptOpen(true);
    }
  };

  const handlePinSuccess = () => {
    setGameState(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        currentRole: 'TEACHER'
      }
    }));
    setIsPinPromptOpen(false);
    setIsTeacherModalOpen(true);
    showToast("Akses Guru berhasil diverifikasi!");
  };

  // Sound toggle
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setMuted(!next);
    showToast(next ? "Efek suara diaktifkan" : "Efek suara diredam (mute)");
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Turn management
  const handleSelectTurn = (idx: number) => {
    if (idx < 0 || idx >= gameState.teams.length) return;
    setGameState(prev => ({ ...prev, currentTurnIndex: idx }));
    playSound('click');
    showToast(`Giliran diatur ke ${gameState.teams[idx].name}`);
  };

  const handleSkipTurn = () => {
    const prevTeam = gameState.teams[gameState.currentTurnIndex];
    const nextIdx = (gameState.currentTurnIndex + 1) % gameState.teams.length;
    const nextTeam = gameState.teams[nextIdx];
    setGameState(prev => ({ ...prev, currentTurnIndex: nextIdx }));
    addLog(`Giliran ${prevTeam.name} dilewati. Sekarang giliran ${nextTeam.name}.`);
    playSound('click');
    showToast(`Giliran berpindah ke ${nextTeam.name}`);
  };

  const handlePickRandomBox = () => {
    const unopened = gameState.boxes.filter(b => !b.opened);
    if (unopened.length === 0) {
      showToast("Seluruh 100 kotak sudah dibuka!");
      return;
    }
    const chosen = unopened[Math.floor(Math.random() * unopened.length)];
    handleSelectBox(chosen.number);
  };

  const handleSelectBox = (num: number) => {
    const box = gameState.boxes.find(b => b.number === num);
    if (!box) return;
    if (box.opened) {
      showToast(`Kotak #${num} sudah dibuka dan terkunci!`);
      return;
    }
    playSound('click');
    setKeepTurnForCurrentTeam(false);
    setForcedNextTeamIndex(null);
    setActiveBoxNumber(num);
  };

  const handleCloseBoxModal = () => {
    setActiveBoxNumber(null);
    // Check if game complete
    setGameState(prev => {
      let nextIndex = (prev.currentTurnIndex + 1) % prev.teams.length;
      if (forcedNextTeamIndex !== null) {
        nextIndex = forcedNextTeamIndex;
      } else if (keepTurnForCurrentTeam) {
        nextIndex = prev.currentTurnIndex;
      }

      const allOpened = prev.boxes.every(b => b.opened);
      if (allOpened) {
        setTimeout(() => setIsFinalModalOpen(true), 600);
      }

      return {
        ...prev,
        currentTurnIndex: nextIndex
      };
    });
  };

  const handleCancelSelection = () => {
    setActiveBoxNumber(null);
    showToast("Pembukaan kotak dibatalkan, kotak tetap tertutup rapi.");
  };

  const handleSkipBox = (boxNumber: number) => {
    setLastOpenedNumber(boxNumber);
    setGameState(prev => {
      const updatedBoxes = prev.boxes.map(b => b.number === boxNumber ? { ...b, opened: true } : b);
      return { ...prev, boxes: updatedBoxes };
    });
    addLog(`Kotak #${boxNumber} dilewati tanpa poin oleh ${gameState.teams[gameState.currentTurnIndex].name}.`);
    handleCloseBoxModal();
  };

  // Question resolution
  const handleResolveQuestion = (boxNumber: number, teamIndex: number, isCorrect: boolean) => {
    setLastOpenedNumber(boxNumber);
    setGameState(prev => {
      const box = prev.boxes.find(b => b.number === boxNumber);
      if (!box) return prev;

      const updatedTeams = [...prev.teams];
      const team = { ...updatedTeams[teamIndex] };

      let delta = 0;
      if (isCorrect) {
        delta = box.points;
        if (team.doubleNext) {
          delta *= 2;
          team.doubleNext = false;
        }
        team.score += delta;
        team.correctCount += 1;
        addLog(`Kotak #${box.number} (Pertanyaan): ${team.name} menjawab BENAR (+${delta} poin).`);
      } else {
        const penalty = prev.settings.wrongPenalty;
        if (penalty < 0 && team.shield) {
          team.shield = false;
          delta = 0;
          addLog(`Kotak #${box.number}: ${team.name} salah, tetapi terlindung oleh 🛡️ Perisai (0 Poin).`);
        } else {
          delta = penalty;
          team.score += delta;
          addLog(`Kotak #${box.number} (Pertanyaan): ${team.name} menjawab SALAH (${delta} poin).`);
        }
      }

      updatedTeams[teamIndex] = team;
      const updatedBoxes = prev.boxes.map(b => b.number === boxNumber ? {
        ...b,
        opened: true,
        openedByTeamId: team.id
      } : b);

      return {
        ...prev,
        teams: updatedTeams,
        boxes: updatedBoxes
      };
    });
  };

  // Task resolution
  const handleResolveTask = (boxNumber: number, teamIndex: number, isSuccess: boolean, format: TaskFormat) => {
    setLastOpenedNumber(boxNumber);
    setGameState(prev => {
      const box = prev.boxes.find(b => b.number === boxNumber);
      if (!box) return prev;

      const updatedTeams = [...prev.teams];
      const team = { ...updatedTeams[teamIndex] };

      let delta = 0;
      if (isSuccess) {
        delta = box.points;
        if (team.doubleNext) {
          delta *= 2;
          team.doubleNext = false;
        }
        team.score += delta;
        team.taskCount += 1;
        addLog(`Kotak #${box.number} (Tugas ${format}): ${team.name} BERHASIL (+${delta} poin).`);
      } else {
        const penalty = prev.settings.wrongPenalty;
        if (penalty < 0 && team.shield) {
          team.shield = false;
          delta = 0;
          addLog(`Kotak #${box.number}: ${team.name} belum berhasil, terlindung oleh 🛡️ Perisai (0 poin).`);
        } else {
          delta = penalty;
          team.score += delta;
          addLog(`Kotak #${box.number} (Tugas): ${team.name} belum berhasil (${delta} poin).`);
        }
      }

      updatedTeams[teamIndex] = team;
      const updatedBoxes = prev.boxes.map(b => b.number === boxNumber ? {
        ...b,
        opened: true,
        openedByTeamId: team.id,
        taskFormat: format
      } : b);

      return {
        ...prev,
        teams: updatedTeams,
        boxes: updatedBoxes
      };
    });
  };

  // Special boxes (Surprise / Strategy)
  const handleResolveSpecial = (
    boxNumber: number,
    originTeamIndex: number,
    payload: {
      targetTeamIndex?: number;
      customPoints?: number;
      isWin?: boolean;
      outcome?: 'TARGET_WIN' | 'ORIGIN_WIN';
    }
  ) => {
    setLastOpenedNumber(boxNumber);
    setGameState(prev => {
      const box = prev.boxes.find(b => b.number === boxNumber);
      if (!box) return prev;

      const updatedTeams = [...prev.teams];
      const team = { ...updatedTeams[originTeamIndex] };
      const code = box.effectCode;

      if (code === 'BONUS_50' || code === 'BONUS_100' || code === 'BONUS_150') {
        team.score += box.points;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number} (Kejutan): ${team.name} mendapat bonus +${box.points} poin.`);
      } else if (code === 'EXTRA_TURN') {
        team.score += box.points;
        team.bonusCount += 1;
        setKeepTurnForCurrentTeam(true);
        addLog(`Kotak #${box.number} (Kejutan): ${team.name} mendapat +${box.points} poin & 1 giliran tambahan.`);
      } else if (code === 'STEAL_POINTS') {
        const targetIdx = payload.targetTeamIndex !== undefined ? payload.targetTeamIndex : -1;
        if (targetIdx >= 0 && updatedTeams[targetIdx]) {
          const targetTeam = { ...updatedTeams[targetIdx] };
          if (targetTeam.shield) {
            targetTeam.shield = false;
            team.score += 50;
            team.bonusCount += 1;
            addLog(`Kotak #${box.number} (Curi Poin): ${targetTeam.name} terlindung Perisai! ${team.name} mendapat +50 poin dari bank.`);
          } else {
            const stolen = 50;
            targetTeam.score = Math.max(0, targetTeam.score - stolen);
            team.score += stolen;
            team.bonusCount += 1;
            addLog(`Kotak #${box.number} (Curi Poin): ${team.name} mengambil 50 poin dari ${targetTeam.name}.`);
          }
          updatedTeams[targetIdx] = targetTeam;
        }
      } else if (code === 'BUZZER_CHALLENGE') {
        const winnerIdx = payload.targetTeamIndex !== undefined ? payload.targetTeamIndex : originTeamIndex;
        if (updatedTeams[winnerIdx]) {
          const winner = { ...updatedTeams[winnerIdx] };
          winner.score += box.points;
          winner.bonusCount += 1;
          updatedTeams[winnerIdx] = winner;
          addLog(`Kotak #${box.number} (Rebutan): Dimenangkan oleh ${winner.name} (+${box.points} poin).`);
        }
      } else if (code === 'EXTRA_TIME_DISCUSS') {
        team.score += box.points;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number} (Kejutan): ${team.name} mendapat bonus +${box.points} poin & waktu diskusi.`);
      } else if (code === 'TRUE_FALSE_CHALLENGE' || code === 'DOUBLE_INSTANT') {
        if (payload.isWin) {
          team.score += box.points;
          team.bonusCount += 1;
          addLog(`Kotak #${box.number}: ${team.name} berhasil menyelesaikan tantangan (+${box.points} poin).`);
        } else {
          addLog(`Kotak #${box.number}: ${team.name} kurang tepat menyelesaikan tantangan khusus (0 poin).`);
        }
      } else if (code === 'DOUBLE_NEXT') {
        team.doubleNext = true;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number}: ${team.name} mengaktifkan Kartu Pengganda 2x Poin.`);
      } else if (code === 'TEACHER_MYSTERY') {
        const pts = payload.customPoints || 100;
        team.score += pts;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number} (Bonus Guru): ${team.name} menerima +${pts} poin apresiasi.`);
      } else if (code === 'ASSIGN_OTHER_TEAM') {
        const targetIdx = payload.targetTeamIndex !== undefined ? payload.targetTeamIndex : 0;
        const targetTeam = { ...updatedTeams[targetIdx] };
        if (payload.outcome === 'TARGET_WIN') {
          targetTeam.score += box.points;
          targetTeam.correctCount += 1;
          updatedTeams[targetIdx] = targetTeam;
          addLog(`Kotak #${box.number} (Strategi): ${targetTeam.name} berhasil menjawab tantangan dari ${team.name} (+${box.points} poin).`);
        } else {
          team.score += box.points;
          team.bonusCount += 1;
          addLog(`Kotak #${box.number} (Strategi): ${team.name} meraih +${box.points} poin karena ${targetTeam.name} salah menjawab.`);
        }
      } else if (code === 'SWAP_TURN') {
        const targetIdx = payload.targetTeamIndex !== undefined ? payload.targetTeamIndex : null;
        team.score += box.points;
        team.bonusCount += 1;
        if (targetIdx !== null) {
          setForcedNextTeamIndex(targetIdx);
          addLog(`Kotak #${box.number} (Strategi): ${team.name} mendapat +${box.points} poin & mengatur giliran ke ${updatedTeams[targetIdx]?.name}.`);
        }
      } else if (code === 'STEAL_OPPORTUNITY') {
        team.score += box.points;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number} (Strategi): ${team.name} mendapat +${box.points} poin & Hak Rebut Kesempatan.`);
      } else if (code === 'SHIELD_IMMUNITY') {
        team.score += box.points;
        team.shield = true;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number} (Strategi): ${team.name} mendapat +${box.points} poin & Perisai Bebas Penalti.`);
      } else {
        team.score += box.points;
        team.bonusCount += 1;
        addLog(`Kotak #${box.number}: ${team.name} mengaktifkan efek khusus (+${box.points} poin).`);
      }

      updatedTeams[originTeamIndex] = team;
      const updatedBoxes = prev.boxes.map(b => b.number === boxNumber ? {
        ...b,
        opened: true,
        openedByTeamId: team.id
      } : b);

      return {
        ...prev,
        teams: updatedTeams,
        boxes: updatedBoxes
      };
    });
  };

  // Teacher actions
  const handleUpdateTeams = (newTeams: Team[]) => {
    setGameState(prev => ({ ...prev, teams: newTeams }));
    showToast("Data kelompok berhasil diperbarui!");
  };

  const handlePromptManualScore = (teamIndex: number, delta: number) => {
    const team = gameState.teams[teamIndex];
    if (!team) return;

    setDialogConfig({
      isOpen: true,
      title: `Koreksi Skor: ${team.name}`,
      message: `Anda akan memberikan ${delta >= 0 ? '+' + delta : delta} poin untuk ${team.name}. Masukkan catatan/alasan perubahan skor untuk riwayat:`,
      showInput: true,
      defaultInput: "Apresiasi / Koreksi Moderator Guru",
      confirmText: "Simpan Skor",
      onConfirm: (reason) => {
        setGameState(prev => {
          const updated = [...prev.teams];
          updated[teamIndex] = {
            ...updated[teamIndex],
            score: updated[teamIndex].score + delta
          };
          return { ...prev, teams: updated };
        });
        addLog(`Koreksi Skor Manual (${team.name}): ${delta >= 0 ? '+' + delta : delta} poin. Alasan: ${reason || 'Keputusan Guru'}`);
        setDialogConfig(null);
        showToast(`Skor ${team.name} berhasil diperbarui!`);
      }
    });
  };

  const handleUpdateSettings = (newSettings: GameSettings) => {
    setGameState(prev => {
      // Update unopened boxes with new point/timer values
      const updatedBoxes = prev.boxes.map(box => {
        if (box.opened) return box;
        if (box.type === 'QUESTION') {
          if (box.difficulty === 'Mudah') {
            return { ...box, points: newSettings.ptsEasy, timer: newSettings.timeQuestion };
          } else if (box.difficulty === 'Sedang') {
            return { ...box, points: newSettings.ptsMed, timer: newSettings.timeQuestion };
          } else if (box.difficulty === 'Sulit') {
            return { ...box, points: newSettings.ptsHard, timer: newSettings.timeHard };
          }
        } else if (box.type === 'TASK') {
          return { ...box, timer: newSettings.timeTask };
        }
        return box;
      });

      return {
        ...prev,
        settings: newSettings,
        boxes: updatedBoxes
      };
    });
    addLog("Guru memperbarui pengaturan poin & batas waktu permainan.");
    showToast("Pengaturan permainan berhasil disimpan!");
  };

  const handleUnlockBox = (num: number) => {
    setGameState(prev => {
      const updatedBoxes = prev.boxes.map(b => b.number === num ? { ...b, opened: false, openedByTeamId: null } : b);
      return { ...prev, boxes: updatedBoxes };
    });
    addLog(`Guru membatalkan status dibuka Kotak #${num} (diaktifkan kembali).`);
    showToast(`Kotak #${num} berhasil diaktifkan kembali!`);
  };

  const handleEditBoxSave = (updatedBox: MysteryBox) => {
    setGameState(prev => {
      const updatedBoxes = prev.boxes.map(b => b.number === updatedBox.number ? updatedBox : b);
      return { ...prev, boxes: updatedBoxes };
    });
    setEditingBox(null);
    addLog(`Guru memperbarui isi Kotak #${updatedBox.number}.`);
    showToast(`Kotak #${updatedBox.number} berhasil diperbarui!`);
  };

  const handleReshuffleUnopened = () => {
    setGameState(prev => {
      const unopenedIndices: number[] = [];
      const unopenedContents: MysteryBox[] = [];

      prev.boxes.forEach((box, i) => {
        if (!box.opened) {
          unopenedIndices.push(i);
          unopenedContents.push({ ...box });
        }
      });

      for (let i = unopenedContents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = unopenedContents[i];
        unopenedContents[i] = unopenedContents[j];
        unopenedContents[j] = temp;
      }

      const newBoxes = [...prev.boxes];
      unopenedIndices.forEach((boardIdx, k) => {
        newBoxes[boardIdx] = {
          ...unopenedContents[k],
          number: boardIdx + 1
        };
      });

      return { ...prev, boxes: newBoxes };
    });
    addLog("Guru mengacak ulang posisi seluruh kotak yang belum dibuka.");
    showToast("Posisi kotak yang belum dibuka berhasil diacak ulang!");
  };

  const handleExportReport = () => {
    const sorted = [...gameState.teams].sort((a, b) => b.score - a.score);
    const openedCount = gameState.boxes.filter(b => b.opened).length;

    let report = "=================================================================\n";
    report += "LAPORAN HASIL PERMAINAN: 100 KOTAK TANTANGAN WARGA NEGARA\n";
    report += "Mata Pelajaran : Pendidikan Pancasila Kelas IX SMP\n";
    report += "Materi         : Bab 2 - Tantangan Pemenuhan Hak & Kewajiban\n";
    report += "Tanggal/Waktu  : " + new Date().toLocaleString('id-ID') + "\n";
    report += "Kotak Terbuka  : " + openedCount + " / 100 Kotak\n";
    report += "=================================================================\n\n";

    report += "PERINGKAT & KLASEMEN AKHIR KELOMPOK:\n";
    sorted.forEach((t, idx) => {
      report += `${idx + 1}. ${t.name} — Total: ${t.score} Poin (Soal Benar: ${t.correctCount}, Tugas Berhasil: ${t.taskCount}, Bonus/Strategi: ${t.bonusCount})\n`;
    });

    report += "\n-----------------------------------------------------------------\n";
    report += "RIWAYAT AKTIVITAS LENGKAP:\n";
    gameState.history.forEach((h) => {
      report += `[${h.time}] ${h.text}\n`;
    });

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Hasil_100_Kotak_Pancasila_KelasIX_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Laporan hasil permainan berhasil diunduh!");
  };

  const handleResetSessionConfirm = () => {
    setDialogConfig({
      isOpen: true,
      title: "Atur Ulang (Reset) Seluruh Sesi?",
      message: "Seluruh skor kelompok akan kembali ke 0 dan ke-100 kotak misteri akan dikunci kembali untuk sesi kelas baru. Anda yakin ingin melanjutkan?",
      showInput: false,
      confirmText: "Ya, Reset Permainan",
      isDestructive: true,
      onConfirm: () => {
        const teamNames = gameState.teams.map(t => t.name);
        const fresh = createInitialState();
        fresh.teams = teamNames.map((name, i) => ({
          id: "team_" + (i + 1),
          name,
          score: 0,
          correctCount: 0,
          taskCount: 0,
          bonusCount: 0,
          doubleNext: false,
          shield: false
        }));
        setGameState(fresh);
        setIsTeacherModalOpen(false);
        setIsFinalModalOpen(false);
        setActiveBoxNumber(null);
        setDialogConfig(null);
        showToast("Sesi permainan baru siap dimulai!");
      }
    });
  };

  const activeBox = gameState.boxes.find(b => b.number === activeBoxNumber);

  // If user has not chosen a role yet, show initial Gate Screen
  if (!gameState.auth?.currentRole) {
    return (
      <div className="min-h-screen">
        <AuthGate
          onLoginTeacher={handleLoginTeacher}
          onLoginStudent={handleLoginStudent}
          onOpenGuide={() => setIsGuideModalOpen(true)}
          defaultTeacherPin={gameState.auth?.teacherPin || '1945'}
        />
        {isGuideModalOpen && (
          <GuideModal onClose={() => setIsGuideModalOpen(false)} />
        )}
        <Toast message={toastMessage} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <Header
        boxes={gameState.boxes}
        currentRole={gameState.auth.currentRole}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenTeacher={() => handleOpenTeacherProtected('teams')}
        onOpenFinal={() => setIsFinalModalOpen(true)}
        onLogout={handleLogout}
        onSwitchToTeacher={() => {
          setPinPromptAction("Akses Guru & Moderator");
          setIsPinPromptOpen(true);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Game Stage */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Scoreboard & Turn */}
        <TeamsSidebar
          teams={gameState.teams}
          currentTurnIndex={gameState.currentTurnIndex}
          history={gameState.history}
          onSelectTurn={handleSelectTurn}
          onSkipTurn={handleSkipTurn}
          onPickRandomBox={handlePickRandomBox}
          onOpenTeacherTeams={() => handleOpenTeacherProtected('teams')}
        />

        {/* Right: 100 Mystery Boxes Board */}
        <BoardGrid
          boxes={gameState.boxes}
          onSelectBox={handleSelectBox}
          lastOpenedNumber={lastOpenedNumber}
        />
      </main>

      {/* Interactive Box Modal */}
      {activeBox && (
        <BoxModal
          box={activeBox}
          teams={gameState.teams}
          currentTurnIndex={gameState.currentTurnIndex}
          wrongPenalty={gameState.settings.wrongPenalty}
          onClose={handleCloseBoxModal}
          onCancelSelection={handleCancelSelection}
          onResolveQuestion={handleResolveQuestion}
          onResolveTask={handleResolveTask}
          onResolveSpecial={handleResolveSpecial}
          onSkipBox={handleSkipBox}
        />
      )}

      {/* Teacher / Moderator Control Panel */}
      {isTeacherModalOpen && (
        <TeacherModal
          gameState={gameState}
          defaultTab={teacherDefaultTab}
          onClose={() => setIsTeacherModalOpen(false)}
          onUpdateTeams={handleUpdateTeams}
          onUpdateSettings={handleUpdateSettings}
          onUnlockBox={handleUnlockBox}
          onEditBox={(b) => setEditingBox(b)}
          onReshuffleUnopened={handleReshuffleUnopened}
          onExportReport={handleExportReport}
          onResetSession={handleResetSessionConfirm}
          onPromptManualScore={handlePromptManualScore}
          onChangePin={handleChangeTeacherPin}
        />
      )}

      {/* PIN Verification Prompt Modal (for Student mode attempting to access Teacher Panel) */}
      {isPinPromptOpen && (
        <PinPromptModal
          correctPin={gameState.auth?.teacherPin || '1945'}
          actionTitle={pinPromptAction}
          onSuccess={handlePinSuccess}
          onCancel={() => setIsPinPromptOpen(false)}
        />
      )}

      {/* Edit Box Modal */}
      {editingBox && (
        <EditBoxModal
          box={editingBox}
          onClose={() => setEditingBox(null)}
          onSave={handleEditBoxSave}
        />
      )}

      {/* Final Results & Podium Ceremony Modal */}
      {isFinalModalOpen && (
        <FinalResultModal
          teams={gameState.teams}
          onClose={() => setIsFinalModalOpen(false)}
          onExportReport={handleExportReport}
          onResetSession={handleResetSessionConfirm}
        />
      )}

      {/* Game Guide Modal */}
      {isGuideModalOpen && (
        <GuideModal onClose={() => setIsGuideModalOpen(false)} />
      )}

      {/* In-App Confirmation / Input Dialog */}
      {dialogConfig && dialogConfig.isOpen && (
        <CustomDialog
          title={dialogConfig.title}
          message={dialogConfig.message}
          showInput={dialogConfig.showInput}
          defaultInput={dialogConfig.defaultInput}
          inputPlaceholder={dialogConfig.inputPlaceholder}
          confirmText={dialogConfig.confirmText}
          isDestructive={dialogConfig.isDestructive}
          onConfirm={dialogConfig.onConfirm}
          onCancel={() => setDialogConfig(null)}
        />
      )}

      {/* Toast Alert */}
      <Toast message={toastMessage} />
    </div>
  );
}
