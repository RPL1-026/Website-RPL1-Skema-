// toggle class active
const navbarNav = document.querySelector('.navbar-nav');

// hamburger menu di klik
document.querySelector('#hamburger-menu').onclick = () => {
  navbarNav.classList.toggle('active');
};

// klik diluar sidebar
const hamburger = document.querySelector('#hamburger-menu');
document.addEventListener('click', function(e) {
if(!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
  navbarNav.classList.remove('active');
}
});

// button motivation
const quotes = [
  "Jangan menyerah, kesulitan adalah bagian dari perjalanan menuju kesuksesan.",
  "Keberhasilan datang kepada mereka yang mau bekerja keras dan tidak pernah berhenti mencoba.",
  "Mimpi adalah awal dari segalanya, jadikan itu tujuanmu untuk meraih keberhasilan.",
  "Setiap hari adalah kesempatan baru untuk menjadi lebih baik dari hari kemarin.",
  "Percayalah pada dirimu sendiri, kamu lebih kuat dari yang kamu kira.",
  "Kesuksesan tidak diukur dari apa yang kamu miliki, tetapi dari seberapa besar usaha yang kamu lakukan.",
  "Jangan takut gagal, kegagalan adalah guru terbaik dalam hidup.",
  "Ketika satu pintu tertutup, pintu lain terbuka. Jangan berhenti mencari peluang.",
  "Keberanian adalah kunci untuk meraih apa yang kamu inginkan.",
  "Kesuksesan tidak datang dari zona nyaman, keluar dan tantang dirimu.",
  "Kerja keras hari ini adalah keberhasilan besok.",
  "Jadilah versi terbaik dari dirimu sendiri setiap hari.",
  "Kesempatan tidak datang dua kali, jadi jangan ragu untuk mengambilnya.",
  "Kegagalan adalah batu loncatan menuju keberhasilan.",
  "Hidup adalah perjalanan, nikmati setiap langkahnya.",
  "Sukses adalah hasil dari persiapan, kerja keras, dan belajar dari kegagalan.",
  "Keberhasilan besar berasal dari mimpi besar.",
  "Jangan biarkan kegagalan menghentikanmu, jadikan itu pelajaran untuk maju.",
  "Orang sukses adalah mereka yang mampu bangkit setelah jatuh.",
  "Setiap hari adalah kesempatan untuk memperbaiki dirimu.",
  "Kesuksesan adalah hasil dari tindakan nyata, bukan hanya impian.",
  "Jangan takut untuk bermimpi besar, karena mimpi adalah awal dari kenyataan.",
  "Jadilah perubahan yang kamu ingin lihat di dunia.",
  "Keberhasilan adalah perjalanan, bukan tujuan akhir.",
  "Kunci kesuksesan adalah kesabaran, ketekunan, dan konsistensi.",
  "Tidak ada yang tidak mungkin jika kamu percaya pada dirimu sendiri.",
  "Berani mengambil risiko adalah langkah pertama menuju kesuksesan.",
  "Semua impianmu bisa menjadi kenyataan jika kamu memiliki keberanian untuk mengejarnya.",
  "Kesuksesan tidak datang kepada mereka yang hanya menunggu, tetapi kepada mereka yang bekerja untuk itu.",
  "Setiap orang memiliki potensi untuk sukses, temukan potensimu dan kembangkan.",
  "Kesuksesan adalah tentang mengubah rintangan menjadi peluang.",
  "Jangan pernah meremehkan kekuatan dari usaha kecil yang konsisten.",
  "Hidup ini singkat, jangan habiskan untuk menyesal. Buat setiap detik berarti.",
  "Ketika kamu melakukan sesuatu dengan cinta, hasilnya akan luar biasa.",
  "Kamu adalah arsitek dari hidupmu sendiri, bangunlah sesuai impianmu.",
  "Jangan pernah berhenti belajar, karena hidup tidak pernah berhenti mengajarkan.",
  "Setiap langkah kecil membawamu lebih dekat ke tujuanmu.",
  "Impian yang besar memerlukan kerja keras yang besar pula.",
  "Tetap fokus pada tujuanmu, jangan biarkan gangguan menghalangimu.",
  "Kesuksesan tidak datang dengan sendirinya, kamu harus mengejarnya.",
  "Jangan biarkan rasa takut menghentikan langkahmu.",
  "Setiap hari adalah kesempatan untuk belajar sesuatu yang baru.",
  "Orang sukses adalah mereka yang mampu mengubah kegagalan menjadi pelajaran.",
  "Jangan pernah menyerah, karena kamu tidak pernah tahu seberapa dekatnya kamu dengan kesuksesan.",
  "Kesuksesan adalah milik mereka yang tidak pernah berhenti berusaha.",
  "Keberanian adalah kunci untuk meraih semua impianmu.",
  "Jangan biarkan kegagalan menghentikanmu, gunakan itu sebagai motivasi untuk bangkit.",
  "Kamu lebih kuat dari yang kamu pikirkan, jangan biarkan keraguan menghentikanmu.",
  "Setiap hari adalah kesempatan untuk menjadi lebih baik dari hari kemarin."
];


function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = document.getElementById("quoteText");
  const quotePopup = document.getElementById("quotePopup");

  quoteText.textContent = quotes[randomIndex];
  quotePopup.classList.add("show");
}

function closePopup() {
  const quotePopup = document.getElementById("quotePopup");
  quotePopup.classList.remove("show");
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteText = document.getElementById("quoteText");
  const quotePopup = document.getElementById("quotePopup");

  quoteText.textContent = quotes[randomIndex];
  quotePopup.classList.add("show");
}

function closePopup() {
  const quotePopup = document.getElementById("quotePopup");
  quotePopup.classList.remove("show");
}

// JavaScript untuk toggle details 
        function toggleDetails(card) {
            const details = card.querySelector('.details');
            const isVisible = details.style.display === 'block';
            document.querySelectorAll('.details').forEach(detail => detail.style.display = 'none');
            details.style.display = isVisible ? 'none' : 'block';
        }

// Dapatkan elemen modal
var modal = document.getElementById("imageModal");

// Dapatkan elemen modal gambar
var modalImg = document.getElementById("imgModal");
var captionText = document.getElementById("caption");

// Dapatkan semua item gallery dan tambahkan event listener
var galleryItems = document.querySelectorAll(".gallery-item img");
galleryItems.forEach(function(item) {
  item.addEventListener("click", function() {
    modal.style.display = "block";
    modalImg.src = this.src; // Set gambar modal dengan gambar yang diklik
    captionText.innerHTML = this.alt; // Set caption gambar
  });
});

// Dapatkan elemen span (close button) dan tambahkan event listener untuk menutup modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none"; // Sembunyikan modal saat tombol close diklik
}

// Menutup modal jika user mengklik di luar gambar
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none"; // Tutup modal saat area luar gambar diklik
  }
}