// Sample artist data - update or replace with your full array/fetch call
const artistsData = [
  "10 Years", "The 1975", "30 Seconds to Mars",
  "Acid Tiger", "AFI", "Against All Authority", "Against Me!", "Aiden", "The AKAs", "An Albatross", "Albert React", "Alesana", "Alexisonfire", "Alison Ranger", "Alkaline Trio", "All That Remains", "All Your Might", "All-American Rejects", "Ambulance", "Ambulance LTD", "American Buffalo", "American Ethos", "American Speedway", "Anathallo", "Andrew W.K.", "Angels & Airwaves", "Anodyne", "Anti-Flag", "The Appleseed Cast", "An April Sun Setting", "Arms of Orion", "As I Lay Dying", "ASOB (Arrogant Sons of Bitches)", "Athlete", "Atreyu", "August Burns Red", "Avail", "Avenged Sevenfold", "Awful Waffle",
  "Bad Brains", "Bad Rabbits", "Bad Religion", "Bane", "Baroness", "Basement", "Battles", "Bayside", "Bear vs Shark", "Bedlight for Blue Eyes", "Beep Beep", "Bella Lea", "Ben Kweller", "Between the Buried and Me", "Big Bad Voodoo Daddy", "Big D & the Kids Table", "Billionaire Boys Club", "Black Eyes", "Black Label Society", "Black Lips", "The Bled", "Bleed the Dream", "Bleeding Through", "Blonde Redhead"
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

// ─── RENDER ARTISTS & A-Z JUMP BAR ──────────────────────────
function initArtists() {
  const container = document.getElementById('artists-container');
  const jumpBar = document.getElementById('jump-bar');
  if (!container || !jumpBar) return;

  // Group artists by first character
  const grouped = {};
  artistsData.forEach(artist => {
    let char = artist.charAt(0).toUpperCase();
    if (!isNaN(char)) char = '#'; // Group numbers under '#'
    if (!grouped[char]) grouped[char] = [];
    grouped[char].push(artist);
  });

  // Clear existing content
  container.innerHTML = '';
  jumpBar.innerHTML = '';

  // Get sorted keys (# first, then A-Z)
  const keys = Object.keys(grouped).sort((a, b) => {
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });

  // Build Jump Bar & Main Section Grid
  keys.forEach(key => {
    // 1. Jump Bar Link
    const jumpLink = document.createElement('a');
    jumpLink.className = 'jump-link';
    jumpLink.href = `#letter-${key === '#' ? 'NUM' : key}`;
    jumpLink.textContent = key;
    jumpBar.appendChild(jumpLink);

    // 2. Main Letter Section
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
      // Query filter parameter on index page
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