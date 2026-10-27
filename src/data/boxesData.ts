import { BoxDifficulty, MysteryBox } from '../types';

export interface RawQuestionItem {
  topic: string;
  difficulty: BoxDifficulty;
  points: number;
  timer: number;
  prompt: string;
  options: string[];
  answer: string;
}

export interface RawTaskItem {
  topic: string;
  difficulty: BoxDifficulty;
  points: number;
  timer: number;
  prompt: string;
  answer: string;
}

export interface RawSpecialItem {
  effectCode: string;
  topic: string;
  difficulty: BoxDifficulty;
  points: number;
  timer: number;
  prompt: string;
  answer: string;
}

export const INITIAL_70_QUESTIONS: RawQuestionItem[] = [
  // --- A1. Pengertian Hak & Kewajiban Menurut Ahli & Konsep Dasar (1-10) ---
  {
    topic: "Pengertian Hak & Kewajiban",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Menurut Prof. Dr. Notonegoro, kekuasaan untuk menerima atau melakukan sesuatu yang semestinya diterima oleh pihak tertentu dan tidak dapat dilakukan oleh pihak lain disebut ....",
    options: [
      "A. Hak",
      "B. Kewajiban",
      "C. Tanggung jawab",
      "D. Norma hukum"
    ],
    answer: "A. Hak"
  },
  {
    topic: "Pengertian Hak & Kewajiban",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Segala sesuatu yang harus dilakukan oleh seseorang sebagai penyeimbang hak yang diperoleh, dan apabila diabaikan akan mendapat sanksi disebut ....",
    options: [
      "A. Hak mutlak",
      "B. Kewajiban",
      "C. Kebebasan individu",
      "D. Kekebalan hukum"
    ],
    answer: "B. Kewajiban"
  },
  {
    topic: "Pengertian Hak Menurut Ahli",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Siapakah tokoh ahli hukum yang mendefinisikan hak sebagai 'izin atau kekuasaan yang diberikan oleh hukum'?",
    options: [
      "A. Prof. Dr. Notonegoro",
      "B. Christine S. T. Kansil",
      "C. Sudikno Mertokusumo",
      "D. Johan Yasin"
    ],
    answer: "B. Christine S. T. Kansil"
  },
  {
    topic: "Pengertian Hak Menurut Ahli",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Tokoh yang menyatakan bahwa 'hak adalah kepentingan yang dilindungi hukum' adalah ....",
    options: [
      "A. Sudikno Mertokusumo",
      "B. John Salmond",
      "C. Koentjaraningrat",
      "D. Jimly Asshiddiqie"
    ],
    answer: "A. Sudikno Mertokusumo"
  },
  {
    topic: "Klasifikasi Hak John Salmond",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "John Salmond membagi pengertian hak menjadi empat jenis. Hak yang diperoleh seseorang dengan syarat melakukan suatu kewajiban tertentu disebut ....",
    options: [
      "A. Hak kemerdekaan",
      "B. Hak dalam arti sempit",
      "C. Hak kekuasaan",
      "D. Hak kekebalan/imunitas"
    ],
    answer: "B. Hak dalam arti sempit"
  },
  {
    topic: "Klasifikasi Hak John Salmond",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Menurut John Salmond, hak yang dimiliki seseorang untuk melakukan kegiatan dengan syarat tidak mengganggu dan tidak melanggar hak orang lain disebut ....",
    options: [
      "A. Hak dalam arti sempit",
      "B. Hak kekuasaan",
      "C. Hak kemerdekaan",
      "D. Hak imunitas"
    ],
    answer: "C. Hak kemerdekaan"
  },
  {
    topic: "Klasifikasi Hak John Salmond",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Menurut John Salmond, hak yang dimiliki seseorang untuk bebas dari kekuasaan hukum orang lain disebut hak ....",
    options: [
      "A. Hak kekebalan atau imunitas",
      "B. Hak kemerdekaan",
      "C. Hak dalam arti sempit",
      "D. Hak mutlak warga"
    ],
    answer: "A. Hak kekebalan atau imunitas"
  },
  {
    topic: "Pengertian Kewajiban",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Tokoh yang menyatakan bahwa kewajiban warga negara adalah suatu keharusan yang tidak boleh ditinggalkan oleh warga negara dalam kehidupan bermasyarakat, berbangsa, dan bernegara adalah ....",
    options: [
      "A. Johan Yasin",
      "B. Christine S. T. Kansil",
      "C. Sudikno Mertokusumo",
      "D. Yudi Latif"
    ],
    answer: "A. Johan Yasin"
  },
  {
    topic: "Hak & Kewajiban Asasi",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Seperangkat kewajiban dasar yang apabila tidak dilaksanakan, maka Hak Asasi Manusia (HAM) tidak mungkin ada dan terlaksana dengan baik disebut ....",
    options: [
      "A. Kewajiban Asasi",
      "B. Hak Konstitusional",
      "C. Norma Kesopanan",
      "D. Wewenang Pemerintah"
    ],
    answer: "A. Kewajiban Asasi"
  },
  {
    topic: "Keseimbangan Hak & Kewajiban",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pelaksanaan hak dan kewajiban warga negara harus dilakukan secara seimbang karena ....",
    options: [
      "A. Hak dan kewajiban hanya berlaku bagi orang dewasa",
      "B. Tidak ada hak yang mungkin terwujud tanpa pelaksanaan kewajiban",
      "C. Hak menjamin kelangsungan hidup, sedangkan kewajiban dilakukan jika sempat",
      "D. Kewajiban hanya berlaku saat diawasi aparat penegak hukum"
    ],
    answer: "B. Tidak ada hak yang mungkin terwujud tanpa pelaksanaan kewajiban"
  },

  // --- A2. Pelaksanaan Hak dan Kewajiban di Sekolah, Keluarga, & Masyarakat (11-22) ---
  {
    topic: "Keseimbangan di Sekolah",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Meminjam buku di perpustakaan, menggunakan fasilitas sekolah, dan memperoleh suasana belajar yang tenang merupakan contoh ....",
    options: [
      "A. Kewajiban peserta didik di sekolah",
      "B. Hak peserta didik di sekolah",
      "C. Kewajiban kepala sekolah",
      "D. Hak masyarakat sekitar sekolah"
    ],
    answer: "B. Hak peserta didik di sekolah"
  },
  {
    topic: "Keseimbangan di Sekolah",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Mengikuti upacara bendera setiap hari Senin, melaksanakan piket kelas, serta merawat fasilitas sekolah merupakan wujud ....",
    options: [
      "A. Hak peserta didik di sekolah",
      "B. Kewajiban peserta didik di sekolah",
      "C. Hak eksklusif pengurus OSIS",
      "D. Tugas khusus penjaga sekolah"
    ],
    answer: "B. Kewajiban peserta didik di sekolah"
  },
  {
    topic: "Hak & Kewajiban di Keluarga",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Mendapatkan kasih sayang penuh dari orang tua, bimbingan belajar di rumah, serta jaminan kesehatan dan perlindungan merupakan contoh hak anak di lingkungan ....",
    options: [
      "A. Sekolah",
      "B. Masyarakat",
      "C. Keluarga / Rumah",
      "D. Lembaga peradilan"
    ],
    answer: "C. Keluarga / Rumah"
  },
  {
    topic: "Hak & Kewajiban di Keluarga",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Manakah di bawah ini yang merupakan contoh kewajiban seorang anak di lingkungan keluarga sebagai penyeimbang hak yang diterimanya?",
    options: [
      "A. Menuntut uang saku melebihi kemampuan orang tua",
      "B. Menghormati orang tua, mematuhi nasihat, dan membantu pekerjaan rumah",
      "C. Meminjam buku di perpustakaan daerah",
      "D. Mengatur anggaran belanja negara"
    ],
    answer: "B. Menghormati orang tua, mematuhi nasihat, dan membantu pekerjaan rumah"
  },
  {
    topic: "Hak & Kewajiban di Masyarakat",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Menjaga kelestarian dan keamanan lingkungan sekitar serta menjunjung tinggi hukum dan peraturan setempat adalah contoh kewajiban warga di lingkungan ....",
    options: [
      "A. Keluarga inti",
      "B. Masyarakat",
      "C. Ruang kelas",
      "D. Laboratorium sekolah"
    ],
    answer: "B. Masyarakat"
  },
  {
    topic: "Norma dalam Masyarakat",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Dalam mewujudkan tegaknya hak dan kewajiban sehari-hari, setiap warga negara wajib mematuhi empat macam norma di masyarakat, yaitu ....",
    options: [
      "A. Norma agama, norma kesusilaan, norma kesopanan, dan norma hukum",
      "B. Norma ekonomi, norma politik, norma budaya, dan norma teknologi",
      "C. Norma sekolah, norma bermain, norma keluarga, dan norma organisasi",
      "D. Norma lisan, norma tulisan, norma isyarat, dan norma digital"
    ],
    answer: "A. Norma agama, norma kesusilaan, norma kesopanan, dan norma hukum"
  },
  {
    topic: "Prinsip Pemenuhan Hak",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Agar pemenuhan hak dan kewajiban berjalan harmonis, langkah pertama yang perlu dilakukan setiap orang sebelum menuntut hak dirinya sendiri adalah ....",
    options: [
      "A. Meminta bantuan pengacara untuk menuntut orang lain",
      "B. Memperhatikan dan menghormati hak orang lain sesuai kewajiban diri sendiri",
      "C. Mengutamakan keuntungan pribadi di atas kepentingan umum",
      "D. Menunggu orang lain melaksanakan kewajibannya terlebih dahulu"
    ],
    answer: "B. Memperhatikan dan menghormati hak orang lain sesuai kewajiban diri sendiri"
  },
  {
    topic: "Studi Kasus Sekolah",
    difficulty: "Sedang",
    points: 100,
    timer: 35,
    prompt: "Studi Kasus: Kelas IX-A terasa kotor karena sebagian siswa menolak melaksanakan jadwal piket, namun mereka mengeluh tidak nyaman saat belajar. Analisis yang tepat atas kasus tersebut adalah ....",
    options: [
      "A. Siswa sudah melaksanakan kewajiban tetapi haknya dilanggar sekolah",
      "B. Siswa menuntut hak kenyamanan belajar tetapi mengabaikan kewajiban piket kelas",
      "C. Kebersihan kelas sepenuhnya merupakan kewajiban guru mata pelajaran",
      "D. Hak belajar nyaman tidak berhubungan dengan kewajiban menjaga kebersihan"
    ],
    answer: "B. Siswa menuntut hak kenyamanan belajar tetapi mengabaikan kewajiban piket kelas"
  },
  {
    topic: "Keseimbangan Bidang Ekonomi",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Manakah yang merupakan contoh keseimbangan pelaksanaan hak dan kewajiban warga negara dalam bidang ekonomi?",
    options: [
      "A. Mendapat layanan pendidikan yang sama dan belajar dengan sungguh-sungguh",
      "B. Mendapat kesejahteraan, kesempatan bekerja, serta mencintai produk dalam negeri",
      "C. Mendapat perlakuan sama di depan hukum dan menaati rambu lalu lintas",
      "D. Mendapat jaminan keamanan serta mengikuti kegiatan bela negara"
    ],
    answer: "B. Mendapat kesejahteraan, kesempatan bekerja, serta mencintai produk dalam negeri"
  },
  {
    topic: "Kewajiban Pajak & Pembangunan",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pemerintah membangun jalan raya Trans Papua, jembatan, dan fasilitas umum untuk rakyat. Sebagai timbal baliknya, warga negara berpartisipasi membangun negara dengan kewajiban membayar ....",
    options: [
      "A. Pajak",
      "B. Denda tilang",
      "C. Uang kas kelas",
      "D. Sumbangan sukarela"
    ],
    answer: "A. Pajak"
  },
  {
    topic: "Hubungan Timbal Balik Negara",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Menurut Cholisin (2007), hubungan hukum antara warga negara dan negara bersifat sederajat dan timbal balik. Makna 'hubungan timbal balik' tersebut adalah ....",
    options: [
      "A. Negara memiliki kedudukan jauh lebih tinggi sehingga bebas mengatur warga",
      "B. Semua hak warga negara adalah kewajiban negara, dan kewajiban warga negara adalah hak negara",
      "C. Warga negara hanya memiliki kewajiban tanpa boleh menggugat negara",
      "D. Negara hanya wajib memenuhi hak warga yang membayar pajak besar"
    ],
    answer: "B. Semua hak warga negara adalah kewajiban negara, dan kewajiban warga negara adalah hak negara"
  },
  {
    topic: "Menghargai Pendapat di Kelas",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Contoh upaya peserta didik dalam menghormati dan menghargai hak-hak orang lain saat diskusi di kelas adalah ....",
    options: [
      "A. Mengemukakan pendapat sendiri tanpa menghiraukan pendapat teman",
      "B. Mendengarkan pendapat teman dengan sopan dan menerima masukan teman",
      "C. Mengerjakan tugas kelompok secara individu tanpa berdiskusi",
      "D. Memotong pembicaraan teman yang berbeda pendapat"
    ],
    answer: "B. Mendengarkan pendapat teman dengan sopan dan menerima masukan teman"
  },

  // --- A3. Hak dan Kewajiban dalam UUD NRI Tahun 1945 (23-38) ---
  {
    topic: "UUD NRI Tahun 1945 - Pendidikan",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "'Setiap warga negara berhak mendapat pendidikan' merupakan bunyi jaminan konstitusi dalam UUD NRI Tahun 1945 Pasal ....",
    options: [
      "A. Pasal 27 ayat (1)",
      "B. Pasal 29 ayat (2)",
      "C. Pasal 31 ayat (1)",
      "D. Pasal 33 ayat (1)"
    ],
    answer: "C. Pasal 31 ayat (1)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Pekerjaan Layak",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pasal 27 ayat (2) UUD NRI Tahun 1945 menjamin bahwa 'Tiap-tiap warga negara berhak atas ....'",
    options: [
      "A. Kebebasan berserikat dan berkumpul",
      "B. Pekerjaan dan penghidupan yang layak bagi kemanusiaan",
      "C. Lingkungan hidup yang baik dan sehat",
      "D. Kemerdekaan memeluk agamanya masing-masing"
    ],
    answer: "B. Pekerjaan dan penghidupan yang layak bagi kemanusiaan"
  },
  {
    topic: "UUD NRI Tahun 1945 - Hukum",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Segala warga negara bersamaan kedudukannya di dalam hukum dan pemerintahan dan wajib menjunjung hukum dan pemerintahan itu dengan tidak ada kecualinya. Hal ini diatur dalam UUD NRI Tahun 1945 Pasal ....",
    options: [
      "A. Pasal 27 ayat (1)",
      "B. Pasal 27 ayat (3)",
      "C. Pasal 28A",
      "D. Pasal 30 ayat (1)"
    ],
    answer: "A. Pasal 27 ayat (1)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Bela Negara",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Berikut ini yang termasuk kewajiban sekaligus hak warga negara yang tercantum dalam Pasal 27 ayat (3) UUD NRI Tahun 1945 adalah ....",
    options: [
      "A. Mendapat pendidikan dan pengajaran dasar",
      "B. Ikut serta dalam upaya pembelaan negara",
      "C. Memperoleh pekerjaan yang layak",
      "D. Menjalankan ibadah sesuai dengan keyakinan"
    ],
    answer: "B. Ikut serta dalam upaya pembelaan negara"
  },
  {
    topic: "UUD NRI Tahun 1945 - Pertahanan Keamanan",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "'Tiap-tiap warga negara berhak dan wajib ikut serta dalam usaha pertahanan dan keamanan negara' tercantum dalam UUD NRI Tahun 1945 Pasal ....",
    options: [
      "A. Pasal 28E ayat (3)",
      "B. Pasal 29 ayat (1)",
      "C. Pasal 30 ayat (1)",
      "D. Pasal 34 ayat (2)"
    ],
    answer: "C. Pasal 30 ayat (1)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Kebebasan Beragama",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Jaminan negara terhadap kemerdekaan tiap-tiap penduduk untuk memeluk agamanya masing-masing dan beribadat menurut agamanya dan kepercayaannya diatur dalam UUD NRI Tahun 1945 Pasal ....",
    options: [
      "A. Pasal 27 ayat (2)",
      "B. Pasal 28D ayat (1)",
      "C. Pasal 29 ayat (2)",
      "D. Pasal 31 ayat (1)"
    ],
    answer: "C. Pasal 29 ayat (2)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Hak Hidup",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pasal 28A UUD NRI Tahun 1945 menyatakan bahwa setiap orang berhak untuk ....",
    options: [
      "A. Hidup serta berhak mempertahankan hidup dan kehidupannya",
      "B. Memperoleh kesempatan yang sama dalam pemerintahan",
      "C. Membentuk keluarga dan melanjutkan keturunan",
      "D. Mempunyai hak milik pribadi"
    ],
    answer: "A. Hidup serta berhak mempertahankan hidup dan kehidupannya"
  },
  {
    topic: "UUD NRI Tahun 1945 - Hak Anak",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Pasal 28B ayat (2) UUD NRI Tahun 1945 secara tegas melindungi hak setiap anak atas kelangsungan hidup, tumbuh, dan berkembang serta berhak atas perlindungan dari ....",
    options: [
      "A. Kemiskinan dan kebodohan",
      "B. Kekerasan dan diskriminasi",
      "C. Persaingan ekonomi global",
      "D. Kewajiban belajar di sekolah"
    ],
    answer: "B. Kekerasan dan diskriminasi"
  },
  {
    topic: "UUD NRI Tahun 1945 - Kepastian Hukum",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Setiap orang berhak atas pengakuan, jaminan, perlindungan, dan kepastian hukum yang adil serta perlakuan yang sama di hadapan hukum. Ketentuan ini diatur dalam Pasal ....",
    options: [
      "A. Pasal 28B ayat (1)",
      "B. Pasal 28D ayat (1)",
      "C. Pasal 28F",
      "D. Pasal 28J ayat (1)"
    ],
    answer: "B. Pasal 28D ayat (1)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Berserikat & Berpendapat",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "'Setiap orang berhak atas kebebasan berserikat, berkumpul, dan mengeluarkan pendapat' merupakan bunyi UUD NRI Tahun 1945 Pasal ....",
    options: [
      "A. Pasal 28E ayat (3)",
      "B. Pasal 28G ayat (1)",
      "C. Pasal 28H ayat (1)",
      "D. Pasal 28I ayat (2)"
    ],
    answer: "A. Pasal 28E ayat (3)"
  },
  {
    topic: "UUD NRI Tahun 1945 - Informasi",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Pasal dalam Bab XA UUD NRI Tahun 1945 yang mengatur hak setiap orang untuk berkomunikasi serta mencari, memperoleh, memiliki, menyimpan, mengolah, dan menyampaikan informasi adalah ....",
    options: [
      "A. Pasal 28A",
      "B. Pasal 28C ayat (2)",
      "C. Pasal 28F",
      "D. Pasal 28J ayat (2)"
    ],
    answer: "C. Pasal 28F"
  },
  {
    topic: "UUD NRI Tahun 1945 - Lingkungan & Kesehatan",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Menurut Pasal 28H ayat (1) UUD NRI Tahun 1945, selain berhak hidup sejahtera lahir dan batin serta bertempat tinggal, setiap orang juga berhak mendapatkan ....",
    options: [
      "A. Suaka politik dari negara lain",
      "B. Lingkungan hidup yang baik dan sehat serta pelayanan kesehatan",
      "C. Kemudahan mendirikan partai politik",
      "D. Pembebasan dari segala jenis pajak negara"
    ],
    answer: "B. Lingkungan hidup yang baik dan sehat serta pelayanan kesehatan"
  },
  {
    topic: "UUD NRI Tahun 1945 - Tanggung Jawab Negara",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Pasal 28I ayat (4) UUD NRI Tahun 1945 menegaskan bahwa perlindungan, pemajuan, penegakan, dan pemenuhan hak asasi manusia adalah tanggung jawab ....",
    options: [
      "A. Lembaga swadaya masyarakat internasional",
      "B. Negara, terutama pemerintah",
      "C. Tokoh adat di setiap daerah",
      "D. Organisasi pemuda di sekolah"
    ],
    answer: "B. Negara, terutama pemerintah"
  },
  {
    topic: "UUD NRI Tahun 1945 - Kewajiban HAM",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Mengapa Pasal 28J ayat (1) dan (2) menjadi kunci keseimbangan pelaksanaan HAM dalam Bab XA UUD NRI Tahun 1945?",
    options: [
      "A. Karena menghapus seluruh hak asasi manusia dalam keadaan darurat",
      "B. Karena mewajibkan setiap orang menghormati HAM orang lain dan tunduk pada pembatasan UU demi moral, agama, keamanan, dan ketertiban umum",
      "C. Karena memberikan kebebasan tanpa batas kepada setiap individu",
      "D. Karena hanya berlaku bagi pejabat pemerintahan"
    ],
    answer: "B. Karena mewajibkan setiap orang menghormati HAM orang lain dan tunduk pada pembatasan UU demi moral, agama, keamanan, dan ketertiban umum"
  },
  {
    topic: "Program Pemenuhan Hak Pendidikan",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Program Indonesia Pintar (PIP), pembebasan biaya SPP sekolah di berbagai provinsi, serta penyediaan beasiswa merupakan wujud pemenuhan kewajiban negara terhadap hak warga negara di bidang ....",
    options: [
      "A. Pertahanan dan keamanan",
      "B. Pendidikan (Pasal 31 UUD NRI Tahun 1945)",
      "C. Peradilan militer",
      "D. Perdagangan luar negeri"
    ],
    answer: "B. Pendidikan (Pasal 31 UUD NRI Tahun 1945)"
  },
  {
    topic: "Undang-Undang HAM",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Selain di dalam Bab XA UUD NRI Tahun 1945, peraturan mengenai Hak Asasi Manusia di Indonesia diatur secara khusus dalam Undang-Undang Nomor ....",
    options: [
      "A. UU Nomor 9 Tahun 1998",
      "B. UU Nomor 39 Tahun 1999",
      "C. UU Nomor 2 Tahun 2002",
      "D. UU Nomor 14 Tahun 2008"
    ],
    answer: "B. UU Nomor 39 Tahun 1999"
  },

  // --- A4. Tantangan Pemenuhan Hak dan Kewajiban Warga Negara (39-56) ---
  {
    topic: "Tantangan Era Digital",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Kebebasan berekspresi di media sosial sering disalahgunakan dengan saling menghujat, menyebarkan hoaks, dan menyudutkan pihak lain. Hal ini merupakan tantangan pemenuhan hak dan kewajiban terkait ....",
    options: [
      "A. Alih fungsi lahan hutan lindung",
      "B. Pelanggaran etika berkomunikasi di dunia maya pada era keterbukaan",
      "C. Keterbatasan sarana transportasi laut",
      "D. Pelaksanaan siskamling di desa"
    ],
    answer: "B. Pelanggaran etika berkomunikasi di dunia maya pada era keterbukaan"
  },
  {
    topic: "Tantangan Kekerasan & Bullying",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Tindakan perundungan (bullying) dan tawuran antarpelajar di sekolah merupakan bentuk pelanggaran HAM karena merampas hak siswa lain untuk mendapatkan ....",
    options: [
      "A. Uang saku tambahan dari guru",
      "B. Rasa aman, kenyamanan belajar, dan perlindungan dari kekerasan",
      "C. Kebebasan tidak mengikuti ujian sekolah",
      "D. Hak milik atas gedung sekolah"
    ],
    answer: "B. Rasa aman, kenyamanan belajar, dan perlindungan dari kekerasan"
  },
  {
    topic: "Data Riset PISA Bullying",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Berdasarkan infografik riset PISA 2018 dalam buku Pendidikan Pancasila Kelas IX, dua jenis tindakan perundungan (bullying) dengan persentase tertinggi (masing-masing 20%) yang dialami siswa di Indonesia adalah ....",
    options: [
      "A. Diancam dan barang dicuri",
      "B. Dihina/diolok-olok dan rumor buruk disebarkan",
      "C. Dipukul dan didorong",
      "D. Diintimidasi dan dikucilkan"
    ],
    answer: "B. Dihina/diolok-olok dan rumor buruk disebarkan"
  },
  {
    topic: "Tantangan Kepatuhan Hukum",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pengendara sepeda motor yang menerobos lampu merah, tidak memakai helm, dan belum memiliki Surat Izin Mengemudi (SIM) merupakan contoh nyata tantangan berupa ....",
    options: [
      "A. Pemenuhan hak kebebasan bergerak",
      "B. Pengabaian kewajiban menaati peraturan lalu lintas dan hukum",
      "C. Pelaksanaan hak imunitas di jalan raya",
      "D. Bentuk penyampaian pendapat di muka umum"
    ],
    answer: "B. Pengabaian kewajiban menaati peraturan lalu lintas dan hukum"
  },
  {
    topic: "Tantangan Lingkungan Hidup",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Alih fungsi lahan hutan lindung menjadi perkebunan secara sembarangan yang mengakibatkan terganggunya ekosistem flora dan fauna melanggar hak warga negara atas ....",
    options: [
      "A. Kebebasan memilih pekerjaan",
      "B. Lingkungan hidup yang baik dan sehat (Pasal 28H ayat 1)",
      "C. Kemerdekaan berserikat dan berkumpul",
      "D. Perlindungan suaka politik"
    ],
    answer: "B. Lingkungan hidup yang baik dan sehat (Pasal 28H ayat 1)"
  },
  {
    topic: "Tantangan Hak ABK",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Berdasarkan infografik Litbang Kompas pada Uji Kompetensi Bab 2 tentang upaya pemerintah memenuhi hak Anak Berkebutuhan Khusus (ABK), mayoritas responden (34,3%) menyatakan bahwa upaya pemerintah ....",
    options: [
      "A. Sudah sangat sempurna di seluruh daerah",
      "B. Sudah, tetapi kurang memadai",
      "C. Tidak diperlukan sama sekali",
      "D. Hanya berfokus pada perguruan tinggi"
    ],
    answer: "B. Sudah, tetapi kurang memadai"
  },
  {
    topic: "Dukungan bagi ABK",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Berdasarkan survei Litbang Kompas di Buku Kelas IX, peran negara dengan persentase tertinggi (27,3%) yang paling tepat dilakukan untuk mendukung Anak Berkebutuhan Khusus (ABK) pada masa pandemi adalah ....",
    options: [
      "A. Mendukung pembelajaran jarak jauh (PJJ)",
      "B. Memberikan kemudahan akses melakukan terapi (26,0%)",
      "C. Memastikan peraturan ABK di daerah terlaksana (23,4%)",
      "D. Memastikan informasi dan layanan kesehatan (21,2%)"
    ],
    answer: "A. Mendukung pembelajaran jarak jauh (PJJ)"
  },
  {
    topic: "Kemiskinan & Kesenjangan Sosial",
    difficulty: "Sedang",
    points: 100,
    timer: 35,
    prompt: "Pasal 34 ayat (2) UUD NRI Tahun 1945 mengamanatkan negara untuk mengembangkan sistem jaminan sosial bagi seluruh rakyat. Contoh program pemerintah di bidang kesehatan yang sesuai dengan pasal tersebut adalah ....",
    options: [
      "A. Jaminan Kesehatan Nasional (JKN)",
      "B. Wajib Pajak Badan Usaha",
      "C. Siskamling Lingkungan RT",
      "D. Festival Tunas Bahasa Ibu"
    ],
    answer: "A. Jaminan Kesehatan Nasional (JKN)"
  },
  {
    topic: "Diskriminasi & Ketidakadilan",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Perlakuan tidak adil yang membeda-bedakan atau mengucilkan seseorang berdasarkan suku, agama, ras, maupun status sosial ekonomi disebut tindakan ....",
    options: [
      "A. Emansipasi",
      "B. Diskriminasi",
      "C. Musyawarah",
      "D. Toleransi"
    ],
    answer: "B. Diskriminasi"
  },
  {
    topic: "Demokrasi Pancasila vs Liberal",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Apa perbedaan mendasar pelaksanaan Hak Asasi Manusia (HAM) dalam Demokrasi Pancasila di Indonesia dibandingkan dengan negara demokrasi liberal?",
    options: [
      "A. Demokrasi liberal mengutamakan gotong royong, sedangkan Indonesia mengutamakan kebebasan mutlak individu",
      "B. Demokrasi Pancasila menyeimbangkan hak individu dengan kepentingan masyarakat melalui gotong royong dan musyawarah",
      "C. Demokrasi Pancasila tidak mengakui adanya hak asasi manusia",
      "D. Demokrasi liberal melarang warga negaranya menyampaikan pendapat"
    ],
    answer: "B. Demokrasi Pancasila menyeimbangkan hak individu dengan kepentingan masyarakat melalui gotong royong dan musyawarah"
  },
  {
    topic: "Studi Kasus Kebebasan Berekspresi",
    difficulty: "Sedang",
    points: 100,
    timer: 35,
    prompt: "Studi Kasus: Seseorang menyebarkan fitnah terhadap temannya di media sosial dengan alasan 'hak kebebasan berpendapat'. Mengapa tindakan tersebut bertentangan dengan UUD NRI Tahun 1945?",
    options: [
      "A. Karena media sosial hanya boleh digunakan oleh pejabat pemerintah",
      "B. Karena kebebasan berpendapat wajib menghormati hak serta kehormatan/nama baik orang lain (Pasal 28G & 28J)",
      "C. Karena UUD NRI Tahun 1945 melarang warga negara menggunakan internet",
      "D. Karena pendapat hanya boleh disampaikan melalui surat kabar cetak"
    ],
    answer: "B. Karena kebebasan berpendapat wajib menghormati hak serta kehormatan/nama baik orang lain (Pasal 28G & 28J)"
  },
  {
    topic: "Tantangan Vandalisme Fasilitas Umum",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Mencoret-coret dinding kelas, merusak bangku sekolah, atau merusak rambu jalan raya merupakan tindakan tercela yang menunjukkan pengabaian kewajiban menjaga ....",
    options: [
      "A. Hak milik pribadi",
      "B. Fasilitas sekolah dan fasilitas umum",
      "C. Rahasia pertahanan negara",
      "D. Kedaulatan wilayah perbatasan"
    ],
    answer: "B. Fasilitas sekolah dan fasilitas umum"
  },
  {
    topic: "Upaya Keseimbangan Sehari-hari",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Lengkapi prinsip keseimbangan pada Bab 2 berikut: 'Apabila kita ingin beribadah dengan tenang sesuai dengan keyakinan agama, maka kita wajib ....'",
    options: [
      "A. Memaksa orang lain mengikuti cara ibadah kita",
      "B. Menghargai teman yang berbeda agama dengan tidak mengganggu ibadah mereka",
      "C. Melarang perayaan hari besar agama lain di lingkungan sekitar",
      "D. Beribadah hanya ketika dilihat oleh guru dan teman"
    ],
    answer: "B. Menghargai teman yang berbeda agama dengan tidak mengganggu ibadah mereka"
  },
  {
    topic: "Upaya Keseimbangan Sehari-hari",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Lengkapi prinsip keseimbangan berikut: 'Apabila kita ingin hidup sehat dan terhindar dari banjir, maka kita wajib ....'",
    options: [
      "A. Menuntut pemerintah membangun rumah mewah",
      "B. Menjaga kebersihan lingkungan dengan membuang sampah pada tempatnya",
      "C. Menebang pohon di hutan lindung untuk lahan parkir",
      "D. Menyerahkan seluruh tugas kebersihan kepada petugas desa"
    ],
    answer: "B. Menjaga kebersihan lingkungan dengan membuang sampah pada tempatnya"
  },
  {
    topic: "Kesetaraan Hak Pendidikan",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Dua tokoh pahlawan perempuan Indonesia yang disebut dalam buku Pendidikan Pancasila Kelas IX karena gigih memperjuangkan kesetaraan hak pendidikan bagi perempuan adalah ....",
    options: [
      "A. R.A. Kartini dan Raden Dewi Sartika",
      "B. Cut Nyak Dien dan Christina Martha Tiahahu",
      "C. Fatmawati dan Inggit Garnasih",
      "D. Rohana Kudus dan Nyi Ageng Serang"
    ],
    answer: "A. R.A. Kartini dan Raden Dewi Sartika"
  },
  {
    topic: "Hak Menyampaikan Aspirasi Publik",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Jika warga menemukan jalan raya yang rusak parah atau pelayanan publik yang buruk, pemerintah menyediakan kanal pengaduan resmi daring bernama ....",
    options: [
      "A. Aplikasi LAPOR! (Layanan Aspirasi dan Pengaduan Online Rakyat)",
      "B. Siskamling Digital Terpadu",
      "C. Bursa Kerja Nasional",
      "D. Pos Ronda Nusantara"
    ],
    answer: "A. Aplikasi LAPOR! (Layanan Aspirasi dan Pengaduan Online Rakyat)"
  },
  {
    topic: "Tempat Dilarang Demonstrasi",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Berdasarkan UU No. 9 Tahun 1998, manakah kelompok tempat yang DILARANG digunakan untuk kegiatan unjuk rasa/demonstrasi demi menjaga ketertiban umum?",
    options: [
      "A. Lapangan terbuka, balai warga, dan gedung pertemuan",
      "B. Istana kepresidenan, tempat ibadah, rumah sakit, dan instalasi militer",
      "C. Halaman gedung DPRD dan alun-alun kota pada siang hari",
      "D. Ruang diskusi kampus dan aula serbaguna"
    ],
    answer: "B. Istana kepresidenan, tempat ibadah, rumah sakit, dan instalasi militer"
  },
  {
    topic: "Hak yang Tidak Dapat Dikurangi",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Berdasarkan Pasal 28I ayat (1) UUD NRI Tahun 1945, manakah yang termasuk hak asasi manusia yang TIDAK dapat dikurangi dalam keadaan apa pun (non-derogable rights)?",
    options: [
      "A. Hak untuk hidup, hak tidak disiksa, hak beragama, dan hak tidak diperbudak",
      "B. Hak mendirikan perusahaan tambang di hutan lindung",
      "C. Hak melakukan demonstrasi pada malam hari di rumah sakit",
      "D. Hak menolak membayar pajak kepada negara"
    ],
    answer: "A. Hak untuk hidup, hak tidak disiksa, hak beragama, dan hak tidak diperbudak"
  },

  // --- A5. Penegakan Hukum, Lembaga Peradilan, & Nilai Pancasila (57-70) ---
  {
    topic: "Lembaga Penegak Hukum - Polri",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Lembaga penegak hukum yang bertugas memelihara keamanan dan ketertiban masyarakat, menegakkan hukum, serta memberikan perlindungan, pengayoman, dan pelayanan kepada masyarakat sesuai UU No. 2 Tahun 2002 adalah ....",
    options: [
      "A. Kejaksaan Republik Indonesia",
      "B. Kepolisian Negara Republik Indonesia (Polri)",
      "C. Komisi Yudisial (KY)",
      "D. Peradilan Tata Usaha Negara"
    ],
    answer: "B. Kepolisian Negara Republik Indonesia (Polri)"
  },
  {
    topic: "Lembaga Penegak Hukum - Kejaksaan",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Lembaga pemerintah yang melaksanakan kekuasaan negara di bidang penuntutan suatu perkara di pengadilan berdasarkan alat bukti yang sah adalah ....",
    options: [
      "A. Kepolisian",
      "B. Kejaksaan",
      "C. Advokat",
      "D. Komisi Yudisial"
    ],
    answer: "B. Kejaksaan"
  },
  {
    topic: "Lembaga Penegak Hukum - Hakim",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Pejabat negara yang memiliki kekuasaan kehakiman untuk memimpin persidangan dan mengadili/memutus perkara pelanggaran hukum disebut ....",
    options: [
      "A. Jaksa Penuntut Umum",
      "B. Hakim",
      "C. Advokat / Pengacara",
      "D. Panitera"
    ],
    answer: "B. Hakim"
  },
  {
    topic: "Lembaga Penegak Hukum - Advokat",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Profesi seseorang yang memberikan jasa hukum dan bertugas menyelesaikan persoalan hukum bagi warga yang membutuhkan bantuan hukum dalam proses peradilan disebut ....",
    options: [
      "A. Hakim Agung",
      "B. Jaksa Agung",
      "C. Advokat",
      "D. Polisi Militer"
    ],
    answer: "C. Advokat"
  },
  {
    topic: "Lembaga Pemberantasan Korupsi",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Tindak pidana korupsi merampas hak sosial dan ekonomi rakyat. Lembaga khusus di Indonesia yang berwenang melakukan penegakan hukum pemberantasan korupsi adalah ....",
    options: [
      "A. Komisi Pemberantasan Korupsi (KPK)",
      "B. Direktorat Jenderal Bea Cukai",
      "C. Direktorat Jenderal Imigrasi",
      "D. Badan Pusat Statistik (BPS)"
    ],
    answer: "A. Komisi Pemberantasan Korupsi (KPK)"
  },
  {
    topic: "Kekuasaan Yudikatif",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Dalam sistem ketatanegaraan RI menurut UUD NRI Tahun 1945 setelah perubahan, tiga lembaga negara yang memegang kekuasaan yudikatif / kehakiman adalah ....",
    options: [
      "A. DPR, DPD, dan MPR",
      "B. Mahkamah Agung (MA), Mahkamah Konstitusi (MK), dan Komisi Yudisial (KY)",
      "C. Presiden, Wakil Presiden, dan Menteri",
      "D. Polri, TNI, dan Bakamla"
    ],
    answer: "B. Mahkamah Agung (MA), Mahkamah Konstitusi (MK), dan Komisi Yudisial (KY)"
  },
  {
    topic: "Lingkungan Peradilan Umum",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Peradilan bagi rakyat pada umumnya yang memeriksa perkara pidana dan perdata pada tingkat pertama di kabupaten/kota diselenggarakan oleh ....",
    options: [
      "A. Pengadilan Negeri",
      "B. Pengadilan Tinggi",
      "C. Pengadilan Agama",
      "D. Pengadilan Militer"
    ],
    answer: "A. Pengadilan Negeri"
  },
  {
    topic: "Lingkungan Peradilan Agama",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Peradilan yang memeriksa dan memutus perkara tertentu antara warga yang beragama Islam di bidang perkawinan, waris, wasiat, dan hibah adalah ....",
    options: [
      "A. Peradilan Umum",
      "B. Peradilan Agama",
      "C. Peradilan Tata Usaha Negara",
      "D. Peradilan Militer"
    ],
    answer: "B. Peradilan Agama"
  },
  {
    topic: "Lingkungan Peradilan Militer",
    difficulty: "Sedang",
    points: 100,
    timer: 30,
    prompt: "Lingkungan peradilan di bawah Mahkamah Agung yang melaksanakan kekuasaan kehakiman terkait tindak pidana yang dilakukan oleh anggota TNI/militer adalah ....",
    options: [
      "A. Pengadilan Negeri",
      "B. Peradilan Militer",
      "C. Peradilan Tata Usaha Negara",
      "D. Mahkamah Konstitusi"
    ],
    answer: "B. Peradilan Militer"
  },
  {
    topic: "Peradilan Tata Usaha Negara",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Lingkungan peradilan di bawah Mahkamah Agung yang dibentuk untuk menyelesaikan sengketa Tata Usaha Negara dan menjamin kedudukan warga masyarakat dalam hukum adalah ....",
    options: [
      "A. Peradilan Agama",
      "B. Peradilan Tata Usaha Negara (PTUN)",
      "C. Komisi Yudisial (KY)",
      "D. Peradilan Militer"
    ],
    answer: "B. Peradilan Tata Usaha Negara (PTUN)"
  },
  {
    topic: "Penerapan Sila Kedua",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Membantu teman yang sedang kesulitan belajar dan berbagi bekal makanan tanpa membeda-bedakan suku atau agama merupakan pengamalan Pancasila terutama sila ke-....",
    options: [
      "A. Sila Pertama",
      "B. Sila Kedua (Kemanusiaan yang Adil dan Beradab)",
      "C. Sila Keempat",
      "D. Sila Kelima"
    ],
    answer: "B. Sila Kedua (Kemanusiaan yang Adil dan Beradab)"
  },
  {
    topic: "Penerapan Sila Keempat",
    difficulty: "Mudah",
    points: 50,
    timer: 30,
    prompt: "Tidak memaksakan kehendak kepada teman dan mengutamakan musyawarah mufakat saat memilih ketua kelas mencerminkan pengamalan Pancasila sila ke-....",
    options: [
      "A. Sila Pertama",
      "B. Sila Kedua",
      "C. Sila Ketiga",
      "D. Sila Keempat"
    ],
    answer: "D. Sila Keempat"
  },
  {
    topic: "Hubungan Pancasila dan UUD 1945",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Prof. Jimly Asshiddiqie mengibaratkan hubungan antara Pancasila dan UUD NRI Tahun 1945 yang tidak dapat dipisahkan seperti hubungan antara ....",
    options: [
      "A. Roh (nilai utama) dan Jasad (bentuk hukumnya)",
      "B. Langit dan Bumi yang saling berjauhan",
      "C. Guru dan Kepala Sekolah",
      "D. Peraturan Daerah dan Peraturan Desa"
    ],
    answer: "A. Roh (nilai utama) dan Jasad (bentuk hukumnya)"
  },
  {
    topic: "Tujuan Negara dalam Pembukaan UUD 1945",
    difficulty: "Sulit",
    points: 150,
    timer: 45,
    prompt: "Berikut ini yang BUKAN merupakan tujuan dibentuknya Pemerintah Negara Indonesia dalam Alinea Keempat Pembukaan UUD NRI Tahun 1945 adalah ....",
    options: [
      "A. Melindungi segenap bangsa Indonesia dan seluruh tumpah darah Indonesia",
      "B. Memajukan kesejahteraan umum dan mencerdaskan kehidupan bangsa",
      "C. Ikut melaksanakan ketertiban dunia berdasarkan kemerdekaan, perdamaian abadi, dan keadilan sosial",
      "D. Memberikan kebebasan mutlak tanpa aturan hukum kepada setiap individu"
    ],
    answer: "D. Memberikan kebebasan mutlak tanpa aturan hukum kepada setiap individu"
  }
];

