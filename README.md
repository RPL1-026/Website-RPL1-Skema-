# Website RPL 1 SMK Negeri 5 Kendal

Website statis interaktif untuk memperkenalkan kelas Rekayasa Perangkat Lunak 1 SMK Negeri 5 Kendal, menampilkan profil wali kelas dan siswa, dokumentasi kegiatan, serta kanal komunikasi langsung dengan pengunjung.

- **Produksi**: https://rpl1-026.github.io/Website-RPL1-Skema-/
- **Repository**: kloning lokal dari arsip GitHub Classroom RPL 1

## Ringkasan Proyek
- Berbasis HTML, CSS, dan JavaScript ES6 modular dengan pola komponen mandiri.
- Menggunakan Firebase Firestore sebagai backend serverless untuk fitur chat real-time dan Firebase Auth untuk login Google.
- Menonjolkan estetika gelap bertema galaksi dengan glassmorphism, animasi cerdas, kustomisasi kursor, serta optimasi warna sekunder dan premier.
- Seluruh halaman berbagi _navbar_ dan _footer_ konsisten melalui stylesheet `style.css` dengan logo baru berbasis gambar, yang menggantikan teks konvensional.

## Detail Fitur

- **Navigasi & Interaksi Visual Responsif**
  - _Navbar_ kaca transparan dengan efek blur (`backdrop-filter`) dan logo berbasis grafis webp yang menyusut presisi di seluruh layar.
  - Mode hamburger diaktifkan pada lebar layar sempit, menampilkan menu geser dengan transisi halus.
  - **Kursor Pena Kustom (Intelligent Cursor)**: Kursor mendeteksi elemen secara dinamis (berubah menjadi i-beam bersinar pada teks, ikon panah 4 arah pada model 3D, membesar ketika mengklik, dan memancarkan kilau emas saat di atas tombol interaktif) via `js/cursor.js`.

- **Beranda (`index.html`)**
  - Hero section dengan hitung mundur kelulusan (`js/countdown.js`), dihiasi oleh animasi teks bergantian menggunakan Typed.js yang mengambil kutipan nostalgia dari `js/config.js`.
  - **Model 3D Topi Kelulusan**: Interaksi 3D langsung di halaman beranda yang ditenagai oleh _Three.js_ (`js/graduation3d.js`). Pengunjung dapat memutar, memperbesar, dan bermain dengan topi kelulusan.
  - Efek partikel bertema bintang-bintang ruang angkasa yang tampil otomatis.

- **Tentang Kami (`aboute.html`)**
  - Narasi mendalam mengenai sejarah kelas Angkatan 17, jumlah siswa, hingga memori berharga tentang almarhumah sahabat kami, diakhiri dengan linimasa kelulusan.
  - **Slideshow Nostalgia**: Sistem carousel mulus (fade in-out 1.5 detik) yang mengambil koleksi foto berkualitas HD (1920x1080) secara otomatis dari `Fotbar.txt`, menggunakan _Image Preloading_ agar tidak terjadi lagging gambar.
  - _Embed_ Google Maps interaktif untuk lokasi sekolah.

- **Wali & Siswa (`walisiswa.html`)**
  - Kartu wali kelas dan 36 siswa dirender secara dinamis melalui data JSON (`data/students.json` via `js/renderStudents.js`), lengkap dengan foto profil, biodata, serta tautan personal (Instagram, TikTok).
  - Modal detail interaktif untuk menampilkan profil siswa secara penuh tanpa _page refresh_.

- **Galeri Kelas (`gallery.html`)**
  - Ratusan dokumentasi kegiatan dipetakan per bulan (`.month-title`) agar mudah dinavigasi.
  - Klik foto membuka modal layar penuh dengan dukungan lightbox.

