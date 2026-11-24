// Script to add missing high-demand titles to MANGA_DATABASE in app.js
const fs = require('fs');
const path = require('path');

const MISSING_TITLES = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    author: "Chugong (Story), Dubu (Art)",
    description: "A weak hunter named Sung Jinwoo discovers a mysterious system that allows only him to level up, transforming from the weakest hunter to the most powerful being in existence.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101517-uxyhFofRUmCF.jpg",
    chapters: 179,
    volumes: 14,
    status: "Completed",
    type: "Manhwa",
    demographic: "Shōnen",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 4.6,
    year: 2018,
    releaseDay: "Wednesday",
    tags: ["Game Elements", "Hunter", "Leveling System", "Overpowered MC", "Gates"],
    source: "kakao",
    anilistId: 101517
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    author: "Hajime Isayama",
    description: "In a world where humanity lives within enormous walled cities to protect themselves from Titans—giant humanoid creatures—Eren Yeager vows to exterminate the Titans after his hometown is destroyed.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx53390-1RsuABC34P9Q.jpg",
    chapters: 139,
    volumes: 34,
    status: "Completed",
    type: "Manga",
    demographic: "Shōnen",
    genres: ["Action", "Drama", "Fantasy", "Mystery"],
    rating: 4.7,
    year: 2009,
    releaseDay: "Thursday",
    tags: ["Military", "Post-Apocalyptic", "Survival", "Dark", "Titans", "Walls"],
    source: "kodansha",
    anilistId: 53390
  },
  {
    id: "death-note",
    title: "Death Note",
    author: "Tsugumi Ohba (Story), Takeshi Obata (Art)",
    description: "A high school student discovers a supernatural notebook that grants its user the ability to kill anyone whose name and face they know. He decides to use it to cleanse the world of criminals.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx21519-4J8bYlNLBGJu.jpg",
    chapters: 108,
    volumes: 12,
    status: "Completed",
    type: "Manga",
    demographic: "Shōnen",
    genres: ["Mystery", "Psychological", "Supernatural", "Thriller"],
    rating: 4.6,
    year: 2003,
    releaseDay: "Friday",
    tags: ["Shinigami", "Death", "Genius MC", "Cat-and-Mouse", "Serial Killer", "Detective"],
    source: "shueisha",
    anilistId: 21519
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    author: "Koyoharu Gotouge",
    description: "Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon, aiming to find a cure and avenge his family.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87216-RMGtd7uS29nb.jpg",
    chapters: 205,
    volumes: 23,
    status: "Completed",
    type: "Manga",
    demographic: "Shōnen",
    genres: ["Action", "Adventure", "Supernatural"],
    rating: 4.5,
    year: 2016,
    releaseDay: "Saturday",
    tags: ["Demons", "Swords", "Breathing Techniques", "Siblings", "Revenge", "Historical"],
    source: "shueisha",
    anilistId: 87216
  },
  {
    id: "naruto",
    title: "Naruto",
    author: "Masashi Kishimoto",
    description: "Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story follows his journey to become a great ninja.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx11061-ONEbSUDkMVqL.jpg",
    chapters: 700,
    volumes: 72,
    status: "Completed",
    type: "Manga",
    demographic: "Shōnen",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 4.5,
    year: 1999,
    releaseDay: "Monday",
    tags: ["Ninja", "Coming of Age", "Friendship", "Rivalry", "Nine-Tails", "Hokage"],
    source: "shueisha",
    anilistId: 11061
  },
  {
    id: "tower-of-god",
    title: "Tower of God",
    author: "SIU (Slave In Utero)",
    description: "Twenty-Fifth Bam has lived all his life in a cave beneath a mysterious Tower. When his only friend Rachel enters the Tower, Bam follows her and must ascend its floors to find her.",
    coverUrl: "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx76044-BCWsVlCH6SNVL.jpg",
    chapters: 600,
    volumes: null,
    status: "Releasing",
    type: "Manhwa",
    demographic: "Shōnen",
    genres: ["Action", "Adventure", "Fantasy", "Mystery"],
    rating: 4.5,
    year: 2010,
    releaseDay: "Sunday",
    tags: ["Tower", "Betrayal", "Power System", "Hidden Powers", "Competition"],
    source: "webtoon",
    anilistId: 76044
  }
];

const appPath = path.join(__dirname, '..', 'app.js');
let src = fs.readFileSync(appPath, 'utf8');

const regex = /const MANGA_DATABASE = (\[[\s\S]*?\n\]);/;
const match = src.match(regex);
if (!match) {
  console.error('Could not find MANGA_DATABASE');
  process.exit(1);
}

const existing = eval(match[1]);
console.log('Existing titles:', existing.length);

// Check which are genuinely missing
const existingIds = new Set(existing.map(x => x.id));
const toAdd = MISSING_TITLES.filter(t => !existingIds.has(t.id));
console.log('Titles to add:', toAdd.length, toAdd.map(t => t.title));

if (toAdd.length === 0) {
  console.log('Nothing to add!');
  process.exit(0);
}

const merged = [...existing, ...toAdd];
console.log('Total after merge:', merged.length);

const newDB = 'const MANGA_DATABASE = ' + JSON.stringify(merged, null, 2) + '\n];';
// JSON.stringify wraps array in [ ... ] but we need to close properly
// Actually JSON.stringify already includes brackets; just replace
const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + JSON.stringify(merged, null, 2) + '\n];');
fs.writeFileSync(appPath, newSrc, 'utf8');
console.log('Done! app.js updated with', merged.length, 'titles.');
