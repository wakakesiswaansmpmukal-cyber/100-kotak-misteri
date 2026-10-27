# Rencana Implementasi: Sistem Login & Akses Masuk Guru (PIN / Passcode)

Dokumen ini menguraikan spesifikasi, arsitektur, dan alur implementasi penambahan sistem login awal berbasis PIN / Kode Akses Kelas untuk mengamankan akses aplikasi, Panel Guru, dan evaluasi nilai pada **100 Kotak Tantangan Warga Negara**.

---

## 1. User Stories, Acceptance Criteria & Invariants

### User Stories
- **Sebagai Guru / Moderator**, saya ingin aplikasi menyajikan gerbang masuk awal yang meminta Kode Akses Guru / PIN, sehingga akses administrasi, pengeditan bank soal, dan koreksi nilai terlindungi dari pengubahan tidak sengaja oleh siswa.
- **Sebagai Siswa / Penonton Kelas**, kami dapat masuk sebagai Siswa / Tim Penonton menggunakan tombol "Masuk sebagai Siswa / Tim" atau Kode Akses Kelas tanpa memerlukan kata sandi rumit, sehingga jalannya pembelajaran di proyektor tetap lancar.
- **Sebagai Guru**, saya dapat mengubah PIN default di Panel Guru, mengaktifkan opsi "Ingat Sesi di Perangkat Ini", serta melakukan *Log Out* sewaktu-waktu.

### Acceptance Criteria
1. **Layar Masuk Awal (Gate Screen)**:
   - Muncul pertama kali saat aplikasi dibuka sebelum papan permainan diakses.
   - Menyediakan 2 mode masuk:
     - **Masuk sebagai Guru (dengan PIN / Kode Rahasia Guru)**: Default PIN `1945` (mudah diingat sesuai materi Konstitusi), dapat diubah kapan saja di Panel Guru. Memberikan akses penuh ke permainan, kontrol wasit, dan Panel Guru.
     - **Masuk sebagai Siswa / Mode Kelas (Mode Proyektor)**: Langsung masuk ke papan permainan untuk bermain, namun tombol Panel Guru terkunci/memerlukan PIN jika ditekan.
2. **Perlindungan Panel Guru & Bank Soal**:
   - Jika pengguna masuk sebagai Siswa/Tamu dan mengklik tombol "Panel Guru", modal PIN verifikasi akan muncul.
   - Guru yang telah terautentikasi memiliki tanda status aktif (misalnya `Guru Terverifikasi`) di bar navigasi dan tombol *Keluar (Log Out)*.
3. **Penyimpanan Sesi (Session Persistence)**:
   - Status login disimpan di `localStorage` (`sessionRole: 'TEACHER' | 'STUDENT' | null`), sehingga refresh halaman tidak memaksa login ulang secara mengganggu jika sesi masih aktif.
4. **Keamanan & Resiliensi**:
   - Terdapat tombol "Lupa PIN / Reset ke Default `1945`" dengan konfirmasi dialog aman.
   - Papan permainan 100 kotak dan seluruh skor kelompok tidak hilang saat ganti mode login.

---

## 2. Arsitektur Antarmuka & Wireframe

### Alur Tampilan (User Flow)
```
[Buka Aplikasi]
       │
       ▼
[Layar Gerbang Masuk (Auth Gate)]
  ├── Mode Masuk Guru ──► [Input PIN 4-digit / Passcode] ──► [Akses Penuh + Panel Guru Terbuka]
  └── Mode Siswa / Kelas ──► [Langsung Masuk Papan Permainan] ──► [Panel Guru Terkunci dengan PIN Prompt]
```

### Wireframe Layar Gerbang Masuk (AuthGate.tsx)
```
┌─────────────────────────────────────────────────────────────┐
│                 100 KOTAK TANTANGAN WARGA NEGARA            │
│            Pendidikan Pancasila Kelas IX — Bab 2            │
│                                                             │
│       ┌─────────────────────────────────────────────┐       │
│       │           SELAMAT DATANG DI GAME SHOW       │       │
│       │                                             │       │
│       │  [ Tab Masuk Guru ]   [ Tab Masuk Kelas ]   │       │
│       │                                             │       │
│       │  Masukkan PIN Guru:                         │       │
│       │  [ • • • • ]                                │       │
│       │  (Default PIN: 1945)                        │       │
│       │                                             │       │
│       │  [ MASUK SEBAGAI GURU & MODERATOR ]         │       │
│       │                                             │       │
│       │  Atau:                                      │       │
│       │  [ MASUK SEBAGAI SISWA / TIM (PROYEKTOR) ]  │       │
│       └─────────────────────────────────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Bar Header (Perubahan Top Bar)
- Penambahan elemen profil/status otentikasi di sebelah kanan:
  - Jika peran `TEACHER`: Menampilkan lencana tenang `Guru Aktif` + Tombol `Keluar`.
  - Jika peran `STUDENT`: Menampilkan lencana `Mode Kelas` + Tombol `Login Guru`.

---

## 3. Rencana File & Implementasi

1. **`src/types.ts`**:
   - Menambahkan tipe peran pengguna: `UserRole = 'TEACHER' | 'STUDENT' | null`.
   - Menambahkan konfigurasi autentikasi dalam `GameState`:
     ```typescript
     auth: {
       teacherPin: string; // default "1945"
       currentRole: UserRole;
     }
     ```
2. **`src/components/AuthGate.tsx` (Komponen Baru)**:
   - Layar sambutan dengan kartu autentikasi responsif dan berdesain panggung game show.
   - Input PIN visual yang elegan (4 digit / kode akses), tombol masuk Guru, dan tombol masuk Siswa/Kelas.
   - Feedback animasi jika PIN salah dan informasi PIN awal (`1945`).
3. **`src/components/PinPromptModal.tsx` (Komponen Baru)**:
   - Modal cepat yang muncul saat pengguna dalam mode Siswa mencoba mengakses fitur administrator (Panel Guru atau reset permainan).
4. **`src/components/Header.tsx` (Pembaruan)**:
   - Menampilkan status login Guru / Siswa.
   - Tombol *Log Out* untuk kembali ke layar gerbang masuk.
5. **`src/components/TeacherModal.tsx` (Pembaruan)**:
   - Penambahan opsi ubah PIN Guru pada Tab 2 (Pengaturan).
6. **`src/App.tsx` (Integrasi State)**:
   - Menangani kondisional render antara `AuthGate` (jika `currentRole === null`) dan papan permainan utama.
   - Pengelolaan verifikasi PIN dan penyimpanan sesi `localStorage`.

---

## 4. Rencana Pengujian & Verifikasi

- **Pengujian Gate Awal**: Buka aplikasi pertama kali -> Muncul layar `AuthGate`.
- **Pengujian Login Siswa**: Klik "Masuk sebagai Siswa" -> Papan permainan 100 kotak terbuka langsung. Klik tombol "Panel Guru" -> Muncul prompt PIN meminta otentikasi Guru.
- **Pengujian Login Guru**: Masukkan PIN `1945` -> Masuk dengan hak akses Guru penuh; tombol Panel Guru langsung dapat dibuka tanpa rintangan.
- **Pengujian Ubah PIN**: Buka Panel Guru -> Ubah PIN menjadi `2024` -> Log out -> Coba PIN lama (gagal) dan PIN baru (berhasil).
- **Pengujian Preservasi Data**: Saat login/logout, kotak yang telah dibuka dan skor kelompok tidak ter-reset.
- **Build & Lint Verification**: Menjalankan `compile_applet` dan `lint_applet` memastikan nol error kompilasi.
