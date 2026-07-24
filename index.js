const PHOTOS = [
  { src: "images/qandnotu-kimberlymaroon2003-1.jpg" },
  { src: "images/qandnotu-kimberlymaroon2003-4.jpg" },
  { src: "images/qandnotu-kimberlymaroon2003-2.jpg" },
  { src: "images/qandnotu-kimberlymaroon2003-3.jpg" },
  { src: "images/mychemicalromance-kimberlymaroon2003-1.jpg" },
  { src: "images/mychemicalromance-kimberlymaroon2003-4.jpg" },
  { src: "images/mychemicalromance-kimberlymaroon2003-3.jpg" },
  { src: "images/mychemicalromance-kimberlymaroon2003-2.jpg" },
  { src: "images/sadaharu-kimberlymaroon2003-1.jpg" },
  { src: "images/murderbydeath-kimberlymaroon2003-1.jpg" },
  { src: "images/murderbydeath-kimberlymaroon2003-2.jpg" },
  { src: "images/frenchtoast-kimberlymaroon2003-1.jpg" },
  { src: "images/regardingi-kimberlymaroon2003-1.jpg" },
  { src: "images/alisonranger-kimberlymaroon2003-1.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-11.jpg" },
  { src: "images/AKAsAsburyLanes-kimberlymaroon2003-01.jpg" },
  { src: "images/AKAsAsburyLanes-kimberlymaroon2003-02.jpg" },
  { src: "images/AKAsAsburyLanes-kimberlymaroon2003-04.jpg" },
  { src: "images/AKAsAsburyLanes-kimberlymaroon2003-05.jpg" },
  { src: "images/AKAsAsburyLanes-kimberlymaroon2003-06.jpg" },
  { src: "images/AndyETID-kimberlymaroon2003-1.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-1.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-2.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-4.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-5.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-7.jpg" },
  { src: "images/AngelsAirwaves-kimberlymaroon2003-9.jpg" },
  { src: "images/hissingchoir-kimberlymaroon2003-1.jpg" },
  { src: "images/JelloBiafra-kimberlymaroon2003-1.jpg" },
  { src: "images/JelloBiafra-kimberlymaroon2003-2.jpg" },
  { src: "images/SadaharuAsburyLanes-kimberlymaroon2003-3.jpg" },
  { src: "images/SadaharuAsburyLanes-kimberlymaroon2003-6.jpg" },
  { src: "images/SadaharuAsburyLanes-kimberlymaroon2003-7.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-01.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-02.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-04.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-05.jpg" },
  { src: "images/TheExplosionFUC-kimberlymaroon2003-09.jpg" },
];

// ── INIT ──────────────────────────────────────────────────────
let lbIndex = 0;
PHOTOS.sort(() => Math.random() - 0.5);
renderMasonry();

// ── MASONRY ───────────────────────────────────────────────────
function renderMasonry() {
  const container = document.getElementById('masonry');
  container.innerHTML = PHOTOS.map((p, i) => `
    <div class="masonry-item" onclick="openLightbox(${i})">
      <img src="${p.src}" alt="" loading="lazy" />
    </div>`).join('');

  // IntersectionObserver for fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('img');
        if (img) {
          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.onload = () => img.classList.add('loaded');
          }
        }
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });

  document.querySelectorAll('.masonry-item').forEach(item => observer.observe(item));
}

// ── LIGHTBOX ──────────────────────────────────────────────────
function openLightbox(i) {
  lbIndex = i;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
  updateLightbox();
  renderStrip();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  lbIndex = (lbIndex + dir + PHOTOS.length) % PHOTOS.length;
  updateLightbox();
  syncStrip();
}

async function updateLightbox() {
  const p = PHOTOS[lbIndex];
  const img = document.getElementById('lb-img');
  img.classList.remove('loaded');
  img.src = p.src;
  img.onload = async () => {
    img.classList.add('loaded');
    try {
      const fullUrl = new URL(img.src, window.location.href).href;
      const exif = await exifr.parse(fullUrl, true);
      const title = (exif?.title?.value || exif?.ObjectName || '—').replace(/&amp;/g, '&');
      const caption = exif?.Caption || exif?.ImageDescription || '';
      const rawDate = exif?.DateTimeOriginal;
      const date = rawDate
        ? rawDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : '';
      document.getElementById('lb-title').textContent = title;
      document.getElementById('lb-sub').textContent = [caption, date].filter(Boolean).join('  ·  ') || '—';
    } catch {
      document.getElementById('lb-title').textContent = '—';
      document.getElementById('lb-sub').textContent = '—';
    }
  };
  document.getElementById('lb-counter').textContent = `${lbIndex + 1} / ${PHOTOS.length}`;
}

function renderStrip() {
  document.getElementById('lb-strip').innerHTML = PHOTOS.map((p, i) => `
    <img class="lb-strip-item${i === lbIndex ? ' active' : ''}"
      src="${p.src}" onclick="lbIndex=${i};updateLightbox();syncStrip()"
      loading="lazy" alt="" />`).join('');
}

function syncStrip() {
  document.querySelectorAll('.lb-strip-item').forEach((el, i) => el.classList.toggle('active', i === lbIndex));
  const a = document.querySelector('.lb-strip-item.active');
  if (a) a.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// ── INFO OVERLAY ──────────────────────────────────────────────
function openInfo() {
  document.getElementById('info-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeInfo() {
  document.getElementById('info-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── MOBILE MENU ───────────────────────────────────────────────
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.body.style.overflow =
    document.getElementById('mobile-menu').classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.body.style.overflow = '';
}

// ── KEYBOARD ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeMenu(); closeInfo(); closeLightbox(); }
  if (document.getElementById('lightbox').classList.contains('open')) {
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  }
});

// ── SCROLL TO TOP ─────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
});

// ── IMAGE PROTECTION ──────────────────────────────────────────
document.addEventListener('contextmenu', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
document.addEventListener('dragstart', e => { if (e.target.tagName === 'IMG') e.preventDefault(); });
document.addEventListener('touchstart', e => {
  if (e.target.tagName === 'IMG') e.target.style.webkitUserSelect = 'none';
}, { passive: true });