export const INITIAL_15_TASKS: RawTaskItem[] = [
  {
    topic: "Tugas Simulasi Sekolah",
    difficulty: "Khusus",
    points: 150,
    timer: 75,
    prompt: "TUGAS KELOMPOK: Peragakan secara singkat (simulasi 1 menit) contoh situasi pelanggaran hak siswa di lingkungan sekolah, lalu tunjukkan bagaimana cara menegur dan menyelesaikannya secara santun!",
    answer: "Rubrik Penilaian: Peragaan jelas menunjukkan pelanggaran hak (misal: mengganggu teman belajar, merusak barang kelas, memotong antrean kantin) dan kelompok mendemonstrasikan penyelesaian santun serta adil (150 poin)."
  },
  {
    topic: "Tugas Kewajiban Siswa",
    difficulty: "Khusus",
    points: 100,
    timer: 45,
    prompt: "TUGAS KELOMPOK: Sebutkan secara bergantian oleh anggota kelompokmu 5 (lima) kewajiban peserta didik di sekolah beserta manfaatnya bagi kenyamanan bersama!",
    answer: "Rubrik Penilaian: Menyebutkan 5 kewajiban siswa di sekolah secara berurutan dan kompak dalam batas waktu (100 poin)."
  },
  {
    topic: "Tugas Solusi Diskriminasi",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Di sebuah sekolah terdapat siswa baru dari daerah terpencil yang dikucilkan karena logat bicaranya berbeda. Berikan 3 (tiga) solusi nyata yang harus dilakukan pengurus kelas!",
    answer: "Rubrik Penilaian: Menyampaikan 3 solusi konkret yang menjunjung nilai toleransi Bhinneka Tunggal Ika dan menolak perundungan (150 poin)."
  },
  {
    topic: "Tugas Simulasi Musyawarah",
    difficulty: "Khusus",
    points: 200,
    timer: 90,
    prompt: "TUGAS KELOMPOK: Peragakan musyawarah kelompok (maksimal 90 detik) untuk menyelesaikan perbedaan pendapat tentang pembagian tugas piket kelas agar adil bagi semua anggota!",
    answer: "Rubrik Penilaian: Seluruh anggota kelompok berpartisipasi aktif, saling menghargai pendapat tanpa memaksakan kehendak, dan mencapai mufakat adil (200 poin)."
  },
  {
    topic: "Tugas Analisis Hubungan Hak & Kewajiban",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Jelaskan hubungan timbal balik antara hak dan kewajiban warga negara dengan menggunakan 1 (satu) contoh nyata di lingkungan keluarga atau masyarakat!",
    answer: "Rubrik Penilaian: Penjelasan logis dan sistematis bahwa hak dan kewajiban tidak dapat dipisahkan disertai contoh nyata yang relevan (150 poin)."
  },
  {
    topic: "Tugas Kreatif Slogan",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Buatlah satu slogan yang kreatif, berima, dan penuh semangat tentang 'Pentingnya Menghormati Hak Orang Lain dan Menolak Perundungan (Bullying)', lalu deklarasikan bersama-sama!",
    answer: "Rubrik Penilaian: Slogan berima, sarat makna pengamalan Pancasila, dan dideklarasikan secara lantang serta kompak oleh seluruh anggota kelompok (150 poin)."
  },
  {
    topic: "Tugas Mengatasi Pengabaian Kewajiban",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Sebutkan 3 (tiga) cara efektif untuk mengatasi perilaku warga yang sering mengabaikan kewajiban menaati aturan lalu lintas atau membuang sampah sembarangan!",
    answer: "Rubrik Penilaian: Menyebutkan 3 solusi logis (peningkatan kesadaran/edukasi moral, keteladanan lingkungan, penyediaan fasilitas memadai, dan ketegasan sanksi hukum) (150 poin)."
  },
  {
    topic: "Tugas Studi Kasus Perundungan Siber",
    difficulty: "Khusus",
    points: 200,
    timer: 75,
    prompt: "TUGAS KELOMPOK: Analisis kasus perundungan di grup media sosial kelas (cyberbullying) dan usulkan langkah penyelesaian yang adil bagi korban, pelaku, serta warga kelas!",
    answer: "Rubrik Penilaian: Langkah penyelesaian mencakup pendampingan korban, edukasi/pembinaan pelaku, mediasi wali kelas/BK, dan penetapan etika digital kelas (200 poin)."
  },
  {
    topic: "Tugas Penerapan Sila Pancasila",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Pilihlah dua sila Pancasila, lalu berikan masing-masing 1 contoh nyata penerapannya dalam melindungi hak warga negara di Indonesia!",
    answer: "Rubrik Penilaian: Menyebutkan 2 sila dengan tepat beserta contoh nyata perlindungan hak yang aplikatif dalam kehidupan sehari-hari (150 poin)."
  },
  {
    topic: "Tugas Kalimat Ajakan",
    difficulty: "Khusus",
    points: 100,
    timer: 45,
    prompt: "TUGAS KELOMPOK: Buatlah satu kalimat ajakan (kampanye singkat) untuk mengajak pelajar SMP menaati tata tertib sekolah dan merawat fasilitas kelas!",
    answer: "Rubrik Penilaian: Kalimat persuasif, santun, jelas, dan menggugah rasa tanggung jawab bersama (100 poin)."
  },
  {
    topic: "Tugas Tanggung Jawab Warga Negara",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Sebutkan 3 (tiga) tindakan nyata yang mencerminkan sikap tanggung jawab seorang pelajar sebagai warga negara yang baik di era keterbukaan informasi!",
    answer: "Rubrik Penilaian: 3 tindakan mencakup saring sebelum sharing (anti-hoaks), etika kesopanan digital, belajar tekun, dan menjaga keutuhan persatuan bangsa (150 poin)."
  },
  {
    topic: "Tugas Solusi Ketidakadilan",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Berikan 1 (satu) contoh kasus ketidakadilan yang sering terjadi di sekitar remaja, lalu jelaskan cara memperbaikinya agar sesuai dengan sila kelima Pancasila!",
    answer: "Rubrik Penilaian: Contoh kontekstual remaja (pilih kasih pertemanan, diskriminasi tugas) dan solusi berkeadilan sosial (150 poin)."
  },
  {
    topic: "Tugas Simulasi Laporan Warga",
    difficulty: "Khusus",
    points: 200,
    timer: 75,
    prompt: "TUGAS KELOMPOK: Lakukan simulasi perwakilan warga yang menyampaikan aspirasi secara santun kepada Kepala Sekolah mengenai usulan perbaikan fasilitas perpustakaan atau toilet sekolah!",
    answer: "Rubrik Penilaian: Simulasi menggunakan bahasa santun, argumen berbasis fakta kebutuhan bersama, dan menghormati etika menyampaikan pendapat di muka umum (200 poin)."
  },
  {
    topic: "Tugas Analisis Dampak",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Jelaskan minimal 3 (tiga) dampak buruk yang akan terjadi pada bangsa Indonesia apabila warga negaranya hanya menuntut hak tanpa mau melaksanakan kewajiban!",
    answer: "Rubrik Penilaian: Menjelaskan 3 dampak (terganggunya ketertiban hukum, kemacetan pembangunan fasilitas publik, timbulnya konflik kecemburuan sosial) (150 poin)."
  },
  {
    topic: "Tugas Kesimpulan Keseimbangan",
    difficulty: "Khusus",
    points: 150,
    timer: 60,
    prompt: "TUGAS KELOMPOK: Buatlah kesimpulan singkat dalam 3–4 kalimat tentang pentingnya keseimbangan antara hak, kewajiban, dan tanggung jawab sebagai Pelajar Pancasila!",
    answer: "Rubrik Penilaian: Kesimpulan padat, runtut, dan merefleksikan esensi nilai Ketuhanan, Kemanusiaan, Persatuan, Musyawarah, dan Keadilan Sosial (150 poin)."
  }
];

