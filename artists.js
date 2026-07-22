const ARTISTS = [
  "10 Years","The 1975","30 Seconds to Mars","A Life Once Lost","A Mosquito","A Petal Fallen","A Static Lullaby","Acid Tiger","AFI","Against All Authority","Against Me!","Aiden","The AKAs","Albert React","Alesana","Alexisonfire","Alison Ranger","Alkaline Trio","All That Remains","All Your Might","All-American Rejects","Ambulance","Ambulance LTD","American Buffalo","American Ethos","American Speedway","An Albatross","An April Sun Setting","Anathallo","Andrew W.K.","Angels & Airwaves","Anodyne","Anti-Flag","The Appleseed Cast","Arms of Orion","As I Lay Dying","ASOB (Arrogant Sons of Bitches)","Athlete","Atreyu","August Burns Red","Avail","Avenged Sevenfold","Awful Waffle",
  "Bad Brains","Bad Rabbits","Bad Religion","Bane","Baroness","Basement","Battles","Bayside","Bear vs Shark","Bedlight for Blue Eyes","Beep Beep","Bella Lea","Ben Kweller","Between the Buried and Me","Big Bad Voodoo Daddy","Big D & the Kids Table","Billionaire Boys Club","Black Eyes","Black Label Society","Black Lips","The Bled","Bleed the Dream","Bleeding Through","Blonde Redhead","Blood Brothers","Bloodmoon (Converge + Chelsea Wolfe)","The Bloodreds","Bon Iver","The Bouncing Souls","Boy Sets Fire","Boys Night Out","Braid","Brand New","Brandi Carlisle","Breather Resist","The Briggs","Bring Me the Horizon","The Bronx","The Budgets","Bullet for My Valentine","The Burning Paris",
  "The Cab","Cage the Elephant","Cake","Cannibal Corpse","Caspian","The Casualties","Catch 22","The Chariot","Chimaira","Chiodos","The Chop Tops","Chris Cornell","Chuck Ragan","Circa Survive","City of Caterpillar","Clutch","The Coathangers","Coheed & Cambria","Coliseum","The Constantines","Converge","Cursive",
  "Daly's Gone Wrong","Darkest Hour","Dashboard Confessional","Daughter","Dave Hause","Days Away","Dead Gowns","The Dead Pets","Dears","The Dears","Death by Stereo","Death Cab for Cutie","Deftones","Denali","Des Ark","The Devil Wears Prada","Diamond Nights","Dick Dale","The Dillinger Escape Plan","Dirty Nil","The Divining","Dogs Die","The Downhauls","Downtown Singapore","The Draft","DragonForce","Dreamtigers","Dropkick Murphys","The Duke Spirit","Dum Dum Girls","Dungen",
  "The Early November","The Eaves","Echo Constructor","Eddie Clendening","Electric Six","Engine Down","Envy on the Coast","The Evens","Evergreen Terrace","Every Time I Die","The Exit","The Explosion","Explosions in the Sky",
  "Face to Face","The Faint","Fake Knife","Fake Problems","Fear Before the March of Flames","Fiery Furnaces","The Fight","Finch","Fire Down Below","Flashlight Arcade","Flogging Molly","Flyleaf","Folly","Forensics","Forgive Durden","The Format","Foster","Four Year Strong","The French Kicks","French Toast","Friendship Commanders","From Autumn to Ashes","The Funeral Bird","Further Seems Forever",
  "Gallows","The Gaslight Anthem","Gatsby's American Dream","Genghis Tron","The Get Up Kids","Giant Drag","Gibbler","Giving Chase","Glassjaw","Gogol Bordello","The Good Life","Gratitude","Greg Laswell","Grizzly Bear","Guster","Guttermouth","Gym Class Heroes",
  "The Hackensaw Boys","Hamilton Leithauser","Harry and the Potters","Haste the Day","Head Automatica","Heavy Heavy Low Low","Helmet","Henry Rollins","High School Football Heroes","HIM","The Hold Steady","Holly Golightly","Homegrown","Horse the Band","Hot Cross","Hot Rod Circuit","Hot Rod Hustle","Hot Water Music","Hub City Stompers",
  "I Am the Avalanche","I Hate Sally","In Flames",
  "Jadefire","Jena Berlin","Jenny Lewis","Jinxed","Joan Jett","Joan of Arc","Job for a Cowboy","Joggers","Josh Small","Josie Outlaw","Jucifer","Julien Baker","Juliette and the Licks","Jump Little Children",
  "Kaiser Chiefs","Katy Perry","Killswitch Engage","Kinison","Koffin Kats","Kylesa",
  "Lacuna Coil","Lamb of God","Lars & the Bastards","Late Night Television","The Lawrence Arms","Leftover Crack","Legendary Shack Shakers","Less Than Jake","Let Me Run","LickGoldenSky","The Life and Times","Lifetime","Linkin Park","Lola Ray","The Love of Everything","The Loved Ones","The Low Budgets","Lucero","Lucky Boys Confusion","Lucy Dacus",
  "Madina Lake","Mae","Mahjongg","Mannequin","Mariachi El Bronx","Mastodon","Mates of State","Matt & Kim","Matt Kearney","Maylene & the Sons of Disaster","MC Lars","Meg & Dia","The Memory","Men, Women & Children","mewithoutYou","Midnight Dip","Midtown","The Mighty Mighty Bosstones","The Mighty Regis","Mindless Self Indulgence","Minus the Bear","Modern Life is War","Moneen","Monster Squad","Morningwood","Most Precious Blood","Motion City Soundtrack","Moving Mountains","MU330","Mudvayne","Murder by Death","Murder City Devils","Murphy's Law","Music","The Music","Mustard Plug","MXPX","My American Heart","My Chemical Romance","My Island",
  "Nashville Pussy","Nathaniel Rateliff","Nekromantix","New London Fire","New York Dolls","Nicole Atkins","Nightmare of You","Nine Black Alps","NOFX","None More Black","Norma Jean","The Number Twelve Looks Like You",
  "Object 7","Of Monsters and Men","Offspring","OK Go","Opeth","Opiate for the Masses","Orange Island","OTEP",
  "Paint It Black","Paramore","Pelican","Pennywise","Piebald","The Pietasters","The Pink Spiders","Pipedown","Placebo","Planet Smashers","The Plot to Blow Up the Eiffel Tower","Poison the Well","Polar Bear Club","The Ponys","The Pragmatics","Pretty Girls Make Graves","Priestbird","Priestess","The Prizefight","Protest the Hero","Punchline",
  "Q and Not U",
  "R&R Soldiers","Rainer Maria","Ram & Ox","The Ratchets","Rebuilder","The Receiving End of Sirens","Red Sparrows","Reel Big Fish","Regarding I","Reggie and the Full Effect","Relient K","Restorations","Rise Against","River City Rebels","Riverboat Gamblers","Roadside Graves","Rory","Royal Blood","Ruby Ann & the Lustre Kings","Rufio","RX Bandits",
  "Sadaharu","Saosin","Sasquatch & the Sickabillies","Saves the Day","Say Anything","School of Seven Bells","Scott H. Biram","Seether","Senses Fail","Sevendust","Shadows Fall","Sharks","Shawn James","Shooter Jennings","The Showdown","Sigur Rós","Silverstein","Silversun Pickups","The Sirs","Small Town Superhero","Smoke or Fire","The Snake the Cross the Crown","SOM","Someday Never","The Sounds","Spoon","Stars","The Starting Line","The Static Age","Static-X","Story of the Year","Strand of Oaks","Straylight Run","Street Dogs","Street Drum Corps","Streetlight Manifesto","Stretch Armstrong","Strike Anywhere","Suburban Legends","The Superspecs","The Sword","System of a Down",
  "Taking Back Sunday","Ted Leo and the Pharmacists","Tegan & Sara","Temper Temper","Testament","There 4","These Arms Are Snakes","Thieves Like Us","This Day Forward","Thrice","Through the Eyes of the Dead","Throwdown","Thursday","Tiger Army","Tim Barry","The Toasters","Too Short Notice","Tourmaline","The Transplants","Tsar","Tsunami Bomb","TV on the Radio",
  "Underoath","Unearth","Upperhand","The Used",
  "Valencia","Valient Thorr","The Vandelles","Vapers","VHS or Beta","Vision","Voodoo Glow Skulls",
  "The Walkmen","Walls of Jericho","Wanda Jackson","Warpaint","We Are the Fury","The Weakerthans","Weezer","Welcome the Plague Year","Westbound Train","White Lies","Whole Wheat Bread","William Elliott Whitmore","The Wind-Up Bird","With Honor","Wolf Parade","Worthless United",
  "X",
  "The Yard Dogs","Yeah Yeah Yeahs","Yellowcard","The Young Vulgarians","The Youth Ahead",
  "Zola Jesus","Zolof the Rock and Roll Destroyer"
];

