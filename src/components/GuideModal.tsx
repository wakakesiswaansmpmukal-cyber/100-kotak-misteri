import React from 'react';
import { X, BookOpen, HelpCircle, Users, Gift, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#081538] border-2 border-yellow-400 rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-5 shadow-2xl animate-reveal my-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                PANDUAN PERMAINAN 100 KOTAK TANTANGAN
              </h2>
              <p className="text-xs text-blue-200">
                Pendidikan Pancasila Kelas IX — Bab 2: Hak dan Kewajiban Warga Negara
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-blue-100 max-h-[70vh] overflow-y-auto pr-1">
          <div className="bg-blue-950/70 border border-blue-800 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-yellow-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Tujuan Pembelajaran
            </h3>
            <p className="leading-relaxed">
              Game show ini dirancang untuk menguji pemahaman peserta didik secara kolaboratif, menyenangkan, dan kompetitif mengenai:
              arti hak dan kewajiban menurut para ahli, jaminan hak dalam Bab XA UUD NRI 1945, tantangan nyata pemenuhan hak di era keterbukaan informasi, pencegahan perundungan (bullying), serta peran lembaga penegak hukum di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/90 border border-sky-600/40 rounded-xl p-3.5 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> 70 Kotak Pertanyaan
              </div>
              <p className="text-xs text-blue-200 leading-snug">
                Soal Pilihan Ganda (A, B, C, D) dengan tingkat Mudah (50 Poin), Sedang (100 Poin), dan Sulit (150 Poin). Apabila salah, guru dapat melempar kesempatan ke kelompok lain.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-emerald-600/40 rounded-xl p-3.5 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> 15 Kotak Tugas Kelompok
              </div>
              <p className="text-xs text-blue-200 leading-snug">
                Tantangan simulasi, musyawarah kelas, pembuatan slogan anti-perundungan, atau studi kasus. Format pelaksanaan ditentukan guru (Lisan, Tertulis, atau Peragaan).
              </p>
            </div>

            <div className="bg-slate-900/90 border border-yellow-500/40 rounded-xl p-3.5 space-y-1.5">
              <div className="font-bold text-yellow-300 flex items-center gap-1.5">
                <Gift className="w-4 h-4" /> 10 Kotak Kejutan
              </div>
              <p className="text-xs text-blue-200 leading-snug">
                Berisi jackpot poin langsung (+50 s.d. +150), giliran tambahan, tantangan rebutan cepat (buzzer), kartu pengganda 2x lipat poin, hingga apresiasi kekompakan oleh guru.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-purple-500/40 rounded-xl p-3.5 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> 5 Kotak Strategi
              </div>
              <p className="text-xs text-blue-200 leading-snug">
                Kartu taktis untuk menunjuk kelompok lawan menjawab, menukar urutan giliran, memanfaatkan hak rebut, atau mengaktifkan Perisai Bebas Penalti.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-blue-800 rounded-2xl p-4 space-y-2 text-xs">
            <h4 className="font-bold text-yellow-300">Alur Bermain di Kelas:</h4>
            <ol className="list-decimal list-inside space-y-1.5 leading-relaxed text-blue-200">
              <li>Kelompok yang sedang bertugas memilih salah satu nomor kotak (1–100) pada proyektor/layar.</li>
              <li>Klik <strong>BUKA KOTAK SEKARANG</strong> untuk memunculkan tantangan dan memulai hitung mundur waktu.</li>
              <li>Kelompok berdiskusi secara kompak dan memilih jawaban atau melakukan simulasi tugas.</li>
              <li>Guru/moderator memeriksa ketepatan jawaban dengan membuka Kunci Jawaban, lalu mengesahkan poin.</li>
              <li>Setelah disahkan, kotak terkunci secara permanen dan giliran otomatis beralih ke kelompok berikutnya.</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-blue-800">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs sm:text-sm shadow transition cursor-pointer"
          >
            Mengerti, Siap Bermain!
          </button>
        </div>
      </div>
    </div>
  );
};