export const INITIAL_10_SURPRISES: RawSpecialItem[] = [
  {
    effectCode: "BONUS_50",
    topic: "Kotak Kejutan Poin",
    difficulty: "Khusus",
    points: 50,
    timer: 15,
    prompt: "🎁 KEJUTAN APRESIASI WARGA TELADAN! Kelompokmu dinilai disiplin menjaga ketertiban kelas. Dapatkan BONUS +50 POIN langsung!",
    answer: "Klik 'Gunakan Bonus' untuk menambahkan +50 poin ke kelompok yang sedang bermain."
  },
  {
    effectCode: "BONUS_100",
    topic: "Kotak Kejutan Poin",
    difficulty: "Khusus",
    points: 100,
    timer: 15,
    prompt: "🌟 KEJUTAN DUTA PANCASILA! Kelompokmu aktif bergotong royong dan menghargai sesama. Dapatkan BONUS +100 POIN!",
    answer: "Klik 'Gunakan Bonus' untuk menambahkan +100 poin ke kelompok yang sedang bermain."
  },
  {
    effectCode: "BONUS_150",
    topic: "Kotak Kejutan Jackpot",
    difficulty: "Khusus",
    points: 150,
    timer: 15,
    prompt: "👑 JACKPOT KEJUTAN KONSTITUSI! Kelompokmu menemukan Kotak Emas Pelopor Keadilan Sosial. Raih BONUS +150 POIN!",
    answer: "Klik 'Gunakan Bonus' untuk menambahkan +150 poin ke kelompok yang sedang bermain."
  },
  {
    effectCode: "EXTRA_TURN",
    topic: "Kejutan Giliran Tambahan",
    difficulty: "Khusus",
    points: 50,
    timer: 20,
    prompt: "🎯 KESEMPATAN EMAS! Kelompokmu memperoleh bonus +50 Poin DAN berhak memilih 1 (satu) kotak tambahan lagi setelah giliran ini!",
    answer: "Kelompok mendapatkan +50 poin dan giliran tidak berpindah ke kelompok lain (main 1 kali lagi)."
  },
  {
    effectCode: "STEAL_POINTS",
    topic: "Kejutan Curi Poin",
    difficulty: "Khusus",
    points: 50,
    timer: 25,
    prompt: "⚡ KESEMPATAN MENCURI POIN! Kelompokmu berhak mengambil 50 poin dari salah satu kelompok lawan pilihanmu (atau +50 poin dari bank jika lawan memiliki perisai/skor 0)!",
    answer: "Pilih kelompok target pada panel di atas lalu klik 'Gunakan Bonus' untuk memindahkan 50 poin."
  },
  {
    effectCode: "BUZZER_CHALLENGE",
    topic: "Kejutan Tantangan Rebutan",
    difficulty: "Khusus",
    points: 100,
    timer: 30,
    prompt: "🔔 TANTANGAN REBUTAN SEMUA KELOMPOK (100 Poin): Siapa cepat angkat tangan! Sebutkan bunyi Sila Kelima Pancasila dan 1 contoh perwujudannya di sekolah!",
    answer: "Keadilan sosial bagi seluruh rakyat Indonesia (Contoh: pembagian piket adil, tidak pilih kasih dalam berteman). Pilih kelompok pemenang rebutan!"
  },
  {
    effectCode: "EXTRA_TIME_DISCUSS",
    topic: "Kejutan Diskusi Tambahan",
    difficulty: "Khusus",
    points: 75,
    timer: 20,
    prompt: "⏳ KEJUTAN WAKTU DISKUSI & BONUS! Kelompokmu mendapat +75 Poin dan Kartu Tambahan Waktu (+30 detik) untuk pertanyaan berikutnya!",
    answer: "Klik 'Gunakan Bonus' untuk klaim +75 poin dan bonus waktu diskusi."
  },
  {
    effectCode: "TRUE_FALSE_CHALLENGE",
    topic: "Tantangan Cepat Benar / Salah",
    difficulty: "Khusus",
    points: 100,
    timer: 20,
    prompt: "✅❌ TANTANGAN BENAR ATAU SALAH (100 Poin): 'Menurut UU No. 9 Tahun 1998, warga negara bebas melakukan demonstrasi di dalam rumah sakit dan tempat ibadah pada malam hari.' BENAR atau SALAH? Jelaskan alasannya!",
    answer: "SALAH! Rumah sakit, tempat ibadah, istana kepresidenan, instalasi militer, dan waktu malam hari/hari besar nasional dilarang keras untuk unjuk rasa demi melindungi ketertiban umum."
  },
  {
    effectCode: "DOUBLE_NEXT",
    topic: "Kejutan Pengganda Poin",
    difficulty: "Khusus",
    points: 0,
    timer: 20,
    prompt: "🔥 KARTU PENGGANDA POIN (2x LIPAT)! Pada giliran pertanyaan/tugas berikutnya, poin yang diperoleh kelompokmu akan DIGANDAKAN 2x LIPAT!",
    answer: "Klik 'Gunakan Bonus' untuk mengaktifkan status 2x Poin pada kelompok ini."
  },
  {
    effectCode: "TEACHER_MYSTERY",
    topic: "Bonus Kejutan Moderator",
    difficulty: "Khusus",
    points: 100,
    timer: 25,
    prompt: "🎓 BONUS KEJUTAN KHUSUS GURU! Guru berhak memberikan poin apresiasi khusus (+50 s.d. +150 poin) berdasarkan kekompakan dan sikap sopan kelompokmu selama pembelajaran!",
    answer: "Pilih nominal poin apresiasi guru pada panel khusus lalu klik 'Gunakan Bonus'."
  }
];

