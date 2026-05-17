// ============================================
// Custom Cursor — Pen SVG with Ink Trail
// ============================================

export function initCursor() {
  // Disable on touch/mobile devices
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  if (window.innerWidth < 768) return;

  document.body.classList.add('custom-cursor-active');

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  // Canvas for ink trail
  const canvas = document.createElement('canvas');
  canvas.id = 'ink-trail-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const trail = [];
  const maxLen = 18;

  // The SVG pen icon is 24x24. The pen tip is at coordinate (3, 21).
  // Cursor div is 22x22, so scale = 22/24.
  // Tip offset in div coordinates: x = 3 * (22/24) ≈ 2.75, y = 21 * (22/24) ≈ 19.25
  const tipOffsetX = 3;
  const tipOffsetY = 19;

  document.addEventListener('mousemove', (e) => {
    const nearScrollbar = e.clientX >= window.innerWidth - 17;
    const overIframe = e.target && (e.target.tagName === 'IFRAME' || (e.target.closest && e.target.closest('.maps')));

    if (nearScrollbar || overIframe) {
      cursor.style.opacity = '0';
    } else {
      cursor.style.opacity = '1';
      // Position so the pen tip is exactly at the mouse pointer
      cursor.style.left = (e.clientX - tipOffsetX) + 'px';
      cursor.style.top = (e.clientY - tipOffsetY) + 'px';

      trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
      if (trail.length > maxLen) trail.shift();
    }
  });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

  // --- INTERACTION VARIATIONS ---
  document.addEventListener('mousedown', (e) => {
    cursor.classList.add('clicking');
    // Jika sedang nge-klik model 3D
    if (e.target && e.target.closest && e.target.closest('#graduation-3d')) {
      cursor.classList.add('grabbing');
    }
  });
  
  document.addEventListener('mouseup', () => {
    cursor.classList.remove('clicking', 'grabbing');
  });

  document.addEventListener('mouseover', (e) => {
    if (!e.target || !e.target.tagName) return;
    
    const tagName = e.target.tagName.toLowerCase();
    const style = window.getComputedStyle(e.target);
    
    // Deteksi elemen
    const isClickable = tagName === 'a' || tagName === 'button' || style.cursor === 'pointer' || e.target.closest('a') || e.target.closest('button');
    const isText = tagName === 'p' || tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'span' || tagName === 'li' || tagName === 'strong' || tagName === 'em' || style.cursor === 'text';
    const is3DModel = e.target.closest('#graduation-3d');

    // Hapus semua state dulu
    cursor.classList.remove('hovering', 'text', 'model-hover');

    if (is3DModel) {
      cursor.classList.add('model-hover');
    } else if (isClickable) {
      cursor.classList.add('hovering');
    } else if (isText) {
      cursor.classList.add('text');
    }
  });

  // Efek memiring saat scroll
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    cursor.classList.add('scrolling');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      cursor.classList.remove('scrolling');
    }, 150); // Hapus efek setelah scroll berhenti sebentar
  }, { passive: true });
  // ------------------------------

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = Date.now();

    while (trail.length > 0 && now - trail[0].time > 250) trail.shift();
    if (trail.length < 2) { requestAnimationFrame(draw); return; }

    for (let i = 1; i < trail.length; i++) {
      const p0 = trail[i - 1];
      const p1 = trail[i];
      const progress = i / trail.length;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.strokeStyle = `rgba(13, 185, 215, ${progress * 0.18})`;
      ctx.lineWidth = progress * 2;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
