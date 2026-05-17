// ============================================
// AOS Init — simple, no GSAP conflicts
// ============================================

export function initAnimations() {
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
      offset: 50
    });
  }
}
