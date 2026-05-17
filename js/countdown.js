// ============================================
// Countdown & Graduation State
// ============================================
import { CONFIG, isPostGraduation, daysSinceGraduation } from './config.js';

export function initCountdown() {
  const el = document.getElementById('countdown-display');
  if (!el) return;

  function update() {
    const now = new Date();
    const grad = CONFIG.GRADUATION_DATE;
    const diff = grad - now;

    if (diff > 0) {
      // Before graduation — countdown
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      el.innerHTML = `
        <div class="countdown-label">Menuju Kelulusan</div>
        <div class="countdown-timer">
          <div class="countdown-unit"><span class="countdown-num">${days}</span><span class="countdown-text">Hari</span></div>
          <div class="countdown-sep">:</div>
          <div class="countdown-unit"><span class="countdown-num">${String(hrs).padStart(2,'0')}</span><span class="countdown-text">Jam</span></div>
          <div class="countdown-sep">:</div>
          <div class="countdown-unit"><span class="countdown-num">${String(mins).padStart(2,'0')}</span><span class="countdown-text">Menit</span></div>
          <div class="countdown-sep">:</div>
          <div class="countdown-unit"><span class="countdown-num">${String(secs).padStart(2,'0')}</span><span class="countdown-text">Detik</span></div>
        </div>
        <div class="countdown-date">Senin, 4 Mei 2026</div>`;
    } else {
      // After graduation
      const d = daysSinceGraduation();
      el.innerHTML = `
        <div class="countdown-label post-grad">🎓 Lulus</div>
        <div class="countdown-timer post-grad">
          <div class="countdown-unit"><span class="countdown-num">${d}</span><span class="countdown-text">Hari</span></div>
        </div>
        <div class="countdown-sublabel">sejak kelulusan — 4 Mei 2026</div>`;
    }
  }

  update();
  setInterval(update, 1000);
}
