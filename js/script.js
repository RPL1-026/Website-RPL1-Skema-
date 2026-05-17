// ============================================
// Global Script — Navbar, Gallery, Toggle
// ============================================

// Toggle class active (hamburger menu)
const navbarNav = document.querySelector('.navbar-nav');
const hamburger = document.querySelector('#hamburger-menu');

if (hamburger) {
  hamburger.onclick = () => navbarNav.classList.toggle('active');
}

// Close sidebar on outside click
document.addEventListener('click', function(e) {
  if (hamburger && navbarNav && !hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
});

// Mark active page
document.querySelectorAll('.navbar .navbar-nav a').forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});

// Toggle details on student cards
function toggleDetails(card) {
  const details = card.querySelector('.details');
  if (!details) return;
  const isVisible = details.style.display === 'block';
  document.querySelectorAll('.details').forEach(d => d.style.display = 'none');
  details.style.display = isVisible ? 'none' : 'block';
}
// Make globally available
window.toggleDetails = toggleDetails;

// Gallery modal (only if gallery elements exist)
const galleryItems = document.querySelectorAll(".gallery-item img");
if (galleryItems.length) {
  let currentIndex = 0;
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgModal");
  const captionText = document.getElementById("caption");

  galleryItems.forEach(function(item, index) {
    item.addEventListener("click", function() {
      currentIndex = index;
      openModal(currentIndex);
    });
  });

  function openModal(index) {
    if (!modal || !modalImg) return;
    modal.style.display = "block";
    modalImg.src = galleryItems[index].src;
    if (captionText) captionText.innerHTML = galleryItems[index].alt;
  }

  const span = document.getElementsByClassName("close")[0];
  if (span) span.onclick = () => modal.style.display = "none";

  const prev = document.getElementsByClassName("prev")[0];
  if (prev) prev.onclick = () => { currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; openModal(currentIndex); };

  const next = document.getElementsByClassName("next")[0];
  if (next) next.onclick = () => { currentIndex = (currentIndex + 1) % galleryItems.length; openModal(currentIndex); };

  window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

  document.addEventListener("keydown", (e) => {
    if (modal && modal.style.display === "block") {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") { currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; openModal(currentIndex); }
      else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") { currentIndex = (currentIndex + 1) % galleryItems.length; openModal(currentIndex); }
      else if (e.key === "Escape") modal.style.display = "none";
    }
  });
}
