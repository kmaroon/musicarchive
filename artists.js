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

// ─── RENDER ARTISTS & FULL A-Z JUMP BAR ─────────────────────
function initArtists() {
  const container = document.getElementById('artists-container');
  const jumpBar = document.getElementById('jump-bar');
  if (!container || !jumpBar) return;

  // Use your global artists array if available, or extract from page DOM
  const listToRender = (typeof artistsData !== 'undefined' && Array.isArray(artistsData)) 
    ? artistsData 
    : [];

  if (listToRender.length === 0) return;

  // Group artists by letter
  const grouped = {};
  listToRender.forEach(artist => {
    let char = artist.charAt(0).toUpperCase();
    if (!isNaN(char)) char = '#';
    if (!grouped[char]) grouped[char] = [];
    grouped[char].push(artist);
  });

  // Clear existing content
  container.innerHTML = '';
  jumpBar.innerHTML = '';

  // 1. Build FULL A-Z Jump Bar
  const alphabet = ['#', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
  alphabet.forEach(letter => {
    const jumpLink = document.createElement('a');
    jumpLink.className = 'jump-link';
    const targetId = letter === '#' ? 'NUM' : letter;
    jumpLink.href = `#letter-${targetId}`;
    jumpLink.textContent = letter;

    // Dim letters that don't have artists under them
    if (!grouped[letter]) {
      jumpLink.style.opacity = '0.3';
      jumpLink.style.pointerEvents = 'none';
    }

    jumpBar.appendChild(jumpLink);
  });

  // 2. Build Artist Sections for existing letters
  Object.keys(grouped).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  }).forEach(key => {
    const section = document.createElement('div');
    section.className = 'letter-section';
    section.id = `letter-${key === '#' ? 'NUM' : key}`;

    const header = document.createElement('div');
    header.className = 'letter-header';
    header.textContent = key;
    section.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'artist-grid';

    grouped[key].sort().forEach(artist => {
      const a = document.createElement('a');
      a.className = 'artist-name';
      a.href = `index.html?artist=${encodeURIComponent(artist)}`;
      a.textContent = artist;
      grid.appendChild(a);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initArtists);