function sortKey(name) {
  return name.replace(/^(The |A |An )/i, '').toUpperCase();
}

ARTISTS.sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

const grouped = {};
ARTISTS.forEach(name => {
  const letter = sortKey(name)[0];
  if (!grouped[letter]) grouped[letter] = [];
  grouped[letter].push(name);
});

const letters = Object.keys(grouped).sort();
const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const jumpBar = document.getElementById('jump-bar');
allLetters.forEach(l => {
  const a = document.createElement('a');
  a.href = grouped[l] ? `#letter-${l}` : '#';
  a.className = 'jump-link' + (grouped[l] ? ' has-artists' : '');
  a.textContent = l;
  if (!grouped[l]) a.style.opacity = '0.2';
  jumpBar.appendChild(a);
});

const listEl = document.getElementById('artist-list');
letters.forEach(letter => {
  const section = document.createElement('div');
  section.className = 'letter-section';
  section.id = `letter-${letter}`;

  const heading = document.createElement('div');
  heading.className = 'letter-heading';
  heading.textContent = letter;
  section.appendChild(heading);

  const grid = document.createElement('div');
  grid.className = 'artist-grid';

  grouped[letter].forEach(name => {
    const div = document.createElement('div');
    div.className = 'artist-name';
    div.textContent = name;
    grid.appendChild(div);
  });

  section.appendChild(grid);
  listEl.appendChild(section);
});
