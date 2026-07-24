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
  const filterBanner = document.getElementById('artist-filter-banner');
  if (!container) return;

  // Fetch photos array or manifest (fallback to photosData if local file fails)
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

    // Display Artist Filter Banner in DOM
    if (filterBanner) {
      filterBanner.innerHTML = `
        <span>Viewing: <strong>${artistFilter}</strong> (${filteredImages.length} photos)</span>
        <button class="clear-filter-btn" onclick="clearFilter()">Show All</button>
      `;
    }
  } else {
    filteredImages = [...allImages];
    if (filterBanner) filterBanner.innerHTML = '';
  }

  container.innerHTML = '';

  if (filteredImages.length === 0) {
    container.innerHTML = `<p style="color: var(--dim); font-family: 'DM Mono', monospace; padding: 2rem;">No images found for this artist.</p>`;
    return;
  }

  // Render items into Masonry
  filteredImages.forEach((imgData, index) => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.onclick = () => openLightbox(index);

    const img = document.createElement('img');
    img.src = imgData.src || imgData.url;
    img.alt = imgData.artist || 'Archive Photo';
    img.loading = 'lazy';
    
    // Check if already cached or trigger on load
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.onload = () => img.classList.add('loaded');
    }

    item.appendChild(img);
    container.appendChild(item);
  });
}

function clearFilter() {
  window.history.replaceState({}, document.title, window.location.pathname);
  location.reload();
}

// ─── LIGHTBOX FUNCTIONALITY ─────────────────────────────────
function openLightbox(index) {
  currentIndex = index;
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  lb.classList.add('active');
  document.body.style.overflow = 'hidden';

  renderLightboxStrip();
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

function renderLightboxStrip() {
  const strip = document.getElementById('lb-strip');
  if (!strip) return;

  strip.innerHTML = '';
  filteredImages.forEach((imgData, idx) => {
    const thumb = document.createElement('img');
    thumb.className = `lb-thumb ${idx === currentIndex ? 'active' : ''}`;
    thumb.src = imgData.src || imgData.url;
    thumb.alt = imgData.artist || '';
    thumb.onclick = () => {
      currentIndex = idx;
      updateLightbox();
    };
    strip.appendChild(thumb);
  });
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

  // Highlight active thumbnail in strip
  const thumbs = document.querySelectorAll('.lb-thumb');
  thumbs.forEach((thumb, idx) => {
    thumb.classList.toggle('active', idx === currentIndex);
    if (idx === currentIndex) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  });

  // Preload adjacent images for seamless navigation
  preloadAdjacentImages();

  // EXIF Parsing using EXIFR (if loaded)
  if (typeof exifr !== 'undefined' && lbImg) {
    exifr.parse(current.src || current.url)
      .then(exif => {
        if (exif && exif.DateTimeOriginal) {
          console.log('EXIF Loaded:', exif);
        }
      })
      .catch(() => {});
  }
}

function preloadAdjacentImages() {
  const nextIdx = (currentIndex + 1) % filteredImages.length;
  const prevIdx = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
  
  [nextIdx, prevIdx].forEach(idx => {
    const data = filteredImages[idx];
    if (data) {
      const img = new Image();
      img.src = data.src || data.url;
    }
  });
}

// ─── GLOBAL EVENT LISTENERS ─────────────────────────────────
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
