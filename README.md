# Website RPL 1 SMK Negeri 5 Kendal

Website statis interaktif untuk memperkenalkan kelas Rekayasa Perangkat Lunak 1 SMK Negeri 5 Kendal, menampilkan profil wali kelas dan siswa, dokumentasi kegiatan, serta kanal komunikasi langsung dengan pengunjung.

- **Produksi**: https://rpl1-026.github.io/Website-RPL1-Skema-/
- **Repository**: kloning lokal dari arsip GitHub Classroom RPL 1

## Ringkasan Proyek
- Berbasis HTML, CSS, dan JavaScript murni dengan pola komponen sederhana.
- Menggunakan Firebase Firestore sebagai backend serverless untuk fitur chat real-time.
- Menonjolkan estetika gelap bertema galaksi dengan glassmorphism, animasi halus, serta optimasi penggunaan warna primer `#0db9d7`.
- Seluruh halaman berbagi _navbar_ dan _footer_ konsisten melalui reuse stylesheet `style.css` dan skrip utilitas `js/script.js`.

## Detail Fitur
- **Navigasi Responsif**
  - _Navbar_ kaca transparan dengan efek blur (`backdrop-filter`) dan highlight tautan aktif otomatis (`js/script.js` baris 33–42).
  - Mode hamburger diaktifkan pada lebar layar sempit, menampilkan menu geser dengan transisi halus.
  - Ikon sosial TikTok dan Instagram dengan _hover state_ kustom (`style.css` baris 54–78).

- **Beranda (`index.html`)**
  - Hero section adaptif dengan judul dinamis dan ilustrasi kelas (`Aset/Home.png`).
  - Tombol `Dapatkan Motivasi!` memunculkan _popup_ motivasi yang memanfaatkan overlay gelap dan tombol tutup (`showQuote()` & `closePopup()`).
  - Ikon chat melayang muncul di seluruh halaman, dianimasikan dengan keyframes `bounce-in-top`, menjaga visibilitas tanpa mengganggu konten.

- **Tentang Kami (`aboute.html`)**
  - Narasi lengkap mengenai profil kelas, jumlah siswa, hingga peran wali kelas.
  - Foto kelas resolusi tinggi dari Google Photos serta _embed_ Google Maps interaktif untuk lokasi sekolah (`iframe` dengan `loading="lazy"`).
  - Menggandeng ulang komponen chat untuk konsistensi pengalaman pengguna lintas halaman.

- **Wali & Siswa (`walisiswa.html`)**
  - Kartu wali kelas dan 36 siswa dengan foto profil, biodata, serta tautan personal (Instagram, TikTok, Google Photos).
  - Klik kartu men-trigger fungsi `toggleDetails` yang mengatur visibilitas detail tanpa _page refresh_.
  - Struktur DOM disiapkan untuk modal detail (`#details-modal`) sebagai peningkatan di masa depan.
  - Penamaan kelas CSS memanfaatkan `card`, `profile-pic`, `details` untuk memudahkan styling grid responsif.

- **Galeri Kelas (`gallery.html`)**
  - Ratusan dokumentasi kegiatan dipetakan per bulan (`.month-title`) agar mudah dinavigasi.
  - Klik foto membuka modal layar penuh dengan tombol `prev/next`, dukungan tombol keyboard (`ArrowLeft/Right`, `Esc`), serta navigasi sirkular (`openModal()`).
  - Modal memanfaatkan satu elemen `#imageModal` sehingga ringan meskipun jumlah gambar besar.

- **Chat Real-time**
  - Komponen chat dibangun menggunakan Firebase App & Firestore SDK modular (`js/scripts.js`).
  - Pesan tersimpan pada koleksi `chats` dengan field `name`, `message`, `timestamp`.
  - `onSnapshot` memantau perubahan secara live, memformat waktu menggunakan `date-fns` (`format(date, 'dd MMM yyyy HH:mm')`).
  - Validasi sederhana memastikan nama & pesan tidak kosong dan memberi notifikasi ketika input belum lengkap.
  - UI chat terdiri dari `chat-icon`, `chat-popup`, dan `chat-container` dengan tampilan kaca, scrollbar kustom, serta status tersembunyi otomatis ketika area luar diklik.

