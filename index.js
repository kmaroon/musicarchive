// ─── INFO MODAL & MENU CONTROLS ─────────────────────────────
function openInfo() {
  document.getElementById('info-overlay')?.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInfo() {
  document.getElementById('info-overlay')?.classList.remove('active');
  document.body.style.overflow = '';
}

function toggleMenu() {
  document.getElementById('mobile-menu')?.classList.toggle('active');
}

function closeMenu() {
  document.getElementById('mobile-menu')?.classList.remove('active');
}

// ─── LIGHTBOX CONTROLS ──────────────────────────────────────
function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = '';
}