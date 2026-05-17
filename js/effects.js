// ============================================
// Visual Effects — Confetti, Particles, Nostalgia
// ============================================
import { CONFIG, isPostGraduation, isConfettiPeriod, isParticlesPeriod } from './config.js';

export function initEffects() {
  if (isParticlesPeriod()) {
    localStorage.setItem('nostalgia_active', 'true');
    localStorage.setItem('nostalgia_filter', CONFIG.NOSTALGIA_FILTER);

    // Terapkan jika script synchronous di <head> terlewat
    if (!document.getElementById('nostalgia-style')) {
      const style = document.createElement('style');
      style.id = 'nostalgia-style';
      style.innerHTML = `html::before { content: ""; position: fixed; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 99990; backdrop-filter: ${CONFIG.NOSTALGIA_FILTER}; -webkit-backdrop-filter: ${CONFIG.NOSTALGIA_FILTER}; }`;
      document.head.appendChild(style);
    }
  } else {
    localStorage.removeItem('nostalgia_active');
    const style = document.getElementById('nostalgia-style');
    if (style) style.remove();
  }

  if (isConfettiPeriod()) {
    initConfetti();
  } else if (isParticlesPeriod()) {
    initParticles();
  }
}

function initConfetti() {
  if (typeof confetti !== 'function') return;

  // Initial burst
  setTimeout(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#0db9d7','#ffd700','#ededed','#ff6b6b','#48dbfb'], zIndex: 99999 });
  }, 800);

  // Periodic subtle confetti
  setInterval(() => {
    confetti({ particleCount: 25, spread: 60, origin: { x: Math.random(), y: 0.1 },
      colors: ['#0db9d7','#ffd700','#ededed'], gravity: 0.6, ticks: 200, zIndex: 99999 });
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
