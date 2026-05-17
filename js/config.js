// ============================================
// RPL1 Global Configuration
// ============================================

export const CONFIG = {
  // Tanggal kelulusan: Senin, 4 Mei 2026
  GRADUATION_DATE: new Date('2026-05-04T00:00:00+07:00'),

  // Durasi confetti setelah kelulusan (hari)
  CONFETTI_DURATION_DAYS: 30,

  // Firebase config
  FIREBASE: {
    apiKey: "AIzaSyAqxuye8G2GWgyrNWAwZZg6gz_XM0TlZEQ",
    authDomain: "rplsatu026-4f987.firebaseapp.com",
    projectId: "rplsatu026-4f987",
    storageBucket: "rplsatu026-4f987.appspot.com",
    messagingSenderId: "523064373703",
    appId: "1:523064373703:web:0c78d01dd1cac0faa9a9e2",
    measurementId: "G-BQHJZMNSN8"
  },

  // Kata-kata untuk Typed.js
  TYPED_QUOTES: [
    '"Katanya cinta itu bagaikan mimpi. Seiring berjalannya mimpi, pasti nanti akan terbangun sendiri. Kalau dipaksa bangun, pasti sulit untuk bermimpi kembali." — bys',
    '"Bagian terbaik dari sebuah foto adalah: meski orang-orang di dalamnya berubah, kenangan yang tersimpan tak pernah ikut berubah." — Arthur by fy',
    '"Kita pernah menjadi bagian dari satu semesta yang sama, menghuni ruang-ruang yang kini pelan-pelan mulai terasa asing. Terima kasih, karena kalian sudah sudi menjadi saksi bisu dari setiap proses tumbuhku yang tak selalu mudah." — nala',
    '"Terimakasih Teman teman XII RPL 1, Tetapp semangat sukses terusss" — Faris',
    '"lovyu allways" — lop',
    '"setiap pertemuan pasti ada perpisahan." — dim.na'
  ],

  // Rekapan nilai link
  REKAPAN_URL: 'https://rpl1-026.github.io/rekapan-pembelajaran-rpl1-17/',

  // Nostalgia filter values (setelah kelulusan)
  NOSTALGIA_FILTER: 'sepia(0.15) grayscale(0.1) brightness(0.95)',

  // UID akun yang berhak menghapus semua pesan (admin)
  // Cara cek UID: login ke website lalu buka DevTools → Console →
  // ketik: firebase.auth().currentUser.uid  (atau lihat di output console saat login)
  ADMIN_UIDS: [
    '3of2spuNRxWMFXHiesuN0ghwiAI2'
  ]
};

// Helper: cek apakah sudah lewat kelulusan
export function isPostGraduation() {
  return new Date() >= CONFIG.GRADUATION_DATE;
}

// Helper: hitung hari sejak kelulusan
export function daysSinceGraduation() {
  const now = new Date();
  const diff = now - CONFIG.GRADUATION_DATE;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Helper: apakah masih dalam periode confetti
export function isConfettiPeriod() {
  return isPostGraduation() && daysSinceGraduation() <= CONFIG.CONFETTI_DURATION_DAYS;
}

// Helper: apakah sudah masuk periode particles (setelah confetti)
export function isParticlesPeriod() {
  return isPostGraduation() && daysSinceGraduation() > CONFIG.CONFETTI_DURATION_DAYS;
}