- **Chat Real-time dengan Autentikasi**
  - Komponen chat dibangun menggunakan Firebase App, Firestore, & Auth (`js/scripts.js` dan `js/config.js`).
  - **Autentikasi Google**: Hanya pengguna yang login menggunakan Google Account yang dapat mengirim pesan. Identitas (Nama dan Foto Profil) disematkan otomatis ke setiap pesan.
  - **Hak Akses Admin**: Administrator dapat menghapus pesan spesifik tanpa perlu memuat ulang halaman.
  - **Auto-scroll Cerdas**: Jendela percakapan akan _scroll_ otomatis saat pesan baru tiba, tetapi akan menahan posisi (tetap diam) saat pengguna sedang melihat riwayat obrolan masa lalu (scroll di tengah).
  - Tampilan UI bubble chat modern (seperti WhatsApp) dengan pemisahan warna kuning untuk pesan sendiri dan warna toska untuk pesan orang lain.

## Teknologi & Dependensi
- **Frontend**: HTML5, CSS3, JavaScript ES6 (Modular).
- **UI & 3D Libraries**: Three.js, Typed.js, Google Fonts (Poppins), Ionicons 5.5.
- **Backend & Auth**: Firebase Firestore & Firebase Auth (SDK 10.14.0).
- **Aset**: Kumpulan foto HD dari Google Photos API, _Model GLB (Aset/graduation_hat.glb)_, dan logo SVG/WebP.

## Struktur Direktori
```text
Website-RPL1-Skema--main/
├── index.html             # Laman utama & Integrasi 3D
├── aboute.html            # Profil, cerita angkatan, & Slideshow
├── walisiswa.html         # Data wali kelas & siswa (Dynamic Rendering)
├── gallery.html           # Arsip foto kegiatan kelas
├── style.css              # Styling global, glassmorphism, & responsif
├── Fotbar.txt             # Basis data URL Foto Slideshow
├── js/
│   ├── animations.js      # Animasi elemen DOM (scroll reveal, parallax)
│   ├── config.js          # Konfigurasi Firebase, Kunci Admin, dan kutipan teks
│   ├── countdown.js       # Penghitung mundur kelulusan
│   ├── cursor.js          # Kursor kustom dan state deteksi hover
│   ├── effects.js         # Efek partikel & canvas
│   ├── graduation3d.js    # Konfigurasi dan controller Three.js
│   ├── renderStudents.js  # Generator profil dari data JSON
│   ├── script.js          # Navigasi, popup motivasi, gallery modal
│   └── scripts.js         # Inti Firebase (Auth, Chat Firestore, Logika DOM Chat)
├── data/                  # Berkas penyimpanan JSON
├── Aset/                  # Gambar, Logo, dan 3D Models (.glb) lokal
└── README.md              # Dokumentasi ini
```

## Menjalankan Secara Lokal
1. Kloning atau ekstrak repositori ini.
2. Karena menggunakan fitur ES6 Module (`import/export`) dan Fetch API, website **tidak bisa** berjalan sempurna dengan sistem double-klik langsung pada file `index.html`.
3. Anda **wajib** menggunakan server lokal. Contoh menggunakan _Live Server_ (VS Code) atau Python:
   ```bash
   python -m http.server 8000
   ```
   Lalu akses `http://localhost:8000`.
4. Pastikan koneksi internet aktif agar modul eksternal Firebase, Three.js, dan CDN Google Photos dapat dimuat.

## Pengembang
- [Brillian Yusuf Sejati](https://github.com/bys2007) — Architect UI/UX, integrasi Backend (Firebase & Auth), Interaksi 3D, Custom Kursor, dan DOM logic.
- [Dimar Nur Arifin](https://github.com/dim-na) — Pembuat kerangka awal, responsivitas, dan struktur database profil.
- [Nur Alif Arga Prastia](https://github.com/arga998) — Pengelola media dan basis data tautan dinamis.

## Lisensi
Hak cipta milik Kelas RPL 1 Angkatan 17 SMK Negeri 5 Kendal. Harap hubungi tim pengembang sebelum menggunakan aset atau kode untuk kepentingan di luar sekolah.
