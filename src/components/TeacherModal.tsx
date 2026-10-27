import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Sliders, 
  Boxes, 
  PieChart, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Search, 
  Edit3, 
  LockOpen, 
  Shuffle, 
  FileDown, 
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { GameState, MysteryBox, Team, GameSettings } from '../types';

interface TeacherModalProps {
  gameState: GameState;
  onClose: () => void;
  onUpdateTeams: (teams: Team[]) => void;
  onUpdateSettings: (settings: GameSettings) => void;
  onUnlockBox: (boxNumber: number) => void;
  onEditBox: (box: MysteryBox) => void;
  onReshuffleUnopened: () => void;
  onExportReport: () => void;
  onResetSession: () => void;
  onPromptManualScore: (teamIndex: number, delta: number) => void;
  onChangePin: (newPin: string) => void;
  defaultTab?: 'teams' | 'settings' | 'bank' | 'composition' | 'security';
}

export const TeacherModal: React.FC<TeacherModalProps> = ({
  gameState,
  onClose,
  onUpdateTeams,
  onUpdateSettings,
  onUnlockBox,
  onEditBox,
  onReshuffleUnopened,
  onExportReport,
  onResetSession,
  onPromptManualScore,
  onChangePin,
  defaultTab = 'teams'
}) => {
  const [activeTab, setActiveTab] = useState<'teams' | 'settings' | 'bank' | 'composition' | 'security'>(defaultTab);

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState<GameSettings>({ ...gameState.settings });
  const [newPinInput, setNewPinInput] = useState(gameState.auth?.teacherPin || '1945');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [showPinToggle, setShowPinToggle] = useState(false);
  const [pinChangeMsg, setPinChangeMsg] = useState<{ text: string; isError: boolean } | null>(null);

  // Bank table filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Teams handlers
  const handleRenameTeam = (idx: number, newName: string) => {
    const updated = [...gameState.teams];
    updated[idx] = { ...updated[idx], name: newName.trim() || updated[idx].name };
    onUpdateTeams(updated);
  };

  const handleAddTeam = () => {
    if (gameState.teams.length >= 6) return;
    const nextNum = gameState.teams.length + 1;
    const newTeam: Team = {
      id: "team_" + Date.now(),
      name: `Kelompok ${nextNum}`,
      score: 0,
      correctCount: 0,
      taskCount: 0,
      bonusCount: 0,
      doubleNext: false,
      shield: false
    };
    onUpdateTeams([...gameState.teams, newTeam]);
  };

  const handleRemoveTeam = (idx: number) => {
    if (gameState.teams.length <= 2) return;
    const updated = gameState.teams.filter((_, i) => i !== idx);
    onUpdateTeams(updated);
  };

  const handleMoveTeam = (idx: number, dir: -1 | 1) => {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= gameState.teams.length) return;
    const updated = [...gameState.teams];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;
    onUpdateTeams(updated);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
  };

  // Filtered boxes for Bank tab
  const filteredBoxes = gameState.boxes.filter(box => {
    if (typeFilter !== 'ALL' && box.type !== typeFilter) return false;
    if (statusFilter === 'OPENED' && !box.opened) return false;
    if (statusFilter === 'UNOPENED' && box.opened) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace('#', '');
      const matchNum = String(box.number) === q;
      const matchPrompt = box.prompt.toLowerCase().includes(q);
      const matchAnswer = box.answer.toLowerCase().includes(q);
      const matchTopic = (box.topic || '').toLowerCase().includes(q);
      return matchNum || matchPrompt || matchAnswer || matchTopic;
    }
    return true;
  });

  // Verify Composition
  const total = gameState.boxes.length;
  const qCount = gameState.boxes.filter(b => b.type === 'QUESTION').length;
  const tCount = gameState.boxes.filter(b => b.type === 'TASK').length;
  const sCount = gameState.boxes.filter(b => b.type === 'SURPRISE').length;
  const stCount = gameState.boxes.filter(b => b.type === 'STRATEGY').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#081538] border-2 border-yellow-400/80 rounded-3xl max-w-6xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-reveal">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-lg shadow">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">PANEL GURU & MODERATOR</h2>
              <p className="text-xs text-blue-300">
                Kelola kelompok, aturan poin & waktu, bank 100 kotak soal, kunci jawaban, dan manajemen sesi permainan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-rose-600 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1.5 px-6 py-3 bg-blue-950/80 border-b border-blue-800 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'teams' ? 'bg-yellow-400 text-slate-950 shadow' : 'bg-blue-900/70 text-blue-200 hover:bg-blue-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>1. Kelompok & Skor</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'settings' ? 'bg-yellow-400 text-slate-950 shadow' : 'bg-blue-900/70 text-blue-200 hover:bg-blue-800'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>2. Waktu & Poin</span>
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'bank' ? 'bg-yellow-400 text-slate-950 shadow' : 'bg-blue-900/70 text-blue-200 hover:bg-blue-800'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>3. Bank 100 Kotak & Jawaban</span>
          </button>
          <button
            onClick={() => setActiveTab('composition')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'composition' ? 'bg-yellow-400 text-slate-950 shadow' : 'bg-blue-900/70 text-blue-200 hover:bg-blue-800'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>4. Komposisi & Sesi</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'security' ? 'bg-yellow-400 text-slate-950 shadow' : 'bg-blue-900/70 text-blue-200 hover:bg-blue-800'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>5. Ubah PIN Login</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: TEAMS & SCORE */}
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-base text-yellow-300">Pengaturan Kelompok (2–6 Kelompok)</h3>
                    <p className="text-xs text-blue-200">
                      Ubah nama, urutan bermain, atau berikan koreksi skor manual dengan pencatatan alasan di log.
                    </p>
                  </div>
                  <button
                    onClick={handleAddTeam}
                    disabled={gameState.teams.length >= 6}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition disabled:opacity-50 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Kelompok</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {gameState.teams.map((team, idx) => (
                    <div
                      key={team.id}
                      className="bg-slate-900/90 border border-blue-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-[220px]">
                        <span className="w-7 h-7 rounded-lg bg-blue-800 text-yellow-300 font-bold text-xs flex items-center justify-center shrink-0">
                          #{idx + 1}
                        </span>
                        <input
                          type="text"
                          defaultValue={team.name}
                          onBlur={(e) => handleRenameTeam(idx, e.target.value)}
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-blue-700 text-white text-xs sm:text-sm font-bold flex-1 focus:ring-2 focus:ring-yellow-400 outline-none"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs text-blue-200 mr-2">
                          Skor: <strong className="text-yellow-400 text-base">{team.score}</strong>
                        </span>
                        <button
                          onClick={() => onPromptManualScore(idx, 50)}
                          className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition cursor-pointer"
                          title="Tambah +50 Poin Manual"
                        >
                          +50
                        </button>
                        <button
                          onClick={() => onPromptManualScore(idx, -50)}
                          className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition cursor-pointer"
                          title="Kurangi -50 Poin Manual"
                        >
                          -50
                        </button>
                        <button
                          onClick={() => handleMoveTeam(idx, -1)}
                          disabled={idx === 0}
                          className="p-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-blue-200 text-xs disabled:opacity-30 cursor-pointer"
                          title="Geser Naik"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMoveTeam(idx, 1)}
                          disabled={idx === gameState.teams.length - 1}
                          className="p-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-blue-200 text-xs disabled:opacity-30 cursor-pointer"
                          title="Geser Turun"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleRemoveTeam(idx)}
                          disabled={gameState.teams.length <= 2}
                          className="p-1.5 rounded-lg bg-rose-800 hover:bg-rose-600 text-white text-xs disabled:opacity-30 cursor-pointer"
                          title="Hapus Kelompok"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SETTINGS (POINTS & TIMERS) */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4 space-y-4">
                <h3 className="font-bold text-base text-yellow-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Pengaturan Poin & Penalti
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-blue-200 mb-1">Pertanyaan Mudah (Poin)</label>
                    <input
                      type="number"
                      value={settingsForm.ptsEasy}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ptsEasy: parseInt(e.target.value, 10) || 50 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Pertanyaan Sedang (Poin)</label>
                    <input
                      type="number"
                      value={settingsForm.ptsMed}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ptsMed: parseInt(e.target.value, 10) || 100 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Pertanyaan Sulit (Poin)</label>
                    <input
                      type="number"
                      value={settingsForm.ptsHard}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ptsHard: parseInt(e.target.value, 10) || 150 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Aturan Jawaban Salah / Gagal</label>
                    <select
                      value={settingsForm.wrongPenalty}
                      onChange={(e) => setSettingsForm({ ...settingsForm, wrongPenalty: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    >
                      <option value={0}>0 Poin (Tanpa Pengurangan)</option>
                      <option value={-25}>Kurangi -25 Poin</option>
                      <option value={-50}>Kurangi -50 Poin</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4 space-y-4">
                <h3 className="font-bold text-base text-yellow-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Pengaturan Batas Waktu (Detik)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-blue-200 mb-1">Waktu Pertanyaan Mudah/Sedang</label>
                    <input
                      type="number"
                      value={settingsForm.timeQuestion}
                      onChange={(e) => setSettingsForm({ ...settingsForm, timeQuestion: parseInt(e.target.value, 10) || 30 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Waktu Pertanyaan Sulit</label>
                    <input
                      type="number"
                      value={settingsForm.timeHard}
                      onChange={(e) => setSettingsForm({ ...settingsForm, timeHard: parseInt(e.target.value, 10) || 45 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-200 mb-1">Waktu Tugas Kelompok</label>
                    <input
                      type="number"
                      value={settingsForm.timeTask}
                      onChange={(e) => setSettingsForm({ ...settingsForm, timeTask: parseInt(e.target.value, 10) || 60 })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan & Terapkan</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Teacher PIN Management Card */}
            <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4 space-y-3">
              <h3 className="font-bold text-base text-yellow-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Keamanan & PIN Guru
              </h3>
              <p className="text-xs text-blue-200">
                PIN ini digunakan untuk membuka Panel Guru saat aplikasi dalam Mode Siswa, serta saat masuk melalui gerbang awal.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[180px] max-w-xs">
                  <label className="block text-blue-300 text-xs mb-1">PIN Guru Saat Ini / Baru</label>
                  <input
                    type="text"
                    maxLength={8}
                    value={newPinInput}
                    onChange={(e) => {
                      setNewPinInput(e.target.value);
                      setPinChangeMsg(null);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-mono font-bold tracking-widest text-sm"
                  />
                </div>

                <div className="flex items-end gap-2 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      if (newPinInput.trim().length < 4) {
                        setPinChangeMsg({ text: "PIN minimal 4 digit/karakter.", isError: true });
                        return;
                      }
                      onChangePin(newPinInput.trim());
                      setPinChangeMsg({ text: "PIN Guru berhasil diperbarui!", isError: false });
                    }}
                    className="py-2 px-4 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                  >
                    Simpan PIN Baru
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewPinInput('1945');
                      onChangePin('1945');
                      setPinChangeMsg({ text: "PIN Guru dikembalikan ke default: 1945", isError: false });
                    }}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                  >
                    Reset ke Default (1945)
                  </button>
                </div>
              </div>

              {pinChangeMsg && (
                <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg inline-block ${
                  pinChangeMsg.isError
                    ? 'bg-rose-950/80 border border-rose-600/60 text-rose-300'
                    : 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-300'
                }`}>
                  {pinChangeMsg.text}
                </div>
              )}
            </div>
          </div>
        )}

          {/* TAB 3: BANK 100 BOXES & ANSWERS */}
          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-950/70 p-3.5 rounded-2xl border border-blue-800">
                <div className="flex flex-wrap items-center gap-2 flex-1">
                  <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Cari nomor kotak, soal, atau jawaban..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-blue-700 text-xs text-white placeholder-slate-400 outline-none focus:ring-1 focus:ring-yellow-400"
                    />
                  </div>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-blue-700 text-xs text-white font-medium"
                  >
                    <option value="ALL">Semua Jenis (100 Kotak)</option>
                    <option value="QUESTION">Pertanyaan (70)</option>
                    <option value="TASK">Tugas Kelompok (15)</option>
                    <option value="SURPRISE">Kotak Kejutan (10)</option>
                    <option value="STRATEGY">Kotak Strategi (5)</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-blue-700 text-xs text-white font-medium"
                  >
                    <option value="ALL">Semua Status</option>
                    <option value="UNOPENED">Belum Dibuka</option>
                    <option value="OPENED">Sudah Dibuka</option>
                  </select>
                </div>

                <span className="text-xs text-yellow-300 font-semibold hidden md:inline">
                  Ditemukan: {filteredBoxes.length} kotak
                </span>
              </div>

              <div className="overflow-x-auto border border-blue-800 rounded-2xl max-h-[440px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-blue-200 sticky top-0 z-10 border-b border-blue-800">
                    <tr>
                      <th className="p-3">No</th>
                      <th className="p-3">Jenis</th>
                      <th className="p-3">Pertanyaan / Tantangan</th>
                      <th className="p-3">Kunci Jawaban</th>
                      <th className="p-3">Poin & Waktu</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi Guru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-900/60 bg-blue-950/40">
                    {filteredBoxes.map((box) => (
                      <tr key={box.number} className="hover:bg-blue-900/30 transition">
                        <td className="p-3 font-display font-bold text-yellow-400">#{box.number}</td>
                        <td className="p-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            box.type === 'QUESTION' ? 'bg-sky-900 text-sky-200' :
                            box.type === 'TASK' ? 'bg-emerald-900 text-emerald-200' :
                            box.type === 'SURPRISE' ? 'bg-amber-900 text-yellow-200' :
                            'bg-purple-900 text-purple-200'
                          }`}>
                            {box.type === 'QUESTION' ? 'Pertanyaan' :
                             box.type === 'TASK' ? 'Tugas' :
                             box.type === 'SURPRISE' ? 'Kejutan' : 'Strategi'}
                          </span>
                          <div className="text-[10px] text-blue-300 mt-1">{box.difficulty}</div>
                        </td>
                        <td className="p-3 max-w-xs text-white leading-snug">{box.prompt}</td>
                        <td className="p-3 max-w-xs text-emerald-300 leading-snug">{box.answer}</td>
                        <td className="p-3 whitespace-nowrap">
                          <div className="font-bold text-yellow-300">{box.points} Poin</div>
                          <div className="text-[10px] text-blue-300">{box.timer} detik</div>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {box.opened ? (
                            <span className="px-2 py-0.5 rounded bg-rose-900/80 text-rose-200 text-[10px] font-bold">
                              Sudah Dibuka
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">
                              Belum Dibuka
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-right whitespace-nowrap space-x-1.5">
                          <button
                            onClick={() => onEditBox(box)}
                            className="px-2.5 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white font-bold transition cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 inline mr-1" />
                            Edit
                          </button>
                          {box.opened && (
                            <button
                              onClick={() => onUnlockBox(box.number)}
                              className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold transition cursor-pointer"
                              title="Batalkan status dibuka (aktifkan kembali)"
                            >
                              <LockOpen className="w-3.5 h-3.5 inline mr-1" />
                              Buka Kunci
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COMPOSITION & SESSION MANAGEMENT */}
          {activeTab === 'composition' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4 space-y-3">
                <h3 className="font-bold text-base text-yellow-300 flex items-center gap-2">
                  <PieChart className="w-4 h-4" /> Pemeriksaan Komposisi 100 Kotak
                </h3>
                <p className="text-xs text-blue-200">
                  Verifikasi agar seluruh jenis kotak tepat berjumlah 100 kotak dan tersebar merata.
                </p>

                <div className="space-y-2 text-xs bg-slate-900/90 p-3.5 rounded-xl border border-blue-800">
                  <div className="flex justify-between">
                    <span>Total Kotak pada Papan:</span>
                    <strong className="text-yellow-400">{total} / 100 Kotak</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>A. Kotak Pertanyaan Pilihan Ganda:</span>
                    <strong className="text-sky-300">{qCount} Kotak</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>B. Kotak Tugas / Tantangan Kelompok:</span>
                    <strong className="text-emerald-300">{tCount} Kotak</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>C. Kotak Kejutan:</span>
                    <strong className="text-yellow-300">{sCount} Kotak</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>D. Kotak Strategi:</span>
                    <strong className="text-purple-300">{stCount} Kotak</strong>
                  </div>
                  <div className="pt-2 border-t border-blue-900 text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Status Validasi: Tepat 100 Kotak Terstruktur Tanpa Duplikasi Nomor</span>
                  </div>
                </div>

                <button
                  onClick={onReshuffleUnopened}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Acak Ulang Posisi Kotak yang Belum Dibuka</span>
                </button>
              </div>

              <div className="bg-blue-950/60 border border-blue-800 rounded-2xl p-4 space-y-3">
                <h3 className="font-bold text-base text-rose-400 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Kendali Sesi Permainan
                </h3>
                <p className="text-xs text-blue-200">
                  Simpan otomatis ke penyimpanan lokal aktif. Anda dapat mengunduh laporan nilai dan aktivitas atau mereset seluruh sesi permainan.
                </p>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={onExportReport}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Unduh Laporan Hasil Permainan (.TXT)</span>
                  </button>

                  <button
                    onClick={onResetSession}
                    className="w-full py-2.5 px-4 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Atur Ulang (Reset) Seluruh Sesi Permainan</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & CHANGE PIN */}
          {activeTab === 'security' && (
            <div className="max-w-xl mx-auto space-y-5 bg-blue-950/70 border-2 border-yellow-400/70 rounded-3xl p-6 sm:p-7 shadow-xl animate-reveal">
              <div className="flex items-center gap-3 border-b border-blue-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold text-xl shadow">
                  <KeyRound className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                    PENGATURAN PIN LOGIN GURU
                  </h3>
                  <p className="text-xs text-blue-200">
                    Atur atau ubah kode sandi PIN untuk melindungi Panel Guru dan akses administrator
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-blue-800/80 rounded-2xl p-4 text-xs text-blue-200 leading-relaxed space-y-1.5">
                <div className="font-bold text-yellow-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Fungsi PIN Guru:</span>
                </div>
                <p>
                  1. Masuk sebagai <strong>Guru & Moderator</strong> dari gerbang menu awal aplikasi.
                </p>
                <p>
                  2. Membuka <strong>Panel Guru</strong> dan koreksi nilai saat aplikasi sedang berjalan di layar siswa / proyektor kelas.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPinInput.trim() || newPinInput.trim().length < 4) {
                    setPinChangeMsg({ text: "PIN minimal 4 karakter / angka.", isError: true });
                    return;
                  }
                  if (confirmPinInput && newPinInput.trim() !== confirmPinInput.trim()) {
                    setPinChangeMsg({ text: "Konfirmasi PIN tidak cocok dengan PIN baru.", isError: true });
                    return;
                  }
                  onChangePin(newPinInput.trim());
                  setConfirmPinInput('');
                  setPinChangeMsg({ text: "PIN Guru berhasil diperbarui dan disimpan!", isError: false });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">
                    PIN Guru Baru:
                  </label>
                  <div className="relative">
                    <input
                      type={showPinToggle ? "text" : "password"}
                      maxLength={8}
                      value={newPinInput}
                      onChange={(e) => {
                        setNewPinInput(e.target.value);
                        setPinChangeMsg(null);
                      }}
                      placeholder="Masukkan 4–8 digit PIN..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-blue-700 focus:border-yellow-400 text-white font-mono font-bold tracking-widest text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPinToggle(!showPinToggle)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition cursor-pointer"
                    >
                      {showPinToggle ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-blue-200 mb-1">
                    Ulangi PIN Guru Baru (Konfirmasi):
                  </label>
                  <input
                    type={showPinToggle ? "text" : "password"}
                    maxLength={8}
                    value={confirmPinInput}
                    onChange={(e) => {
                      setConfirmPinInput(e.target.value);
                      setPinChangeMsg(null);
                    }}
                    placeholder="Ketik ulang PIN baru..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-blue-700 focus:border-yellow-400 text-white font-mono font-bold tracking-widest text-sm outline-none"
                  />
                </div>

                {pinChangeMsg && (
                  <div
                    className={`text-xs font-semibold px-3 py-2 rounded-xl text-center ${
                      pinChangeMsg.isError
                        ? 'bg-rose-950/80 border border-rose-600 text-rose-200'
                        : 'bg-emerald-950/80 border border-emerald-600 text-emerald-200'
                    }`}
                  >
                    {pinChangeMsg.text}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewPinInput('1945');
                      setConfirmPinInput('1945');
                      onChangePin('1945');
                      setPinChangeMsg({ text: "PIN Guru dikembalikan ke setelan awal (1945).", isError: false });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
                  >
                    Reset ke Default (1945)
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan PIN Baru</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