export const INITIAL_5_STRATEGIES: RawSpecialItem[] = [
  {
    effectCode: "ASSIGN_OTHER_TEAM",
    topic: "Strategi Tunjuk Lawan",
    difficulty: "Khusus",
    points: 100,
    timer: 40,
    prompt: "♟️ STRATEGI TUNJUK KELOMPOK LAIN (100 Poin): Pilih 1 kelompok lain untuk menjawab soal ini: 'Undang-Undang yang mengatur tentang Kepolisian Negara Republik Indonesia adalah .... (A. UU No. 9 Tahun 1998 | B. UU No. 39 Tahun 1999 | C. UU No. 2 Tahun 2002 | D. UU No. 14 Tahun 2008)'. Jika mereka benar, mereka dapat +100 poin; jika salah, kelompokmu yang dapat +100 poin!",
    answer: "Kunci Jawaban: C. UU No. 2 Tahun 2002. Tentukan kelompok target dan catat hasilnya!"
  },
  {
    effectCode: "SWAP_TURN",
    topic: "Strategi Tukar Giliran",
    difficulty: "Khusus",
    points: 75,
    timer: 20,
    prompt: "🔄 STRATEGI TUKAR KESEMPATAN & BONUS! Kelompokmu mendapat +75 Poin strategi dan dapat memilih kelompok mana yang akan bermain pada giliran berikutnya!",
    answer: "Pilih kelompok yang akan diberi giliran berikutnya, lalu klik 'Gunakan Bonus'."
  },
  {
    effectCode: "DOUBLE_INSTANT",
    topic: "Strategi Poin Ganda Seketika",
    difficulty: "Khusus",
    points: 200,
    timer: 40,
    prompt: "⚡ STRATEGI POIN GANDA SEKETIKA (200 Poin!): Jawab pertanyaan ini dengan benar untuk meraih 2x lipat poin (200 Poin): 'Selisih persentase antara responden yang menganggap upaya pemerintah memenuhi hak ABK sudah memadai (28,9%) dengan yang menganggap belum mengakomodasi (29,9%) menurut Litbang Kompas adalah .... (A. 1,0% | B. 5,4% | C. 10,0% | D. 15,2%)'",
    answer: "Kunci Jawaban: A. 1,0% (29,9% dikurangi 28,9% = 1,0%)."
  },
  {
    effectCode: "STEAL_OPPORTUNITY",
    topic: "Strategi Ambil Kesempatan",
    difficulty: "Khusus",
    points: 75,
    timer: 20,
    prompt: "🦅 STRATEGI HAK REBUT JAWABAN! Kelompokmu memperoleh +75 Poin dan berhak menjadi penjawab pertama apabila ada kelompok lain yang salah menjawab pada giliran berikutnya!",
    answer: "Klik 'Gunakan Bonus' untuk menambahkan +75 poin dan mengaktifkan hak rebut kesempatan."
  },
  {
    effectCode: "SHIELD_IMMUNITY",
    topic: "Strategi Perisai Kekebalan",
    difficulty: "Khusus",
    points: 50,
    timer: 20,
    prompt: "🛡️ PERISAI KEKEBALAN POIN! Kelompokmu mendapatkan +50 Poin serta 1 Perisai Bebas Pengurangan Poin (dan terlindung dari pencurian poin lawan)!",
    answer: "Klik 'Gunakan Bonus' untuk mengaktifkan Perisai Bebas Pengurangan Poin bagi kelompok ini."
  }
];

