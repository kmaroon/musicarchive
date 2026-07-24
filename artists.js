// Sample fallback array if external artistsData isn't defined
const fallbackArtists = [
  "AC/DC", "Blink-182", "David Bowie", "Fleetwood Mac", 
  "Gorillaz", "Kendrick Lamar", "Nirvana", "Radiohead", "The Rolling Stones"
];

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
  const searchInput = document.getElementById('search-input');

  if (!container || !jumpBar) return;

  const listToRender = (typeof artistsData !== 'undefined' && Array.isArray(artistsData)) 
    ? artistsData 
    : fallbackArtists;

  function renderList(filterTerm = '') {
    const filtered = listToRender.filter(artist => 
      artist.toLowerCase().includes(filterTerm.toLowerCase())
    );

    // Group artists by letter
    const grouped = {};
    filtered.forEach(artist => {
      let char = artist.charAt(0).toUpperCase();
      if (!isNaN(char)) char = '#';
      if (!grouped[char]) grouped[char] = [];
      grouped[char].push(artist);
    });

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

      if (!grouped[letter]) {
        jumpLink.style.opacity = '0.3';
        jumpLink.style.pointerEvents = 'none';
      }

      jumpBar.appendChild(jumpLink);
    });

    // 2. Build Artist Sections
    const keys = Object.keys(grouped).sort((a, b) => {
      if (a === '#') return -1;
      if (b === '#') return 1;
      return a.localeCompare(b);
    });

    if (keys.length === 0) {
      container.innerHTML = '<p style="color: var(--dim); font-family: \'DM Mono\', monospace; margin-top: 2rem;">No matching artists found.</p>';
      return;
    }

    keys.forEach(key => {
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

  // Initial Render
  renderList();

  // Attach search listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderList(e.target.value);
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', initArtists);
