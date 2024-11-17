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

// Button Motivation
const quotes = [
  "Motivasi adalah ilusi sesaat yang datang dan pergi, tetapi hanya dengan disiplin, seseorang mampu melampaui batas dan menjadikan tujuan sebagai kenyataan.",
];

function showQuote() {
  const quoteText = document.getElementById("quoteText");
  const quotePopup = document.getElementById("quotePopup");

  quoteText.textContent = quotes[0];
  quotePopup.classList.add("show");
}

function closePopup() {
  const quotePopup = document.getElementById("quotePopup");
  quotePopup.classList.remove("show");
}

// mark page
document.querySelectorAll('.navbar .navbar-nav a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});


// JavaScript untuk toggle details 
        function toggleDetails(card) {
            const details = card.querySelector('.details');
            const isVisible = details.style.display === 'block';
            document.querySelectorAll('.details').forEach(detail => detail.style.display = 'none');
            details.style.display = isVisible ? 'none' : 'block';
        }

// Dapatkan semua item gallery dan tambahkan event listener
var galleryItems = document.querySelectorAll(".gallery-item img");
var currentIndex = 0;
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("imgModal");
var captionText = document.getElementById("caption");

galleryItems.forEach(function(item, index) {
  item.addEventListener("click", function() {
    currentIndex = index; // Set index saat gambar diklik
    openModal(currentIndex);
  });
});

function openModal(index) {
  modal.style.display = "block";
  modalImg.src = galleryItems[index].src; // Set gambar modal dengan gambar yang diklik
  captionText.innerHTML = galleryItems[index].alt; // Set caption gambar
}

// Tombol close untuk menutup modal
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

// Tombol "Sebelumnya"
var prev = document.getElementsByClassName("prev")[0];
prev.onclick = function() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Pindah ke gambar sebelumnya
  openModal(currentIndex);
}

// Tombol "Selanjutnya"
var next = document.getElementsByClassName("next")[0];
next.onclick = function() {
  currentIndex = (currentIndex + 1) % galleryItems.length; // Pindah ke gambar selanjutnya
  openModal(currentIndex);
}

// Menutup modal jika user mengklik di luar gambar
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Event listener untuk keyboard navigation
document.addEventListener("keydown", function(event) {
  if (modal.style.display === "block") {
    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      // Navigasi ke kiri (gambar sebelumnya)
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      openModal(currentIndex);
    } else if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      // Navigasi ke kanan (gambar selanjutnya)
      currentIndex = (currentIndex + 1) % galleryItems.length;
      openModal(currentIndex);
    } else if (event.key === "Escape") {
      // Menutup modal saat tombol Escape ditekan
      modal.style.display = "none";
    }
  }
});