export function buildDefault100Boxes(): MysteryBox[] {
  const rawList: {
    type: 'QUESTION' | 'TASK' | 'SURPRISE' | 'STRATEGY';
    topic: string;
    difficulty: BoxDifficulty;
    points: number;
    timer: number;
    prompt: string;
    options: string[] | null;
    answer: string;
    effectCode: string | null;
  }[] = [];

  INITIAL_70_QUESTIONS.forEach(item => {
    rawList.push({
      type: "QUESTION",
      topic: item.topic,
      difficulty: item.difficulty,
      points: item.points,
      timer: item.timer,
      prompt: item.prompt,
      options: item.options,
      answer: item.answer,
      effectCode: null
    });
  });

  INITIAL_15_TASKS.forEach(item => {
    rawList.push({
      type: "TASK",
      topic: item.topic,
      difficulty: item.difficulty,
      points: item.points,
      timer: item.timer,
      prompt: item.prompt,
      options: null,
      answer: item.answer,
      effectCode: null
    });
  });

  INITIAL_10_SURPRISES.forEach(item => {
    rawList.push({
      type: "SURPRISE",
      topic: item.topic,
      difficulty: item.difficulty,
      points: item.points,
      timer: item.timer,
      prompt: item.prompt,
      options: null,
      answer: item.answer,
      effectCode: item.effectCode
    });
  });

  INITIAL_5_STRATEGIES.forEach(item => {
    rawList.push({
      type: "STRATEGY",
      topic: item.topic,
      difficulty: item.difficulty,
      points: item.points,
      timer: item.timer,
      prompt: item.prompt,
      options: null,
      answer: item.answer,
      effectCode: item.effectCode
    });
  });

  // Coprime step 37 mod 100 for an even and balanced distribution across all 100 boxes
  const total = rawList.length; // 100
  const seededOrder: typeof rawList = [];
  for (let i = 0; i < total; i++) {
    const idx = (i * 37 + 13) % total;
    seededOrder.push(rawList[idx]);
  }

  return seededOrder.map((item, index) => ({
    number: index + 1,
    type: item.type,
    topic: item.topic,
    difficulty: item.difficulty,
    points: item.points,
    timer: item.timer,
    prompt: item.prompt,
    options: item.options,
    answer: item.answer,
    effectCode: item.effectCode,
    opened: false,
    openedByTeamId: null,
    taskFormat: "Lisan"
  }));
}
