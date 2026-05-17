// ============================================
// Visual Effects — Confetti, Particles, Nostalgia
// ============================================
import { CONFIG, isPostGraduation, isConfettiPeriod, isParticlesPeriod } from './config.js';

export function initEffects() {
  if (!isPostGraduation()) return;

  // Nostalgia filter DISABLED — CSS filter on body breaks position:fixed
  // (chat icon, cursor, navbar all stop being viewport-relative)
  // applyNostalgiaFilter();

  if (isConfettiPeriod()) {
    initConfetti();
  } else if (isParticlesPeriod()) {
    initParticles();
  }
}

function applyNostalgiaFilter() {
  document.body.classList.add('nostalgia-active');
}

function initConfetti() {
  if (typeof confetti !== 'function') return;

  // Initial burst
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#0db9d7','#ffd700','#ededed','#ff6b6b','#48dbfb'] });
  }, 800);

  // Periodic subtle confetti
  setInterval(() => {
    confetti({ particleCount: 25, spread: 60, origin: { x: Math.random(), y: 0.1 },
      colors: ['#0db9d7','#ffd700','#ededed'], gravity: 0.6, ticks: 200 });
  }, 12000);
}

function initParticles() {
  const container = document.getElementById('particles-bg');
  if (!container || typeof tsParticles === 'undefined') return;

  tsParticles.load('particles-bg', {
    fullScreen: false,
    particles: {
      number: { value: 50, density: { enable: true, area: 800 } },
      color: { value: ['#0db9d7', '#ffd700', '#ededed'] },
      opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 0.3, minimumValue: 0.05 } },
      size: { value: { min: 1, max: 3 } },
      move: { enable: true, speed: 0.3, direction: 'none', outModes: 'out' },
      links: { enable: false }
    },
    detectRetina: true
  });
}