- **Pengalaman Pengguna & Aksesibilitas**
  - Palet warna berkontras tinggi antara latar gelap dan teks terang untuk keterbacaan.
  - Semua gambar memiliki atribut `alt`, meningkatkan aksesibilitas dan SEO.
  - Layout responsive melalui flexbox dan media query untuk tablet & smartphone (`style.css` bagian `@media`).

## Teknologi & Dependensi
- **Frontend**: HTML5, CSS3 (flexbox, grid, custom properties), JavaScript ES6.
- **UI Libraries**: Google Fonts (Poppins), Ionicons 5.5, animasi CSS kustom.
- **Backend**: Firebase Firestore (client-side SDK 10.14.0).
- **Utilitas**: `date-fns` v2.28 untuk format tanggal.
- **Aset**: Kumpulan foto dan icon internal pada folder `Aset/` dan `favicon_io/`.

## Struktur Direktori
```
Website-RPL1-Skema--main/
├── index.html             # Laman utama
├── aboute.html            # Profil kelas dan lokasi sekolah
├── walisiswa.html         # Data wali kelas & siswa
├── gallery.html           # Arsip foto kegiatan kelas
├── style.css              # Styling global dan responsif
├── js/
│   ├── script.js          # Navigasi, popup motivasi, gallery modal, toggle kartu
│   └── scripts.js         # Integrasi Firebase, logika chat real-time
├── Aset/                  # Gambar dan ilustrasi lokal
├── favicon_io/            # Berkas favicon & manifest
└── README.md
```

## Menjalankan Secara Lokal
1. Kloning atau ekstrak repositori ini.
2. Buka berkas `index.html` menggunakan peramban modern (Chrome, Edge, Firefox).
3. Untuk pengalaman terbaik gunakan ekstensi seperti Live Server atau jalankan server statis:
   ```bash
   # Contoh menggunakan Python
   python -m http.server 8000
   ```
   Lalu akses `http://localhost:8000`.
4. Pastikan koneksi internet aktif agar Firebase, Google Fonts, Ionicons, dan gambar Google Photos dapat dimuat.

## Konfigurasi Chat & Firebase
- Konfigurasi default menggunakan proyek Firebase publik `rplsatu026-4f987`.
- Untuk menggunakan proyek Firebase lain:
  1. Buat project di [Firebase Console](https://console.firebase.google.com/) dan aktifkan Firestore.
  2. Salin konfigurasi web app baru dan gantikan objek `firebaseConfig` pada `js/scripts.js`.
  3. Pastikan aturan keamanan Firestore disesuaikan (misal, menambahkan autentikasi atau validasi tambahan).

## Pengembang
- [Brillian Yusuf Sejati](https://github.com/bys2007) — Membuat rancangan website dan UI/UX galeri serta sistem backend (Firebase).
- [Dimar Nur Arifin](https://github.com/dim-na) — Pembuat kerangka awal termasuk responsivitas dan desain kartu profil.
- [Nur Alif Arga Prastia](https://github.com/arga998) — Pengelola database (Google Drive & Photos).

## Status & Rencana Lanjut
- ✅ Versi saat ini: rilis statis dengan integrasi chat real-time.
- 🔄 Rencana pengembangan (usulan):
  1. Menambahkan autentikasi dasar untuk chat (mis. token kelas).
  2. Mengoptimalkan pemuatan galeri dengan _lazy loading_ tambahan.
  3. Memecah CSS menjadi modul per halaman untuk maintainability.

## Lisensi
Lisensi belum ditentukan. Harap hubungi tim pengembang sebelum menggunakan aset atau kode di luar kepentingan pembelajaran.
