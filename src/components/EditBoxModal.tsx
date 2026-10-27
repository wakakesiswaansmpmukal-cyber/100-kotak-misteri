import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { MysteryBox, BoxType, BoxDifficulty } from '../types';

interface EditBoxModalProps {
  box: MysteryBox;
  onClose: () => void;
  onSave: (updatedBox: MysteryBox) => void;
}

export const EditBoxModal: React.FC<EditBoxModalProps> = ({ box, onClose, onSave }) => {
  const [type, setType] = useState<BoxType>(box.type);
  const [topic, setTopic] = useState(box.topic);
  const [difficulty, setDifficulty] = useState<BoxDifficulty>(box.difficulty);
  const [points, setPoints] = useState(box.points);
  const [timer, setTimer] = useState(box.timer);
  const [prompt, setPrompt] = useState(box.prompt);
  const [optionsText, setOptionsText] = useState(box.options ? box.options.join('\n') : '');
  const [answer, setAnswer] = useState(box.answer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawOptions = optionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const updated: MysteryBox = {
      ...box,
      type,
      topic: topic.trim() || box.topic,
      difficulty,
      points: Number(points) || 0,
      timer: Number(timer) || 30,
      prompt: prompt.trim() || box.prompt,
      options: rawOptions.length > 0 ? rawOptions : null,
      answer: answer.trim() || box.answer
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4">
      <div className="bg-[#0b1c47] border-2 border-yellow-400 rounded-2xl max-w-lg w-full p-5 space-y-4 shadow-2xl animate-reveal">
        <div className="flex items-center justify-between border-b border-blue-800 pb-3">
          <h3 className="font-display text-lg font-bold text-yellow-300">
            Edit Isi Kotak #{box.number}
          </h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block text-blue-200 mb-1 font-semibold">Jenis Isi Kotak</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as BoxType)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-bold"
            >
              <option value="QUESTION">Pertanyaan Pilihan Ganda (A/B/C/D)</option>
              <option value="TASK">Tugas / Tantangan Kelompok</option>
              <option value="SURPRISE">Kotak Kejutan</option>
              <option value="STRATEGY">Kotak Strategi</option>
            </select>
          </div>

          <div>
            <label className="block text-blue-200 mb-1 font-semibold">Topik Materi</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white font-medium"
            />
          </div>

          <div>
            <label className="block text-blue-200 mb-1 font-semibold">Pertanyaan / Deskripsi Tugas / Efek</label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-white"
            />
          </div>

          {type === 'QUESTION' && (
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">
                Opsi Pilihan Ganda (Satu opsi per baris)
              </label>
              <textarea
                rows={4}
                value={optionsText}
                onChange={(e) => setOptionsText(e.target.value)}
                placeholder="A. Pilihan pertama&#10;B. Pilihan kedua&#10;C. Pilihan ketiga&#10;D. Pilihan keempat"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-sky-200 font-mono text-xs"
              />
            </div>
          )}

          <div>
            <label className="block text-blue-200 mb-1 font-semibold">Kunci Jawaban / Pedoman Penilaian</label>
            <textarea
              rows={2}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-blue-700 text-emerald-300"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">Tingkat</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as BoxDifficulty)}
                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-blue-700 text-white text-xs"
              >
                <option value="Mudah">Mudah</option>
                <option value="Sedang">Sedang</option>
                <option value="Sulit">Sulit</option>
                <option value="Khusus">Khusus</option>
              </select>
            </div>
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">Poin</label>
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value, 10) || 0)}
                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-blue-700 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-blue-200 mb-1 font-semibold">Waktu (Detik)</label>
              <input
                type="number"
                value={timer}
                onChange={(e) => setTimer(parseInt(e.target.value, 10) || 30)}
                className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-blue-700 text-white text-xs font-bold"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-blue-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold flex items-center gap-1.5 shadow cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
