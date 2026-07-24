// ─── INFO MODAL & MOBILE MENU CONTROLS ───────────────────────
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

// ─── GALLERY & LIGHTBOX STATE ────────────────────────────────
let allImages = [];
let filteredImages = [];
let currentIndex = 0;

// Parse ?artist=Query from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const artistFilter = urlParams.get('artist');

// ─── MASONRY & LIGHTBOX INITIALIZATION ──────────────────────
async function initGallery() {
  const container = document.getElementById('masonry');
  if (!container) return;

  // Fetch photos array or manifest (Adjust URL path if using local JSON)
  try {
    const res = await fetch('photos.json');
    allImages = await res.json();
  } catch (err) {
    console.warn('Could not load photos.json dynamically, fallback to window.photosData if defined.', err);
    if (typeof photosData !== 'undefined') {
      allImages = photosData;
    }
  }

  // Filter images if navigated from Artists page
  if (artistFilter) {
    filteredImages = allImages.filter(img => 
      img.artist && img.artist.toLowerCase() === artistFilter.toLowerCase()
    );
  } else {
    filteredImages = [...allImages];
  }

  container.innerHTML = '';

  // Render items into Masonry
  filteredImages.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.onclick = () => openLightbox(index);

    const img = document.createElement('img');
    img.src = imgData.src || imgData.url;
    img.alt = imgData.artist || 'Archive Photo';
    img.loading = 'lazy';
    
    img.onload = () => img.classList.add('loaded');

    item.appendChild(img);
    container.appendChild(item);
  });
}

// ─── LIGHTBOX FUNCTIONALITY ─────────────────────────────────
function openLightbox(index) {
  currentIndex = index;
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lb.classList.add('active');
  document.body.style.overflow = 'hidden';

  updateLightbox();
}

function closeLightbox() {
  document.getElementById('lightbox')?.classList.remove('active');
  document.body.style.overflow = '';
}

function navigate(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = filteredImages.length - 1;
  if (currentIndex >= filteredImages.length) currentIndex = 0;
  updateLightbox();
}

function updateLightbox() {
  const current = filteredImages[currentIndex];
  if (!current) return;

  const lbImg = document.getElementById('lb-img');
  const lbCounter = document.getElementById('lb-counter');
  const lbTitle = document.getElementById('lb-title');
  const lbSub = document.getElementById('lb-sub');

  if (lbImg) lbImg.src = current.src || current.url;
  if (lbCounter) lbCounter.textContent = `${currentIndex + 1} / ${filteredImages.length}`;
  if (lbTitle) lbTitle.textContent = current.artist || 'Untitled';
  if (lbSub) lbSub.textContent = [current.venue, current.year || current.date].filter(Boolean).join(' — ');

  // Optional EXIF Parsing using EXIFR
  if (typeof exifr !== 'undefined' && lbImg) {
    exifr.parse(lbImg).then(exif => {
      if (exif && exif.DateTimeOriginal) {
        console.log('EXIF Loaded:', exif);
      }
    }).catch(() => {});
  }
}

// Keyboard arrow navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigate(-1);
  if (e.key === 'ArrowRight') navigate(1);
});

// Scroll to top button visibility
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scroll-top');
  if (btn) {
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  }
});

document.addEventListener('DOMContentLoaded', initGallery);