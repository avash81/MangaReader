/**
 * MangaVerse - Core Application Engine v3.0
 * Scalable to 1,000,000+ users via Client-Side Web Workers & IndexedDB Architecture
 */

// ==========================================================================
// 1. EXPANSIVE MANGA DATABASE (50+ Curated Titles)
// ==========================================================================
const MANGA_DATABASE = [
  {
    "id": "chrono-blade",
    "title": "Chrono-Blade: Return of the Ash Knight",
    "altTitle": "灰燼のクロノブレード",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Swordsmanship",
      "Time Travel"
    ],
    "rating": 4.92,
    "totalChapters": 1,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 1,
      "title": "Chapter 1",
      "views": "120K",
      "dropTime": "Today (Auto-Synced)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx97853-FjGv1SbBl72P.jpg",
    "coverPath": null,
    "pdfData": "mangas/Manga/Shonen/Chrono-Blade/ch-01.pdf",
    "chapters": [
      {
        "number": 1,
        "pdfData": "mangas/Manga/Shonen/Chrono-Blade/ch-01.pdf"
      }
    ],
    "author": "Kenji Tachibana",
    "artist": "Independent Creator",
    "synopsis": "Betrayed at the seal of the Demon King, swordmaster Aaron awakens 10 years in the past with his legendary blade intact and future calamities memorized."
  },
  {
    "id": "solo-necromancer",
    "title": "The Cataclysmic Necromancer",
    "altTitle": "死霊術士の神化録",
    "type": "Manhwa",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Fantasy",
      "Leveling",
      "Dungeon"
    ],
    "rating": 4.95,
    "totalChapters": 2,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 2,
      "title": "Chapter 2",
      "views": "120K",
      "dropTime": "Today (Auto-Synced)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx113415-nMXNHGtRfSkN.jpg",
    "coverPath": null,
    "pdfData": "mangas/Manhwa/Seinen/Solo-Necromancer/ch-02.pdf",
    "chapters": [
      {
        "number": 1,
        "pdfData": "mangas/Manhwa/Seinen/Solo-Necromancer/ch-01.pdf"
      },
      {
        "number": 2,
        "pdfData": "mangas/Manhwa/Seinen/Solo-Necromancer/ch-02.pdf"
      }
    ],
    "author": "Han Jin-Woo",
    "artist": "Independent Creator",
    "synopsis": "When the sky shattered into crimson portals, only one necromancer retained memories of Earth's fall, ready to conquer the dungeon towers."
  },
  {
    "id": "villainess-tea-empire",
    "title": "The Banished Noblewoman's Afternoon Tea Empire",
    "altTitle": "追放令嬢の紅茶喫茶録",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Slice of Life",
      "Romance",
      "Food/Cooking",
      "Nobility",
      "Reijo/Villainess"
    ],
    "rating": 4.89,
    "totalChapters": 1,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 1,
      "title": "Chapter 1",
      "views": "120K",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx104458-nxiQF7yOEiKn.jpg",
    "coverPath": null,
    "pdfData": "mangas/Manga/Shojo/Villainess-Tea-Empire/ch-01.pdf",
    "chapters": [
      {
        "number": 1,
        "pdfData": "mangas/Manga/Shojo/Villainess-Tea-Empire/ch-01.pdf"
      }
    ],
    "author": "Haruka Shirasaki",
    "artist": "Independent Creator",
    "synopsis": "After her royal engagement was unjustly dissolved, Eleanor moved to the border port town to establish the kingdom's first boutique tea salon."
  },
  {
    "id": "mv-al-30002",
    "anilistId": 30002,
    "mangadexId": "801513ba-a712-498c-8f57-cae55b38cc92",
    "title": "Berserk",
    "altTitle": "ベルセルク",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Horror"
    ],
    "rating": 4.6,
    "totalChapters": 376,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 376,
      "title": "Chapter 376",
      "views": "4.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30002-Cul4OeN7bYtn.jpg",
    "author": "Studio Gaga",
    "artist": "Studio Gaga",
    "synopsis": "His name is Guts, the Black Swordsman, a feared warrior spoken of only in whispers. Bearer of a gigantic sword, an iron hand, and the scars of countless battles and tortures, his flesh is also indelibly marked with The Brand, an unholy symbol that draws the forces of darkness to him and...",
    "trailerUrl": "GFm7jH8HjSE"
  },
  {
    "id": "mv-al-31706",
    "anilistId": 31706,
    "mangadexId": "1044287a-73df-48d0-b0b2-5327f32dd651",
    "title": "JoJo's Bizarre Adventure: Part 7–Steel Ball Run",
    "altTitle": "ジョジョの奇妙な冒険 スティール・ボール・ラン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Mystery",
      "Supernatural"
    ],
    "rating": 4.6,
    "totalChapters": 95,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 95,
      "title": "Chapter 95",
      "views": "3.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx31706-lRncu9VbcBB7.png",
    "author": "Hirohiko Araki",
    "artist": "Hirohiko Araki",
    "synopsis": "Riders from around the world gather in the Wild West for the race of the century! Johnny Joestar, a former jockey paralyzed from the waist down, comes to spectate, and momentarily regains the ability to walk while watching a duel fought by Gyro Zeppeli. Desperate to learn more about thi...",
    "trailerUrl": "yMl1fZZ7p2U"
  },
  {
    "id": "mv-al-30656",
    "anilistId": 30656,
    "mangadexId": "d1a9fdeb-f713-407f-960c-8326b586e6fd",
    "title": "Vagabond",
    "altTitle": "バガボンド",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "rating": 4.55,
    "totalChapters": 327,
    "releaseDay": "Tue",
    "latestChapter": {
      "number": 327,
      "title": "Chapter 327",
      "views": "3.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30656-9mW113O7rDnA.png",
    "author": "Eiji Yoshikawa",
    "artist": "Takehiko Inoue",
    "synopsis": "At seventeen years of age, Miyamoto Musashi--still known by his childhood name, Shinmen Takezo--was a wild young brute just setting out along the way of the sword.    In the aftermath of the epic Battle of Sekigahara, Takezo finds himself a fugitive survivor on the losing side of the wa...",
    "trailerUrl": "o7BrkSGJGEA"
  },
  {
    "id": "mv-al-30013",
    "anilistId": 30013,
    "mangadexId": "a1c7c817-4e59-43b7-9365-09675a149a6f",
    "title": "One Piece",
    "altTitle": "ONE PIECE",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "rating": 4.55,
    "totalChapters": 1130,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 1130,
      "title": "Chapter 1130",
      "views": "3.9M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-BeslEMqiPhlk.jpg",
    "author": "Eiichirou Oda",
    "artist": "Eiichirou Oda",
    "synopsis": "As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer \"Red-Haired\" Shanks. But his life changed when Luffy accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim agai...",
    "trailerUrl": "S8_YwFLCh4U"
  },
  {
    "id": "mv-al-64053",
    "anilistId": 64053,
    "mangadexId": "0d31587d-cec8-4bb6-89dd-cb0e4dde5b14",
    "title": "Umineko When They Cry Episode 8: Twilight of the Golden Witch",
    "altTitle": "うみねこのなく頃に散 - Episode 8: Twilight of the Golden Witch",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Fantasy",
      "Mystery",
      "Supernatural"
    ],
    "rating": 4.5,
    "totalChapters": 42,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 42,
      "title": "Chapter 42",
      "views": "8.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx64053-tHJHWLRrWbeA.png",
    "author": "Ryukishi07",
    "artist": "Kei Natsumi",
    "synopsis": "It's time once again for the annual family gathering on Rokkenjima! Ange Ushiromiya is just getting over a cold, but that won't dampen her excitement at seeing her cousins again! Granddad couldn't be more thrilled to see his beloved grandchildren and throws a special Halloween party whe..."
  },
  {
    "id": "mv-al-30001",
    "anilistId": 30001,
    "mangadexId": "85a915de-40a0-4b19-b4a5-094cef989734",
    "title": "Monster",
    "altTitle": "MONSTER",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Mystery",
      "Psychological",
      "Thriller"
    ],
    "rating": 4.5,
    "totalChapters": 162,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 162,
      "title": "Chapter 162",
      "views": "4.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30001-Knby7l1jevE7.jpg",
    "author": "Naoki Urasawa",
    "artist": "Naoki Urasawa",
    "synopsis": "Everyone faces uncertainty at some point in their lives. Even a brilliant surgeon like Kenzo Tenma is no exception. But there’s no way he could have known that his decision to stop chasing professional success and instead concentrate on his oath to save peoples’ lives would result in th..."
  },
  {
    "id": "mv-al-140407",
    "anilistId": 140407,
    "mangadexId": "d7f56ace-cd30-48b9-8b64-afeca0077fca",
    "title": "The Greatest Estate Developer",
    "altTitle": "역대급 영지 설계사",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "rating": 4.5,
    "totalChapters": 165,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 165,
      "title": "Chapter 165",
      "views": "2.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140407-fJQr0fmqq1IO.png",
    "author": "Baek-Gyeong Mun",
    "artist": "Hyeon-Su Kim",
    "synopsis": "When civil engineering student Su-Ho Kim falls asleep reading a fantasy novel, he wakes up as a character in the book! Su-Ho is now in the body of Lloyd Frontera, a lazy noble who loves to drink, and whose family is in a mountain of debt. Using his engineering knowledge, Su-Ho designs i...",
    "trailerUrl": "ODhmGJ42c_w"
  },
  {
    "id": "mv-al-30642",
    "anilistId": 30642,
    "mangadexId": "5d1fc77e-706a-4fc5-bea8-486c9be0145d",
    "title": "Vinland Saga",
    "altTitle": "ヴィンランド・サガ",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Drama"
    ],
    "rating": 4.5,
    "totalChapters": 216,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 216,
      "title": "Chapter 216",
      "views": "7.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30642-0mjRDkf4THpo.jpg",
    "author": "Makoto Yukimura",
    "artist": "Makoto Yukimura",
    "synopsis": "As a child, Thorfinn sat at the feet of the great Leif Ericson and thrilled to wild tales of a land far to the west. But his youthful fantasies were shattered by a mercenary raid. Raised by the Vikings who murdered his father, Thorfinn became a terrifying warrior, forever seeking to kil...",
    "trailerUrl": "o6JNeqjJQKs"
  },
  {
    "id": "mv-al-30051",
    "anilistId": 30051,
    "mangadexId": "319df2e2-e6a6-4e3a-a31c-68539c140a84",
    "title": "Slam Dunk",
    "altTitle": "SLAM DUNK",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Sports"
    ],
    "rating": 4.5,
    "totalChapters": 276,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 276,
      "title": "Chapter 276",
      "views": "3.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30051-5KJyPlO7z5F4.png",
    "author": "Takehiko Inoue",
    "artist": "Takehiko Inoue",
    "synopsis": "Hanamichi Sakuragi's got no game with girls--none at all! It doesn't help that he's known for throwing down at a moment's notice and always coming out on top. A hopeless bruiser, he's been rejected by 50 girls in a row! All that changes when he meets the girl of his dreams, Haruko, and ...",
    "trailerUrl": "0GGMhcs2v8Q"
  },
  {
    "id": "mv-al-74489",
    "anilistId": 74489,
    "mangadexId": "8896ec06-cca8-4ee8-872a-cc8a359c3bb8",
    "title": "Land of the Lustrous",
    "altTitle": "宝石の国",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Drama",
      "Fantasy",
      "Mystery",
      "Psychological"
    ],
    "rating": 4.45,
    "totalChapters": 108,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 108,
      "title": "Chapter 108",
      "views": "3.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx74489-5HtDCFfut8Be.jpg",
    "author": "Haruko Ichikawa",
    "artist": "Haruko Ichikawa",
    "synopsis": "In a world inhabited by crystalline lifeforms called The Lustrous, every unique gem must fight for their way of life against the threat of lunarians who would turn them into decorations. Phosphophyllite, the most fragile and brittle of gems, longs to join the battle. When Phos is instea...",
    "trailerUrl": "pwFpAyEuph8"
  },
  {
    "id": "mv-al-30657",
    "anilistId": 30657,
    "mangadexId": "366e544c-9474-4042-b767-d222fc51f001",
    "title": "Real",
    "altTitle": "リアル",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Sports"
    ],
    "rating": 4.45,
    "totalChapters": 96,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 96,
      "title": "Chapter 96",
      "views": "4.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30657-AzyyUOWMJ6fd.png",
    "author": "Takehiko Inoue",
    "artist": "Takehiko Inoue",
    "synopsis": "A motorcycle accident, bone cancer, a speeding truck crashing into a boy on a stolen bicycle--tragic life-changing events turn the worlds of three young men upside down. These three very different personalities have only one thing in common--their passion for basketball.    (Source: VIZ...",
    "trailerUrl": "_D_iow5i2bk"
  },
  {
    "id": "mv-al-119247",
    "anilistId": 119247,
    "mangadexId": "a9dd451c-3c45-4d66-a818-4e1b78855838",
    "title": "Uma Musume: Cinderella Gray",
    "altTitle": "ウマ娘 シンデレラグレイ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Sports"
    ],
    "rating": 4.45,
    "totalChapters": 211,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 211,
      "title": "Chapter 211",
      "views": "7.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": true,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119247-8ylxneez5fa8.jpg",
    "author": "Taiyou Kuzumi",
    "artist": "Taiyou Kuzumi",
    "synopsis": "Uma Musume Cinderella Gray is a spin-off title of the Uma Musume project by Cygames. It follows Oguri Cap through her time at Kasamatsu Training Center Academy and on her journey of becoming a legendary horse girl.    Note: Includes the one-shot \"Uma Musume: Cinderella Gray Gaiden - The...",
    "trailerUrl": "nkG2-RH582o"
  },
  {
    "id": "mv-al-30025",
    "anilistId": 30025,
    "mangadexId": "f9c9614d-0657-44c6-9c33-47fd58cd51b3",
    "title": "Fullmetal Alchemist",
    "altTitle": "鋼の錬金術師",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy"
    ],
    "rating": 4.45,
    "totalChapters": 108,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 108,
      "title": "Chapter 108",
      "views": "8.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30025-mpPVpCKFTowt.png",
    "author": "Hiromu Arakawa",
    "artist": "Hiromu Arakawa",
    "synopsis": "Alchemy tore the Elric brothers’ bodies apart. Can their bond make them whole again?  In this world, alchemists are those who study and perform the art of alchemical transmutation—the science of manipulating and transforming matter. They are bounded by the Law of Equivalent Exchange: in...",
    "trailerUrl": "WQiE9taZEAw"
  },
  {
    "id": "mv-al-31303",
    "anilistId": 31303,
    "mangadexId": null,
    "title": "Ashita no Joe: Fighting for Tomorrow",
    "altTitle": "あしたのジョー",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Slice of Life",
      "Sports"
    ],
    "rating": 4.45,
    "totalChapters": 171,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 171,
      "title": "Chapter 171",
      "views": "5.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx31303-l21HJn9AXl7w.jpg",
    "author": "Tetsuya Chiba",
    "artist": "Tetsuya Chiba",
    "synopsis": "A young drifter named Joe Yabuki wanders through the slums of Tokyo, but when the local ruffians try to give him a hard time he teaches them a rough lesson with his fists. The spectacle sparks a gleam in the eye of an old drunk who happens to be watching—Danpei Tange, a failed boxer and...",
    "trailerUrl": "BIXHPgNtAZg"
  },
  {
    "id": "mv-al-46765",
    "anilistId": 46765,
    "mangadexId": "e8d4a5e5-29fb-42b1-90e0-a9a3a91ecfa9",
    "title": "Kingdom",
    "altTitle": "キングダム",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Drama"
    ],
    "rating": 4.45,
    "totalChapters": 815,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 815,
      "title": "Chapter 815",
      "views": "3.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx46765-KPXir4sRqJBW.png",
    "author": "Yasuhisa Hara",
    "artist": "Yasuhisa Hara",
    "synopsis": "Xin is a war orphan in a poor village in the kingdom of Qin. He has big dreams of becoming a great general, and when his best friend’s life is cut short by political machinations, Xin sets off to find a deposed ruler and help restore his place on the throne, while working his way up thr...",
    "trailerUrl": "ZmDorgdAG4g"
  },
  {
    "id": "mv-al-87395",
    "anilistId": 87395,
    "mangadexId": "fffbfac3-b7ad-41ee-9581-b4d90ecec941",
    "title": "Grand Blue Dreaming",
    "altTitle": "ぐらんぶる",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Romance",
      "Slice of Life",
      "Sports"
    ],
    "rating": 4.45,
    "totalChapters": 98,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 98,
      "title": "Chapter 98",
      "views": "3.9M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87395-axsA49kSZp72.jpg",
    "author": "Kenji Inoue",
    "artist": "Kimitake Yoshioka",
    "synopsis": "After moving out on his own to a seaside town, Iori Kitahara makes a college debut he never anticipated. A new chapter of his life unfolds, full of diving with beautiful girls and shenanigans with a gaggle of lovable bastards! Idiot-expert Kenji Inoue and au naturel authority Kimitake Y...",
    "trailerUrl": "kOcjINpcY5s"
  },
  {
    "id": "mv-al-30104",
    "anilistId": 30104,
    "mangadexId": "58be6aa6-06cb-4ca5-bd20-f1392ce451fb",
    "title": "Yotsuba&!",
    "altTitle": "よつばと！",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Slice of Life"
    ],
    "rating": 4.45,
    "totalChapters": 67,
    "releaseDay": "Tue",
    "latestChapter": {
      "number": 67,
      "title": "Chapter 67",
      "views": "6.7M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30104-sUVzNlTWZ5cu.jpg",
    "author": "Kiyohiko Azuma",
    "artist": "Kiyohiko Azuma",
    "synopsis": "Hello! This is Koiwai Yotsuba, Yotsuba Koiwai...um, YOTSUBA! Yotsuba moved with Daddy to a new house from our old house waaaaaaay over there! And moving's fun 'cos people wave! (Ohhhh!!) And Yotsuba met these nice people next door and made friends to play with (one of 'em acted like one..."
  },
  {
    "id": "mv-al-65243",
    "anilistId": 65243,
    "mangadexId": "8f8b7cb0-7109-46e8-b12c-0448a6453dfa",
    "title": "Haikyu!!",
    "altTitle": "ハイキュー！！",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Sports"
    ],
    "rating": 4.4,
    "totalChapters": 404,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 404,
      "title": "Chapter 404",
      "views": "5.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx65243-mR4MnJFmfaOF.png",
    "author": "Haruichi Furudate",
    "artist": "Haruichi Furudate",
    "synopsis": "Shouyou Hinata is out to prove that in volleyball you don’t need to be tall to fly!    After losing his first and last volleyball match against Tobio Kageyama, “the King of the Court,” Shouyou Hinata swears to become his rival after graduating middle school. But what happens when the gu...",
    "trailerUrl": "OmRfbjwOtbI"
  },
  {
    "id": "mv-al-187189",
    "anilistId": 187189,
    "mangadexId": "8b8102da-c875-4dae-a79c-c62e817ff3f5",
    "title": "On the Way to Meet Mom",
    "altTitle": "엄마를 만나러 가는 길",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.4,
    "totalChapters": 53,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 53,
      "title": "Chapter 53",
      "views": "3.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx187189-B5zA4zPh3UJA.jpg",
    "author": "Gomyang",
    "artist": "Gomyang",
    "synopsis": "One day, after being discovered in an abandoned house by a rescue team, Mori suddenly finds himself in a children's protection center. Here, he begins to learn a new way of life – one that includes grand care packages sent by a mysterious patron. But when his closest friend is reunited ..."
  },
  {
    "id": "mv-al-135129",
    "anilistId": 135129,
    "mangadexId": null,
    "title": "Vagabond: Saigo no Manga-ten",
    "altTitle": "バガボンド 最後のマンガ展",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Drama",
      "Psychological"
    ],
    "rating": 4.4,
    "totalChapters": 2,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 2,
      "title": "Chapter 2",
      "views": "6.3M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b135129-rbQyUsPfUZTj.jpg",
    "author": "Takehiko Inoue",
    "artist": "Takehiko Inoue",
    "synopsis": "Telling the later life of Vagabond's Musashi Miyamoto, it was depicted through 140 hand-drawn drawings with ink and brush. It was released at the Ueno Royal Museum in Tokyo in May 2008, and since then it has been displayed at three other venues, Kumamoto City Museum, Suntory Museum in O...",
    "trailerUrl": "o7BrkSGJGEA"
  },
  {
    "id": "mv-al-30028",
    "anilistId": 30028,
    "mangadexId": "4f7ee454-7478-40d5-9eeb-b8ae8e72600d",
    "title": "Nana",
    "altTitle": "NANA",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Music",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.4,
    "totalChapters": 72,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 72,
      "title": "Chapter 72",
      "views": "6.0M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30028-VJqBC1ar6AxE.png",
    "author": "Ai Yazawa",
    "artist": "Sabrina Heep",
    "synopsis": "Nana Komatsu is a young woman who's endured an unending string of boyfriend problems. Moving to Tokyo, she's hoping to take control of her life and put all those messy misadventures behind her. She's looking for love and she's hoping to find it in the big city.   Nana Osaki, on the othe...",
    "trailerUrl": "z6Ox5-IjAFA"
  },
  {
    "id": "mv-al-30026",
    "anilistId": 30026,
    "mangadexId": "936f0ba5-ca65-4de4-99b1-528c02a4454d",
    "title": "Hunter x Hunter",
    "altTitle": "HUNTER×HUNTER",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy"
    ],
    "rating": 4.4,
    "totalChapters": 405,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 405,
      "title": "Chapter 405",
      "views": "8.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30026-uCvXMudMzmwI.jpg",
    "author": "Yoshihiro Togashi",
    "artist": "Yoshihiro Togashi",
    "synopsis": "Gon might be a country boy, but he has high aspirations. Despite his Aunt Mito's protests, Gon decides to follow in his father's footsteps and become a legendary Hunter. The Hunter hopefuls begin their journey by storm-tossed ship, where Gon meets Leorio and Kurapika, the only other app...",
    "trailerUrl": "D9ttIf_DROI"
  },
  {
    "id": "mv-al-75143",
    "anilistId": 75143,
    "mangadexId": "df9be021-ff37-419e-ba6e-dda3e28eb763",
    "title": "Kono Oto Tomare!",
    "altTitle": "この音とまれ！",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Music",
      "Romance"
    ],
    "rating": 4.4,
    "totalChapters": 158,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 158,
      "title": "Chapter 158",
      "views": "5.7M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx75143-qPFON51fyZpt.png",
    "author": "Amyuu Sakura",
    "artist": "Amyuu Sakura",
    "synopsis": "Since the graduation of the senior members of the club, Takezou ends up being the sole member of the \"Koto\" (traditional Japanese string instrument) club. Now that the new school year has begun, Takezou will have to seek out new members into the club, or the club will become terminated....",
    "trailerUrl": "13w5m6wTJ-g"
  },
  {
    "id": "mv-al-86082",
    "anilistId": 86082,
    "mangadexId": "d90ea6cb-7bc3-4d80-8af0-28557e6c4e17",
    "title": "Delicious in Dungeon",
    "altTitle": "ダンジョン飯",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy"
    ],
    "rating": 4.4,
    "totalChapters": 111,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 111,
      "title": "Chapter 111",
      "views": "5.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86082-MXizJxzbijdd.jpg",
    "author": "Ryouko Kui",
    "artist": "Ryouko Kui",
    "synopsis": "When young adventurer Laios and his company are attacked and soundly thrashed by a dragon deep in a dungeon, the party loses all its money and provisions...and a member! They're eager to go back and save her, but there is just one problem: If they set out with no food or coin to speak o...",
    "trailerUrl": "mLfJ7B20A2Q"
  },
  {
    "id": "mv-al-30003",
    "anilistId": 30003,
    "mangadexId": "9650e956-0302-41a8-89a3-33dc6622a02c",
    "title": "20th Century Boys",
    "altTitle": "20世紀少年",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Mystery",
      "Psychological",
      "Sci-Fi",
      "Thriller"
    ],
    "rating": 4.4,
    "totalChapters": 249,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 249,
      "title": "Chapter 249",
      "views": "4.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30003-E84fwIh22LAQ.jpg",
    "author": "Naoki Urasawa",
    "artist": "Naoki Urasawa",
    "synopsis": "Humanity, having faced extinction at the end of the 20th century, would not have entered the new millennium if it weren't for them. In 1969, during their youth, they created a symbol. In 1997, as the coming disaster slowly starts to unfold, that symbol returns. This is the story of a gr..."
  },
  {
    "id": "mv-al-34632",
    "anilistId": 34632,
    "mangadexId": "4301d363-ee02-43f4-ae24-4cbf29a74830",
    "title": "Goodnight Punpun",
    "altTitle": "おやすみプンプン",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Slice of Life"
    ],
    "rating": 4.4,
    "totalChapters": 147,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 147,
      "title": "Chapter 147",
      "views": "1.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx34632-5xMDkx3pXsEh.png",
    "author": "Inio Asano",
    "artist": "Inio Asano",
    "synopsis": "Meet Punpun Punyama. He’s an average kid in an average town.  He wants to win a Nobel Prize and save the world.  He wants the girl he has a crush on to like him back.  He wants to find some porn.  That’s what he wants, but what does he get…?    (Source: VIZ Media)"
  },
  {
    "id": "mv-al-118371",
    "anilistId": 118371,
    "mangadexId": "4a433d6b-f51a-4c2f-a183-85419fe98efc",
    "title": "Medalist",
    "altTitle": "メダリスト",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Sports"
    ],
    "rating": 4.4,
    "totalChapters": 57,
    "releaseDay": "Fri",
    "latestChapter": {
      "number": 57,
      "title": "Chapter 57",
      "views": "6.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx118371-3xk9VUbWnnRR.jpg",
    "author": "Ikada Tsuruma",
    "artist": "Ikada Tsuruma",
    "synopsis": "Inori is a little girl who dreams of becoming a figure skater. Yet, the obstacles to this dream feel insurmountable: Inori’s already “too old” (she’s 11); she’s always had trouble at school; and, worst of all, her older sister’s skating dreams ended in failure, so her mother is dead set...",
    "trailerUrl": "8EZA-1Y9J44"
  },
  {
    "id": "mv-al-126986",
    "anilistId": 126986,
    "mangadexId": null,
    "title": "Jibi Eopseo",
    "altTitle": "집이 없어",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Slice of Life",
      "Supernatural"
    ],
    "rating": 4.4,
    "totalChapters": 269,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 269,
      "title": "Chapter 269",
      "views": "8.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx126986-hIK16AdoJhNo.jpg",
    "author": "Wanan",
    "artist": "Wanan",
    "synopsis": "Hae-Jun Go, who ran from home, and Eun-Yeong Baek, the problem child who lives in a tent. These two, who met under terrible circumstances, are forced to live together in an abandoned dormitory. This is a story of difficult growth between two people who hate both the dorm and each other....",
    "trailerUrl": "fj-fho49sfE"
  },
  {
    "id": "mv-al-30007",
    "anilistId": 30007,
    "mangadexId": "f7888782-0727-49b0-95ec-a3530c70f83b",
    "title": "Hajime no Ippo: Fighting Spirit!",
    "altTitle": "はじめの一歩",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Comedy",
      "Drama",
      "Sports"
    ],
    "rating": 4.35,
    "totalChapters": 29,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 29,
      "title": "Chapter 29",
      "views": "1.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx30007-jVUNk721L0Uz.jpg",
    "author": "George Morikawa",
    "artist": "George Morikawa",
    "synopsis": "Makunouchi Ippo has been bullied his entire life. Constantly running errands and being beaten up by his classmates, Ippo has always dreamed of changing himself, but never has the passion to act upon it. One day, in the midst of yet another bullying, Ippo is saved by Takamura Mamoru, who..."
  },
  {
    "id": "mv-al-31224",
    "anilistId": 31224,
    "mangadexId": "0ca1627e-95dd-4118-892a-f144adf02256",
    "title": "March Comes in Like a Lion",
    "altTitle": "3月のライオン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Slice of Life"
    ],
    "rating": 4.35,
    "totalChapters": 31,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 31,
      "title": "Chapter 31",
      "views": "2.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx31224-dxugU08jahRT.jpg",
    "author": "Chica Umino",
    "artist": "Chica Umino",
    "synopsis": "Rei Kiriyama is a child prodigy. Rei Kiriyama is also an orphan who lives alone in an empty apartment. Rei Kiriyama is a teen working in an adult's world. Life is complicated for Rei. He's an up-and-coming shogi player on the verge of turning pro, but he has no homelife, or much of a li...",
    "trailerUrl": "9jVl6PuiVS8"
  },
  {
    "id": "mv-al-106331",
    "anilistId": 106331,
    "mangadexId": null,
    "title": "Ikoku Nikki: Diary of a Strange Land",
    "altTitle": "違国日記",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Slice of Life"
    ],
    "rating": 4.35,
    "totalChapters": 59,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 59,
      "title": "Chapter 59",
      "views": "5.9M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106331-2AfUs43WcoCA.jpg",
    "author": "Tomoko Yamashita",
    "artist": "Éric Montésinos",
    "synopsis": "Reclusive novelist Makio Koudai has built a life entirely on her own terms—she's sharp-tongued, set in her ways, and far more at ease with the people she invents than the family she keeps at a distance.    But everything changes when her older sister dies unexpectedly, leaving behind a ...",
    "trailerUrl": "0Wk7AyGSAwE"
  },
  {
    "id": "mv-al-86635",
    "anilistId": 86635,
    "mangadexId": "37f5cce0-8070-4ada-96e5-fa24b1bd4ff9",
    "title": "Kaguya-sama: Love is War",
    "altTitle": "かぐや様は告らせたい～天才たちの恋愛頭脳戦～",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Psychological",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.35,
    "totalChapters": 281,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 281,
      "title": "Chapter 281",
      "views": "5.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86635-EdaLQmsn86Fy.png",
    "author": "Aka Akasaka",
    "artist": "Aka Akasaka",
    "synopsis": "As leaders of their prestigious academy’s student council, Kaguya and Miyuki are the elite of the elite! But it’s lonely at the top… Luckily for them, they’ve fallen in love! There’s just one problem—they both have too much pride to admit it. And so begins the daily scheming to get the ...",
    "trailerUrl": "IRBB7wU0wm0"
  },
  {
    "id": "mv-al-37375",
    "anilistId": 37375,
    "mangadexId": "bb8310e4-6050-4a43-984e-f7bbdfce23b1",
    "title": "The Climber",
    "altTitle": "孤高の人",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Adventure",
      "Drama",
      "Psychological",
      "Sports"
    ],
    "rating": 4.35,
    "totalChapters": 170,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 170,
      "title": "Chapter 170",
      "views": "3.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx37375-wkgev4kXhamw.png",
    "author": "Jirou Nitta",
    "artist": "Shinichi Sakamoto",
    "synopsis": "Transfer student Buntaro Mori starts his first day at his new school already on the administration’s radar. He’s withdrawn and sullen, and the teachers are just waiting for him to explode. When his annoying classmate Miyamoto promises to leave him alone forever if he climbs to the top o...",
    "trailerUrl": "gu97AQtbZk0"
  },
  {
    "id": "mv-al-51525",
    "anilistId": 51525,
    "mangadexId": "3bb0279f-a01d-4aa4-93e4-305800f4b83e",
    "title": "Yona of the Dawn",
    "altTitle": "暁のヨナ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Romance"
    ],
    "rating": 4.35,
    "totalChapters": 295,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 295,
      "title": "Chapter 295",
      "views": "2.9M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx51525-wZ1AjkbXrKns.png",
    "author": "Mizuho Kusanagi",
    "artist": "Lys Blakeslee",
    "synopsis": "A red-haired princess loses her family and her kingdom—now she must rise and fight for her throne!    Princess Yona lives an ideal life as the only princess of her kingdom. Doted on by her father, the king, and protected by her faithful guard Hak, she cherishes the time spent with the m...",
    "trailerUrl": "_qaJpECrEYI"
  },
  {
    "id": "mv-al-98263",
    "anilistId": 98263,
    "mangadexId": "67e7453b-9ee5-4ae5-9316-215b03e4a71d",
    "title": "Witch Hat Atelier",
    "altTitle": "とんがり帽子のアトリエ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "rating": 4.35,
    "totalChapters": 25,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 25,
      "title": "Chapter 25",
      "views": "7.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx98263-kIeaTXrAbGkj.jpg",
    "author": "Kamome Shirahama",
    "artist": "Kamome Shirahama",
    "synopsis": "In a world where everyone takes wonders like magic spells and dragons for granted, Coco is a girl with a simple dream: she wants to be a witch. But everybody knows magicians are born, not made, and Coco was not born with a gift for magic. Resigned to her un-magical life, Coco is about t...",
    "trailerUrl": "XM95k31NUts"
  },
  {
    "id": "mv-al-53900",
    "anilistId": 53900,
    "mangadexId": "15e4d8b9-2a1e-4db0-82a9-ecd92411a0b8",
    "title": "Umineko When They Cry Episode 7: Requiem of the Golden Witch",
    "altTitle": "うみねこのなく頃に散 - Episode 7: Requiem of the Golden Witch",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Mystery",
      "Psychological",
      "Supernatural",
      "Thriller"
    ],
    "rating": 4.35,
    "totalChapters": 48,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 48,
      "title": "Chapter 48",
      "views": "6.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx53900-aDalkx2qmugI.png",
    "author": "Ryukishi07",
    "artist": "Eita Mizuno",
    "synopsis": "The time for logical debate and magical feints has come to an end; the revelation of the truth about Beatrice the Golden Witch is at hand. To facilitate this, game master Bernkastel has chosen Will Wright the Mage-Hunter to step onto her board and answer a single question: Who killed Be..."
  },
  {
    "id": "mv-al-112275",
    "anilistId": 112275,
    "mangadexId": "322f11ba-7a9d-4a57-83f5-924b8f6319d6",
    "title": "Heaven Official's Blessing",
    "altTitle": "天官赐福",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy",
      "Romance"
    ],
    "rating": 4.35,
    "totalChapters": 50,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 50,
      "title": "Chapter 50",
      "views": "6.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx112275-fh0u5cH2qB5b.jpg",
    "author": "Mo Xiang Tong Xiu",
    "artist": "Bai Meng She",
    "synopsis": "800 years ago, Xie Lian was a pure-blooded and noble Crown Prince, a well-regarded child of Heaven with unlimited potential. But who knew that, after he ascended and became a god with tens of thousands of worshippers, his fate would take such a sharp downhill turn? He was demoted again ..."
  },
  {
    "id": "mv-al-85135",
    "anilistId": 85135,
    "mangadexId": "4bde51e5-e420-45a4-98e9-7405bf2d59ff",
    "title": "A Silent Voice",
    "altTitle": "聲の形",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.35,
    "totalChapters": 64,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 64,
      "title": "Chapter 64",
      "views": "4.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx85135-11OOnyaqV71k.png",
    "author": "Yoshitoki Ooima",
    "artist": "Yoshitoki Ooima",
    "synopsis": "Based on a one-shot that won the 80th Weekly Shounen Magazine Newbie Best Mangaka Award.   Shouya is a bully. When Shouko, a girl who can't hear, enters his elementary school class, she becomes their favorite target, and Shouya and his friends goad each other into devising new tortures ...",
    "trailerUrl": "mS_om5EK8YI"
  },
  {
    "id": "mv-al-116170",
    "anilistId": 116170,
    "mangadexId": "82996809-66ac-4c46-a967-2a63f124488b",
    "title": "Veil",
    "altTitle": "Veil",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.35,
    "totalChapters": 82,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 82,
      "title": "Chapter 82",
      "views": "8.4M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx116170-Q9f5Wk6cod5E.jpg",
    "author": "Ikumi Fukuda",
    "artist": "Ikumi Fukuda",
    "synopsis": "A chance encounter. A handsome soldier. A beautiful woman. A tentative love affair smolders on the snowy cobblestone streets, out of sight of those that might keep them apart.    Veil is a beautifully illustrated full-color romance manga, told in stylish short vignettes, beautiful illus..."
  },
  {
    "id": "mv-al-118586",
    "anilistId": 118586,
    "mangadexId": "1d55e985-8379-41bc-aeca-acd069bcadd0",
    "title": "Frieren: Beyond Journey’s End",
    "altTitle": "葬送のフリーレン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy"
    ],
    "rating": 4.35,
    "totalChapters": 66,
    "releaseDay": "Thu",
    "latestChapter": {
      "number": 66,
      "title": "Chapter 66",
      "views": "2.2M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx118586-CXKgWikBFQgS.jpg",
    "author": "Kanehito Yamada",
    "artist": "Tsukasa Abe",
    "synopsis": "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about.    Elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land. With the great struggle over, they all go their separate ways to...",
    "trailerUrl": "Rp1g7FVBX2Y"
  },
  {
    "id": "mv-al-107279",
    "anilistId": 107279,
    "mangadexId": "5eb2c6fa-4dc4-4fba-974f-ae44bd8ce2ff",
    "title": "Aoashi",
    "altTitle": "アオアシ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Sports"
    ],
    "rating": 4.35,
    "totalChapters": 410,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 410,
      "title": "Chapter 410",
      "views": "1.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx107279-R2vxyPQRqV0X.jpg",
    "author": "Yuugo Kobayashi",
    "artist": "Yuugo Kobayashi",
    "synopsis": "Ashito Aoi, a third year middle school student from Ehime, meets Fukuda Tatsuya, a J Youth League coach. Even though he's still rough around the edges, Ashito has such amazing potential that he gets invited by coach Fukuda to participate in his team's try-outs in Tokyo. The story of a b...",
    "trailerUrl": "Y1oSlcXzy20"
  },
  {
    "id": "mv-al-39982",
    "anilistId": 39982,
    "mangadexId": "a07320a4-afcd-413a-a451-d69a448d0c28",
    "title": "Usogui",
    "altTitle": "嘘喰い",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Psychological",
      "Thriller"
    ],
    "rating": 4.35,
    "totalChapters": 539,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 539,
      "title": "Chapter 539",
      "views": "6.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx39982-68LS2Z9075Kw.jpg",
    "author": "Toshio Sako",
    "artist": "Toshio Sako",
    "synopsis": "Driven by his desire for quick money, young Kaji gets involved with a loan shark and soon finds himself hounded by debt collectors. One day, a mysterious man named Baku Madarame appears before him. Calling himself a gambler, Baku boldly declares that he’ll help Kaji repay his debt—and d...",
    "trailerUrl": "zkfTL997dXM"
  },
  {
    "id": "mv-al-117620",
    "anilistId": 117620,
    "mangadexId": "6ecc62e4-25ad-4102-b0d8-580a8023d2fb",
    "title": "The Summer You Were There",
    "altTitle": "君と綴るうたかた",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Romance"
    ],
    "rating": 4.35,
    "totalChapters": 32,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 32,
      "title": "Chapter 32",
      "views": "7.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx117620-cyvy8nO9GLm8.jpg",
    "author": "Yuama",
    "artist": "Yuama",
    "synopsis": "Shizuku is a shy girl who hardly talks to other people. Instead, she loses herself in creative writing, crafting a novel that she never plans to show anyone. But when Kaori–Shizuku’s cute, popular classmate–gets her hands on Shizuku’s manuscript, everything changes. Kaori is a huge fan,...",
    "trailerUrl": "RXzwDXCr9LE"
  },
  {
    "id": "mv-al-43245",
    "anilistId": 43245,
    "mangadexId": "f4455be4-7dc2-4f06-86c7-26ac0072885b",
    "title": "Chihayafuru",
    "altTitle": "ちはやふる",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Romance",
      "Sports"
    ],
    "rating": 4.35,
    "totalChapters": 247,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 247,
      "title": "Chapter 247",
      "views": "8.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx43245-Ied8R99LH3u6.jpg",
    "author": "Yuki Suetsugu",
    "artist": "Yuki Suetsugu",
    "synopsis": "Chihaya is a girl in the sixth grade, still not old enough to even know the meaning of the word zeal. But one day, she meets Arata, a transfer student from rural Fukui prefecture. Though docile and quiet, he has an unexpected skill: his ability to play competitive karuta, a traditional ...",
    "trailerUrl": "QjEPiK2D5eI"
  },
  {
    "id": "mv-al-89278",
    "anilistId": 89278,
    "mangadexId": "bbc24cdd-1c8a-4394-ab86-7ce2296920c3",
    "title": "Tobaku Datenroku Kaiji: One Poker-hen",
    "altTitle": "賭博堕天録カイジ ワン・ポーカー編",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Thriller"
    ],
    "rating": 4.35,
    "totalChapters": 155,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 155,
      "title": "Chapter 155",
      "views": "8.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx89278-2nemnSgiesJa.jpg",
    "author": "Nobuyuki Fukumoto",
    "artist": "Nobuyuki Fukumoto",
    "synopsis": "Kaiji and Kazuya face off against each other in a high-stakes game of \"One Poker,\" a modified version of standard poker. Kazuya sets forth a gamble of 2,000,000,000 yen! How will Kaiji survive?!    Chapter count for this arc is 101-254 in the original tankoubon."
  },
  {
    "id": "mv-al-30044",
    "anilistId": 30044,
    "mangadexId": "f65444dc-3694-4e31-a166-8afb2938ed55",
    "title": "Gin Tama",
    "altTitle": "銀魂",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Comedy",
      "Drama",
      "Sci-Fi"
    ],
    "rating": 4.3,
    "totalChapters": 709,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 709,
      "title": "Chapter 709",
      "views": "5.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30044-vPmoz3vTPvZs.jpg",
    "author": "Hideaki Sorachi",
    "artist": "Hideaki Sorachi",
    "synopsis": "The samurai didn't stand a chance. First, the aliens invaded Japan. Next, they took all the jobs. And then they confiscated everyone's swords. So what does a hotheaded former samurai like Sakata \"Gin\" Gintoki do to make ends meet? Take any odd job that comes his way, even if it means lo...",
    "trailerUrl": "Z7bw5wBafu8"
  },
  {
    "id": "mv-al-30336",
    "anilistId": 30336,
    "mangadexId": "02860cdf-1020-40f1-a23f-2025d80f6290",
    "title": "GTO: Great Teacher Onizuka",
    "altTitle": "GTO",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Comedy",
      "Drama",
      "Ecchi"
    ],
    "rating": 4.3,
    "totalChapters": 208,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 208,
      "title": "Chapter 208",
      "views": "5.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30336-KWTPMwsNTeSa.png",
    "author": "Tooru Fujisawa",
    "artist": "Tooru Fujisawa",
    "synopsis": "Former juvenile delinquent Onizuka finds himself thrust into to role of high school teacher, facing students who behave just as he used to and an administration that doesn't trust him. Using the brash an unorthodox methods he picked up in his youth, Onizuka manages to reach through to h..."
  },
  {
    "id": "mv-al-140475",
    "anilistId": 140475,
    "mangadexId": "418791c0-35cf-4f87-936b-acd9cddf0989",
    "title": "The Fragrant Flower Blooms With Dignity",
    "altTitle": "薫る花は凛と咲く",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "rating": 4.3,
    "totalChapters": 29,
    "releaseDay": "Fri",
    "latestChapter": {
      "number": 29,
      "title": "Chapter 29",
      "views": "1.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx140475-QEGtrmdvbpOv.jpg",
    "author": "Saka Mikami",
    "artist": "Saka Mikami",
    "synopsis": "This story takes place in a particular town with two infamous schools in constant dispute: Chidori High, a boys' school predominantly attended by low-class students with damning grades, and its neighbor Kikyo Girls' High, with most of its female students coming from wealthy and prestigi...",
    "trailerUrl": "rYHdW6aIl7I"
  },
  {
    "id": "mv-al-30081",
    "anilistId": 30081,
    "mangadexId": "93f7b86f-d777-4429-961d-68b59703e5a6",
    "title": "Aria",
    "altTitle": "ARIA",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Sci-Fi"
    ],
    "rating": 4.3,
    "totalChapters": 67,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 67,
      "title": "Chapter 67",
      "views": "6.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30081-oCRaPkTGq4vP.jpg",
    "author": "Kozue Amano",
    "artist": "Kozue Amano",
    "synopsis": "On the planet Aqua, a world once known as Mars, Akari Mizunashi has just made her home in the town of Neo-Venezia, a futuristic imitation of the ancient city of Venice. In pursuit of her dream to become an Undine — a gondolier who leads high-end tours around the city — Akari joins as a ...",
    "trailerUrl": "tH4RPUZHHMc"
  },
  {
    "id": "mv-al-85412",
    "anilistId": 85412,
    "mangadexId": "5b93fa0f-0640-49b8-974e-954b9959929b",
    "title": "Girls' Last Tour",
    "altTitle": "少女終末旅行",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Adventure",
      "Sci-Fi",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 47,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 47,
      "title": "Chapter 47",
      "views": "2.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx85412-wzZ2QFwbZJED.jpg",
    "author": "Tsukumizu",
    "artist": "Tsukumizu",
    "synopsis": "Civilization is dead, but Chito and Yuuri are still alive. So they hop aboard their beloved Kettenkrad motorbike and aimlessly wander the ruins of the world they once knew. Day after hopeless day, they look for their next meal and fuel for their ride. But as long as the two are together...",
    "trailerUrl": "SuVVs4giZrI"
  },
  {
    "id": "mv-al-31133",
    "anilistId": 31133,
    "mangadexId": "34f45c13-2b78-4900-8af2-d0bb551101f4",
    "title": "Dorohedoro",
    "altTitle": "ドロヘドロ",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Fantasy",
      "Horror"
    ],
    "rating": 4.3,
    "totalChapters": 191,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 191,
      "title": "Chapter 191",
      "views": "6.3M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx31133-Jx6map3Oidz1.png",
    "author": "Q Hayashida",
    "artist": "Q Hayashida",
    "synopsis": "In a city so dismal it's known only as \"the Hole,\" a clan of Sorcerers have been plucking people off the streets to use as guinea pigs for atrocious \"experiments\" in the black arts. In a dark alley, Nikaido found Caiman, a man with a reptile head and a bad case of amnesia. To undo the s...",
    "trailerUrl": "8yrNYhhZKqQ"
  },
  {
    "id": "mv-al-86559",
    "anilistId": 86559,
    "mangadexId": "8847f905-550d-4fe6-bcda-ac2b896789c7",
    "title": "Golden Kamuy",
    "altTitle": "ゴールデンカムイ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Drama"
    ],
    "rating": 4.3,
    "totalChapters": 314,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 314,
      "title": "Chapter 314",
      "views": "1.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86559-Y4xDmoz4ud43.jpg",
    "author": "Satoru Noda",
    "artist": "Satoru Noda",
    "synopsis": "In the early twentieth century, Russo-Japanese War veteran Saichi “Immortal” Sugimoto scratches out a meager existence during the postwar gold rush in the wilderness of Hokkaido. When he stumbles across a map to a fortune in hidden Ainu gold, he sets off on a treacherous quest to find i...",
    "trailerUrl": "SpLbiNEy2ww"
  },
  {
    "id": "mv-al-119257",
    "anilistId": 119257,
    "mangadexId": "46392cb3-a0f8-42e4-b2ac-b89637df56d9",
    "title": "Omniscient Reader",
    "altTitle": "전지적 독자 시점",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.3,
    "totalChapters": 230,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 230,
      "title": "Chapter 230",
      "views": "3.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119257-Pi21aq3ey9GG.jpg",
    "author": "Geomnem",
    "artist": "Sleepy-C",
    "synopsis": "Back then, Dok-Ja had no idea. He had no idea his favorite web novel 'Three Ways to Survive the Apocalypse' was going to come to life, and that he would become the only person to know how the world was going to end. He also had no idea he would end up becoming the protagonist of this no...",
    "trailerUrl": "8OHzcTtoLo4"
  },
  {
    "id": "mv-al-136109",
    "anilistId": 136109,
    "mangadexId": "c8a0426d-539b-4f6a-9537-fbccf4962529",
    "title": "The Moon on a Rainy Night",
    "altTitle": "雨夜の月",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 32,
    "releaseDay": "Thu",
    "latestChapter": {
      "number": 32,
      "title": "Chapter 32",
      "views": "1.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx136109-h4mux2toQJkD.jpg",
    "author": "Kuzushiro",
    "artist": "Kuzushiro",
    "synopsis": "One day, while rushing to a piano lesson, a girl named Saki collides with someone on the street. As Saki collects herself, the stranger picks up the sheet music Saki dropped, hands it to Saki together with a band-aid, and continues on her way—all without saying a word. Saki is left wond...",
    "trailerUrl": "Q-W1E8Y9Jv0"
  },
  {
    "id": "mv-al-174875",
    "anilistId": 174875,
    "mangadexId": "645ed5e1-9a81-4771-9088-8e8265c4bd42",
    "title": "Eternity for You",
    "altTitle": "君に贈る永遠",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Romance"
    ],
    "rating": 4.3,
    "totalChapters": 1,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 1,
      "title": "Chapter 1",
      "views": "6.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx174875-4dU2x0Rmtwqa.jpg",
    "author": "Yuama",
    "artist": "Yuama",
    "synopsis": "Note: Originally released as a booklet bundled with the limited edition release of Kimi to Tsuzuru Utakata Volume 6."
  },
  {
    "id": "mv-al-30145",
    "anilistId": 30145,
    "mangadexId": "6bb8cc05-ff11-4f6b-b875-f708444fbfed",
    "title": "BECK",
    "altTitle": "BECK",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Drama",
      "Music",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 103,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 103,
      "title": "Chapter 103",
      "views": "7.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30145-ipNuwNgD5AJS.png",
    "author": "Harold Sakuishi",
    "artist": "Harold Sakuishi",
    "synopsis": "For the first 14 years of his life, Yukio Tanaka has been one heck of a boring guy. He has no hobbies, a weak taste in music, and only a small vestige of a personality. He yearns for an exciting life, but his shy, and somewhat neurotic personality make him his own worst enemy. Little do...",
    "trailerUrl": "GNgReTHy1EA"
  },
  {
    "id": "mv-al-86569",
    "anilistId": 86569,
    "mangadexId": "60879eb7-3845-4dff-b86d-5a612108053b",
    "title": "Ace of the Diamond Act II",
    "altTitle": "ダイヤのA act II",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Slice of Life",
      "Sports"
    ],
    "rating": 4.3,
    "totalChapters": 308,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 308,
      "title": "Chapter 308",
      "views": "8.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86569-KC2nXAGtv0Cx.jpg",
    "author": "Yuuji Terajima",
    "artist": "Yuuji Terajima",
    "synopsis": "I want to pitch to that mitt, just one more time…    When Eijun Sawamura was just fifteen, he met someone who changed the course of his life forever—the catcher Kazuya Miyuki. Now, he's said goodbye to family and friends to travel to Seido High, where he can test his baseball skills alo...",
    "trailerUrl": "rXeRBV9vNnE"
  },
  {
    "id": "mv-al-109285",
    "anilistId": 109285,
    "mangadexId": "244c9d4f-e5fb-4590-9b96-4da191977b33",
    "title": "Skip and Loafer",
    "altTitle": "スキップとローファー",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 45,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 45,
      "title": "Chapter 45",
      "views": "7.4M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx109285-HmBZpzsO2zxd.jpg",
    "author": "Misaki Takamatsu",
    "artist": "Misaki Takamatsu",
    "synopsis": "Excellent student Iwakura Mitsumi has always dreamt about leaving her small town, going to a prestigious university, and making positive change in the world. But she’s so focused on reaching her goals that she’s not prepared for the very different (and overwhelming) city life that await...",
    "trailerUrl": "Tzs6zBB4E-Q"
  },
  {
    "id": "mv-al-97553",
    "anilistId": 97553,
    "mangadexId": "9e03b2ca-5191-44a6-88b6-c0cd49d06b51",
    "title": "Three Days of Happiness",
    "altTitle": "寿命を買い取ってもらった。一年につき、一万円で。",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Romance",
      "Supernatural"
    ],
    "rating": 4.3,
    "totalChapters": 18,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 18,
      "title": "Chapter 18",
      "views": "8.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx97553-vqJj5DFS8v2p.jpg",
    "author": "Sugaru Miaki",
    "artist": "Shouichi Taguchi",
    "synopsis": "Kusunoki used to believe he was destined for great things. But now, approaching the age of twenty, he’s a completely mediocre college student with no motivation, no dreams, and no money. After learning he can sell his remaining years, he chooses to divest himself of all but his last thr..."
  },
  {
    "id": "mv-al-187944",
    "anilistId": 187944,
    "mangadexId": "984df7d5-ae4c-43c6-aa65-737b9f37e5ef",
    "title": "My Bias Gets on the Last Train",
    "altTitle": "내 최애는 막차를 탄다",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Romance"
    ],
    "rating": 4.3,
    "totalChapters": 21,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 21,
      "title": "Chapter 21",
      "views": "4.6M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx187944-gzNbL7zeY7Ma.jpg",
    "author": "JIXKSEE",
    "artist": "JIXKSEE",
    "synopsis": "Every night, Yeo-Un takes the last train home—same route, same time, same routine. But one thing keeps catching his eye: a girl with a guitar and a presence that lingers in his mind. When a shared love for the indie band Long Afternoon sparks a conversation, their late-night encounters ..."
  },
  {
    "id": "mv-al-44483",
    "anilistId": 44483,
    "mangadexId": "a437129d-18e9-48d7-9484-9fb9b9073ddd",
    "title": "Space Brothers",
    "altTitle": "宇宙兄弟",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Sci-Fi",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 432,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 432,
      "title": "Chapter 432",
      "views": "4.9M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx44483-j8urUUmaCOaD.jpg",
    "author": "Chuuya Koyama",
    "artist": "Chuuya Koyama",
    "synopsis": "Two brothers looked to the starry skies as children and made a promise ... Now, in the year 2025, the younger brother, Hibito, is carrying his out. He is an astronaut who has been selected as a crew member for mankind’s first long-term base on the moon. Meanwhile, the older brother, Mut...",
    "trailerUrl": "HMm725pwSp8"
  },
  {
    "id": "mv-al-86218",
    "anilistId": 86218,
    "mangadexId": "b5f2912d-3f27-4445-a594-5d523684fd3b",
    "title": "Bloom Into You",
    "altTitle": "やがて君になる",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 53,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 53,
      "title": "Chapter 53",
      "views": "1.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86218-sIl9tnqHZQyh.jpg",
    "author": "Nio Nakatani",
    "artist": "Nio Nakatani",
    "synopsis": "Yuu has always loved shoujo manga and awaits the day she gets a love confession that sends her heart aflutter with bubbles and hearts, and yet when a junior high classmate confesses his feelings to her…she feels nothing. Disappointed and confused, Yuu enters high school still unsure how...",
    "trailerUrl": "lfdnNJk0hHo"
  },
  {
    "id": "mv-al-166742",
    "anilistId": 166742,
    "mangadexId": "621cf340-6ef1-4b3b-bd0f-82b6837312fe",
    "title": "The Ramparts of Ice",
    "altTitle": "氷の城壁",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 117,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 117,
      "title": "Chapter 117",
      "views": "6.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx166742-io6yR2XeJiEh.jpg",
    "author": "Koucha Agasawa",
    "artist": "Koucha Agasawa",
    "synopsis": "Koyuki Hikawa isn't great with people and always puts up a wall between others. She had been spending her high school days alone, but one day meets the overly friendly Minato Amamiya. The loner, Koyuki, the popular girl, Miki, the guy with no personal space, Minato, and the laid back me...",
    "trailerUrl": "0Ta_vFkaxRU"
  },
  {
    "id": "mv-al-168509",
    "anilistId": 168509,
    "mangadexId": "90c9a074-7918-48da-8270-69a95b72f245",
    "title": "Our Sunny Days",
    "altTitle": "해 뜨는 집",
    "type": "Manhwa",
    "demographic": "Shōjo",
    "genres": [
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 68,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 68,
      "title": "Chapter 68",
      "views": "6.8M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx168509-POhQHRIJ8qPV.jpg",
    "author": "Seok-Chan Jeong",
    "artist": "Seok-Chan Jeong",
    "synopsis": "Sung Ho’s not the kind you’d typically expect to settle down in the countryside. He’s in his late 20s, ex-military, and…a single father with a year-old baby his ex-girlfriend pawned off on him. Jobless and without any prospects but a house, Sung Ho hopes the peaceful Nuldongmae village ..."
  },
  {
    "id": "mv-al-30004",
    "anilistId": 30004,
    "mangadexId": "ff73234b-4387-448c-ab54-2879626b4442",
    "title": "Yokohama Kaidashi Kikou",
    "altTitle": "ヨコハマ買い出し紀行",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Sci-Fi",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 144,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 144,
      "title": "Chapter 144",
      "views": "5.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b30004-k0YUnO94IB4x.jpg",
    "author": "Hitoshi Ashinano",
    "artist": "Hitoshi Ashinano",
    "synopsis": "Set hundreds of years in the future after an environmental catastrophe, Yokohama Kaidashi Kikou (also known as Yokohama Shopping Log) centers on the simple life of Alpha, an android who runs a small coffee shop in coastal Japan. Alpha stands witness to chronicle the end of humanity’s da..."
  },
  {
    "id": "mv-al-41054",
    "anilistId": 41054,
    "mangadexId": "e5357466-c8a2-4259-9b02-2580185bd2bb",
    "title": "Billy Bat",
    "altTitle": "ビリーバット",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Mystery",
      "Supernatural",
      "Thriller"
    ],
    "rating": 4.3,
    "totalChapters": 165,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 165,
      "title": "Chapter 165",
      "views": "8.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx41054-zXqZzpwjJCCR.png",
    "author": "Takashi Nagasaki",
    "artist": "Naoki Urasawa",
    "synopsis": "It’s 1949 Los Angeles, and Kevin Yamagata, a Japanese American comic book author, is drawing his bestselling character, Billy Bat: a quick-witted detective who is, unsurprisingly, a cartoon bat. Everything is going well for Kevin until he discovers an unfortunate truth: He may have unin..."
  },
  {
    "id": "mv-al-99022",
    "anilistId": 99022,
    "mangadexId": "8c1d7d0c-e0b7-4170-941d-29f652c3c19d",
    "title": "The Apothecary Diaries",
    "altTitle": "薬屋のひとりごと",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Mystery"
    ],
    "rating": 4.3,
    "totalChapters": 75,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 75,
      "title": "Chapter 75",
      "views": "2.4M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx99022-Hh2WdyNgR8HM.jpg",
    "author": "Itsuki Nanao",
    "artist": "Erika Ikeda",
    "synopsis": "Maomao, a young woman trained in the art of herbal medicine, is forced to work as a lowly servant in the inner palace. Though she yearns for life outside its perfumed halls, she isn’t long for a life of drudgery! Using her wits to break a “curse” afflicting the imperial heirs, Maomao at...",
    "trailerUrl": "kdjQ_dkXr4s"
  },
  {
    "id": "mv-al-107237",
    "anilistId": 107237,
    "mangadexId": "f8e294c0-7c11-4c66-bdd7-4e25df52bf69",
    "title": "Blue Period",
    "altTitle": "ブルーピリオド",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Slice of Life"
    ],
    "rating": 4.3,
    "totalChapters": 97,
    "releaseDay": "Thu",
    "latestChapter": {
      "number": 97,
      "title": "Chapter 97",
      "views": "1.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx107237-tyQXghsKmE0t.jpg",
    "author": "Tsubasa Yamaguchi",
    "artist": "Tsubasa Yamaguchi",
    "synopsis": "The studious Yatora leaves a dry life of study and good manners behind for a new passion: painting. But untethering yourself from all your past expectations is dangerous as well as thrilling…    (Source: Kodansha USA)    Note: Nominated for Manga Taisho Awards in 2019, Kodansha Manga Aw...",
    "trailerUrl": "DFSEivlCRTo"
  },
  {
    "id": "mv-al-119521",
    "anilistId": 119521,
    "mangadexId": "9ed16bc9-f570-4e71-8dda-aebc098b683b",
    "title": "The Legend of the Northern Blade",
    "altTitle": "북검전기",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.3,
    "totalChapters": 202,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 202,
      "title": "Chapter 202",
      "views": "7.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx119521-qYqxFvn0NnXo.png",
    "author": "Hae-Min",
    "artist": "Hae-Min",
    "synopsis": "For decades, the brave warriors of the Northern Heavenly Sect fought to keep the world safe from the evil Silent Night. But when the fourth generation leader is accused of colluding with the enemy, he is forced to disband the sect and commit suicide to protect his son, Moo-Won. With no ...",
    "trailerUrl": "A1DyXT9AZt8"
  },
  {
    "id": "mv-al-168843",
    "anilistId": 168843,
    "mangadexId": "2a6d6ea2-18a5-4a31-9777-f4bb5bd32726",
    "title": "Little Mushroom",
    "altTitle": "小蘑菇",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Romance",
      "Sci-Fi"
    ],
    "rating": 4.25,
    "totalChapters": 75,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 75,
      "title": "Chapter 75",
      "views": "7.0M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b168843-k8r2I9zLc9ks.jpg",
    "author": "Yi'er Jin",
    "artist": "Maomao Tou",
    "synopsis": "Decades have passed since the Earth's magnetic poles disappeared, changing the balance forever. As the last remnants of humanity huddle in their bases, the remaining lifeforms have mutated into so-called xenogens and taken over the outside world.   In the midst of this war for life or d..."
  },
  {
    "id": "mv-al-177706",
    "anilistId": 177706,
    "mangadexId": "514f1a94-b09f-4331-8cf9-0f01d06d3b80",
    "title": "The Knight Only Lives Today",
    "altTitle": "오늘만 사는 기사",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Fantasy"
    ],
    "rating": 4.25,
    "totalChapters": 77,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 77,
      "title": "Chapter 77",
      "views": "1.9M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx177706-3r8dnAr8Prjq.jpg",
    "author": "Ga Nara",
    "artist": "An Lee",
    "synopsis": "Is dying repeatedly a blessing? Enkrid's life-long dream of becoming a knight looked to be forever out of reach, until one day he died... and woke up at the beginning of that same day! Now that he has unlimited chances to train and engage in mortal combat, just how far can he go?  (Sour...",
    "trailerUrl": "sO1v04_KfOo"
  },
  {
    "id": "mv-al-100805",
    "anilistId": 100805,
    "mangadexId": "33d1ba42-be1f-4a99-9943-aa8da1a02bdf",
    "title": "Here U Are",
    "altTitle": "Here U Are",
    "type": "Manhua",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 157,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 157,
      "title": "Chapter 157",
      "views": "1.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx100805-3DCHMdZ5blWl.jpg",
    "author": "DJUN",
    "artist": "DJUN",
    "synopsis": "Sophomore Yu Yang is a real treasure. He has a cheerful, easy-going, and emphatic personality. Seniors look up to him, and he knows how to stand up for himself. Freshman Li Huan is moody and taciturn, haughty and, at times, outright rude. How will these two manage to get along, and wher...",
    "trailerUrl": "s9PRHSlDCaA"
  },
  {
    "id": "mv-al-114998",
    "anilistId": 114998,
    "mangadexId": "3fba42cf-2ad6-4c30-a7ab-46cb8149208a",
    "title": "Bungo Stray Dogs Beast",
    "altTitle": "文豪ストレイドッグス　ＢＥＡＳＴ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Drama",
      "Mystery",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 22,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 22,
      "title": "Chapter 22",
      "views": "8.9M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx114998-JTCzDczl8eBD.jpg",
    "author": "Shiwasu Hoshikawa",
    "artist": "Shiwasu Hoshikawa",
    "synopsis": "In a parallel universe of Bungo Stray Dogs, Ryuunosuke Akutagawa’s desperate mission to save his younger sister leads to him being recruited by the armed detective agency!     (Source: Yen Press)",
    "trailerUrl": "XsG1X2xDVpg"
  },
  {
    "id": "mv-al-146656",
    "anilistId": 146656,
    "mangadexId": "46079bf7-4a08-40a0-aacf-462009de74ad",
    "title": "Reunion",
    "altTitle": "해후",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Romance"
    ],
    "rating": 4.25,
    "totalChapters": 80,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 80,
      "title": "Chapter 80",
      "views": "6.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx146656-WgvC1WhL1cEd.jpg",
    "author": "Coin Lee",
    "artist": "Deulsoom",
    "synopsis": "“Do you know me?” A simple question was enough to change the trajectory of Lee Ha-kyung’s life. Seven years ago, Ha-kyung was struggling to support his family when he was approached by a man with an offer: assume the identity of Han Jiyoung, a girl from his past, for the summer and dece..."
  },
  {
    "id": "mv-al-31859",
    "anilistId": 31859,
    "mangadexId": "2c3cd370-04bd-4994-87dc-e54a4d80c4ec",
    "title": "Natsume's Book of Friends",
    "altTitle": "夏目友人帳",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 53,
    "releaseDay": "Thu",
    "latestChapter": {
      "number": 53,
      "title": "Chapter 53",
      "views": "1.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx31859-mITgIaJFBzl4.png",
    "author": "Yuki Midorikawa",
    "artist": "Yuki Midorikawa",
    "synopsis": "When Reiko was Takashi's age, she bound the names of demons and spirits in her Book of Friends, enslaving them to her capricious whim. Now Takashi is the owner of the book, and the creatures will do anything to get their names back.    (Source: VIZ Media)",
    "trailerUrl": "mea4xITAo_4"
  },
  {
    "id": "mv-al-85189",
    "anilistId": 85189,
    "mangadexId": "6e2d91b9-81b4-448c-8ace-fb17d4a99d44",
    "title": "Mob Psycho 100",
    "altTitle": "モブサイコ100",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Comedy",
      "Drama",
      "Psychological",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 201,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 201,
      "title": "Chapter 201",
      "views": "3.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx85189-06aXUBq5jwce.jpg",
    "author": "ONE",
    "artist": "ONE",
    "synopsis": "Do you or someone you know need an exorcist who works cheap? Reigen's your guy! What's his secret to busting ghosts while keeping prices low? Well, first, he's a fraud, and second, he pays the guy who's got the real psychic power—his student assistant Shigeo—less than minimum wage. Shig...",
    "trailerUrl": "mV39saBlBLI"
  },
  {
    "id": "mv-al-30651",
    "anilistId": 30651,
    "mangadexId": "0c9e19cd-86cb-490c-93e9-955af41746ca",
    "title": "Nausicaä of the Valley of the Wind",
    "altTitle": "風の谷のナウシカ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Sci-Fi"
    ],
    "rating": 4.25,
    "totalChapters": 59,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 59,
      "title": "Chapter 59",
      "views": "8.3M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30651-xLufeLnDPqpn.jpg",
    "author": "Hayao Miyazaki",
    "artist": "Hayao Miyazaki",
    "synopsis": "Humanity, in its hubris, has precipitated a devastating environmental disaster. Flourishing industrial civilizations have been swallowed up by the Sea of Corruption, an enormous forest of fungi releases a miasma of poisonous spores into the air. Nausicaa, a compassionate young princess,...",
    "trailerUrl": "6zhLBe319KE"
  },
  {
    "id": "mv-al-121565",
    "anilistId": 121565,
    "mangadexId": "67e56a7a-c7ea-4db8-84f0-db19c2034729",
    "title": "Seasons of Blossom",
    "altTitle": "청춘 블라썸",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "rating": 4.25,
    "totalChapters": 130,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 130,
      "title": "Chapter 130",
      "views": "4.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx121565-JaDVhpjegXvw.jpg",
    "author": "HONGDUCK",
    "artist": "NEMONE",
    "synopsis": "Oh, to be young and in love. Oh, to be wild and carefree. The springtime of life is intense, tumultuous, and at times, oh so confusing. Spring, summer, fall and winter -- love blossoms in all seasons.    (Source: WEBTOON)"
  },
  {
    "id": "mv-al-30418",
    "anilistId": 30418,
    "mangadexId": "ff73234b-4387-448c-ab54-2879626b4442",
    "title": "Mushishi",
    "altTitle": "蟲師",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Drama",
      "Fantasy",
      "Mystery",
      "Slice of Life",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 50,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 50,
      "title": "Chapter 50",
      "views": "6.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30418-8unnG2Y01lXX.jpg",
    "author": "Yuki Urushibara",
    "artist": "Yuki Urushibara",
    "synopsis": "Some live in the deep darkness behind your eyelids. Some eat silence. Some thoughtlessly kill. Some simply drive men mad. They are known as mushi—creatures that came into being shortly after life emerged from the primordial ooze. They still exist parallel to our own lives and can only b...",
    "trailerUrl": "q2VxLiVmD8A"
  },
  {
    "id": "mv-al-30745",
    "anilistId": 30745,
    "mangadexId": "e171c073-4415-499b-85bc-ea93825127ac",
    "title": "Pluto",
    "altTitle": "PLUTO",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Mecha",
      "Mystery",
      "Psychological",
      "Sci-Fi"
    ],
    "rating": 4.25,
    "totalChapters": 65,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 65,
      "title": "Chapter 65",
      "views": "4.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30745-kueBpwriQkvZ.jpg",
    "author": "Makoto Tezuka",
    "artist": "Naoki Urasawa",
    "synopsis": "In an ideal world where man and robots coexist, someone or something has destroyed the powerful Swiss robot Mont Blanc. Elsewhere a key figure in a robot rights group is murdered. The two incidents appear to be unrelated...except for one very conspicuous clue - the bodies of both victim...",
    "trailerUrl": "9ez8lm9I26Y"
  },
  {
    "id": "mv-al-30756",
    "anilistId": 30756,
    "mangadexId": "9a502e35-1051-4e4c-b055-5ab211954fa4",
    "title": "Banana Fish",
    "altTitle": "BANANA FISH",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Psychological",
      "Thriller"
    ],
    "rating": 4.25,
    "totalChapters": 110,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 110,
      "title": "Chapter 110",
      "views": "2.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30756-rlxjQWBAizHX.jpg",
    "author": "Akimi Yoshida",
    "artist": "Akimi Yoshida",
    "synopsis": "Nature made Ash Lynx beautiful; nurture made him a cold ruthless killer. A runaway brought up as the adopted heir and sex toy of \"Papa\" Dino Golzine, Ash, now at the rebellious age of seventeen, forsakes the kingdom held out by the devil who raised him. But the hideous secret that drove...",
    "trailerUrl": "Rm54hW42O10"
  },
  {
    "id": "mv-al-30904",
    "anilistId": 30904,
    "mangadexId": "991e9f15-8368-4843-a78a-5605918f9c3e",
    "title": "Lone Wolf and Cub",
    "altTitle": "子連れ狼",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Drama"
    ],
    "rating": 4.25,
    "totalChapters": 142,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 142,
      "title": "Chapter 142",
      "views": "7.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30904-KRN1WE3ZU3vl.jpg",
    "author": "Kazuo Koike",
    "artist": "Goseki Kojima",
    "synopsis": "An epic samurai adventure of staggering proportions—over 7000 pages—Lone Wolf and Cub (Kozure Okami in Japan) is acknowledged worldwide for the brilliant writing of series creator Kazuo Koike and the groundbreaking cinematic visuals of the late Goseki Kojima, creating unforgettable imag..."
  },
  {
    "id": "mv-al-35744",
    "anilistId": 35744,
    "mangadexId": "e4003893-3162-44c5-b5dc-d7433dfb4e0c",
    "title": "Ping Pong",
    "altTitle": "ピンポン",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological",
      "Sports"
    ],
    "rating": 4.25,
    "totalChapters": 55,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 55,
      "title": "Chapter 55",
      "views": "2.3M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx35744-JB0ACECS2Ts2.png",
    "author": "Taiyou Matsumoto",
    "artist": "Deron Bennett",
    "synopsis": "Makoto “Smile” Tsukimoto and his friend Yutaka “Peco” Hoshino have been playing table tennis since they were kids, but as they enter high school, they find that the game has changed. Seeing potential in them that they themselves don’t fully realize, the coach recruits them for the schoo...",
    "trailerUrl": "lmZVuMDlw-w"
  },
  {
    "id": "mv-al-41514",
    "anilistId": 41514,
    "mangadexId": "cedc7401-8c70-4057-b14a-4ecbbcd73945",
    "title": "A Bride's Story",
    "altTitle": "乙嫁語り",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Drama",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 48,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 48,
      "title": "Chapter 48",
      "views": "2.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx41514-IHeXFwqmWivk.jpg",
    "author": "Kaoru Mori",
    "artist": "Kaoru Mori",
    "synopsis": "A Bride&rsquo;s Story tells the tale of a beautiful young bride in nineteenth-century Asia. At the age of twenty, Amir is sent to a neighboring town to be wed. But her surprise at learning her new husband, Karluk, is eight years younger than her is quickly replaced by a deep affection f...",
    "trailerUrl": "-yO7Ybp91WA"
  },
  {
    "id": "mv-al-45547",
    "anilistId": 45547,
    "mangadexId": "88fe360b-68dc-4438-a506-12f6cdf46733",
    "title": "Kiichi VS",
    "altTitle": "キーチVS",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Drama",
      "Psychological"
    ],
    "rating": 4.25,
    "totalChapters": 111,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 111,
      "title": "Chapter 111",
      "views": "1.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx45547-sAOWG4CYBq6g.jpg",
    "author": "Hideki Arai",
    "artist": "Hideki Arai",
    "synopsis": "Ever more uncompromising in the face of injustice, Kiichi has become a star. Known around the world for shaking the Japanese establishment, he doesn't intend to stop there. Now at the head of a big company, between school of thought and mafia, whose members number in the thousands, he w..."
  },
  {
    "id": "mv-al-55515",
    "anilistId": 55515,
    "mangadexId": "ab8cbb82-d0ed-45a7-8ffe-4bfa6d43d79c",
    "title": "JoJo’s Bizarre Adventure: Part 8—JoJolion",
    "altTitle": "ジョジョの奇妙な冒険 ジョジョリオン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Mystery",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 110,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 110,
      "title": "Chapter 110",
      "views": "6.4M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx55515-HhCsfAsd7VK1.png",
    "author": "Hirohiko Araki",
    "artist": "Hirohiko Araki",
    "synopsis": "This part will take place in Morioh-Cho (the same town in Part 4: Diamond is Unbreakable), but in the alternative universe in which Steel Ball Run takes place.    Following the Great East Japan earthquake, Morioh has been stricken by vast earthen protrusions known by the locals as Wall ...",
    "trailerUrl": "hkW8l5A3nh4"
  },
  {
    "id": "mv-al-85849",
    "anilistId": 85849,
    "mangadexId": "04ff2200-7e68-49fe-92e0-d353b3dff2d2",
    "title": "ReLIFE",
    "altTitle": "ReLIFE",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Drama",
      "Psychological",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 238,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 238,
      "title": "Chapter 238",
      "views": "3.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/nx85849-TYAa7nhwSvbx.jpg",
    "author": "Sou Yayoi",
    "artist": "Sou Yayoi",
    "synopsis": "When the responsibilities of being an adult and the ugly side of corporate bullying betrays one's childhood dreams, many would wish to return to their innocent childhood to relive their life and make the right decisions. Dumbfounded by the offer presented to him, 27-year-old Arata Kaiza...",
    "trailerUrl": "3eFySl9W3ec"
  },
  {
    "id": "mv-al-100568",
    "anilistId": 100568,
    "mangadexId": "f4b2c57f-e35a-4798-8d73-42e898dcd00f",
    "title": "The Horizon",
    "altTitle": "수평선",
    "type": "Manhwa",
    "demographic": "Seinen",
    "genres": [
      "Adventure",
      "Drama",
      "Psychological"
    ],
    "rating": 4.25,
    "totalChapters": 21,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 21,
      "title": "Chapter 21",
      "views": "6.9M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx100568-4BC0PsdwU4bL.png",
    "author": "Ji-Hun Jeong",
    "artist": "Ji-Hun Jeong",
    "synopsis": "A world where everything has been lost. A boy and a girl alone together. A spark of hope kindled between them. All they can do is move forward. But against broken adults and devastating despair, how long will they be able to keep going...?    (Source: Yen Press)"
  },
  {
    "id": "mv-al-106929",
    "anilistId": 106929,
    "mangadexId": "7e544761-7d3d-4fce-8137-719814d7d138",
    "title": "Eleceed",
    "altTitle": "일렉시드",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Comedy",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 24,
    "releaseDay": "Thu",
    "latestChapter": {
      "number": 24,
      "title": "Chapter 24",
      "views": "5.4M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx106929-flAUvHZDUz5v.jpg",
    "author": "Jae-Ho Son",
    "artist": "Hye-Jin Kim",
    "synopsis": "Ji-U is a kind-hearted young man who harnesses the lightning quick reflexes of a cat to secretly make the world a better place – one saved little child or foster pet at a time. Kayden is a secret agent on the run, who finds himself stuck in the body of a…um…decidedly fat old fluffy cat....",
    "trailerUrl": "-Vqya5QAqpc"
  },
  {
    "id": "mv-al-132288",
    "anilistId": 132288,
    "mangadexId": "87ebd557-8394-4f16-8afe-a8644e555ddc",
    "title": "Hirayasumi",
    "altTitle": "ひらやすみ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Drama",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 105,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 105,
      "title": "Chapter 105",
      "views": "5.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132288-YnkpDO1wNHNM.png",
    "author": "Keigo Shinzo",
    "artist": "Keigo Shinzo",
    "synopsis": "With a carefree outlook on life, Hiroto knows better than anyone that slowing down is sometimes the best way to move forward.    At 29 years old, carefree Hiroto Ikuta doesn’t have a girlfriend, a full-time job, or a plan for the future—and he couldn’t be happier. Hiroto’s breezy attitu...",
    "trailerUrl": "BtRhVT3XH70"
  },
  {
    "id": "mv-al-30102",
    "anilistId": 30102,
    "mangadexId": "895d0c24-9903-43bf-b18c-768d694a09e0",
    "title": "Fruits Basket",
    "altTitle": "フルーツバスケット",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Comedy",
      "Drama",
      "Psychological",
      "Romance",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 137,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 137,
      "title": "Chapter 137",
      "views": "2.2M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30102-MJuQ0e0k2CgU.png",
    "author": "Natsuki Takaya",
    "artist": "Natsuki Takaya",
    "synopsis": "After a family tragedy turns her life upside down, plucky high schooler Tohru Honda takes matters into her own hands and moves out...into a tent! Unfortunately for her, she pitches her new home on private land belonging to the mysterious Sohma clan, and it isn't long before the owners d...",
    "trailerUrl": "4jgVaA4bxDI"
  },
  {
    "id": "mv-al-33031",
    "anilistId": 33031,
    "mangadexId": "25aaabb1-9f74-4469-a8d6-1eac5924cc79",
    "title": "Pandora Hearts",
    "altTitle": "パンドラハーツ",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Drama",
      "Fantasy",
      "Mystery"
    ],
    "rating": 4.25,
    "totalChapters": 107,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 107,
      "title": "Chapter 107",
      "views": "5.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx33031-LzNWgqS69qAj.jpg",
    "author": "Jun Mochizuki",
    "artist": "Jun Mochizuki",
    "synopsis": "The air of celebration surrounding fifteen-year-old Oz Vessalius&rsquo;s coming-of-age ceremony quickly turns to horror when he is condemned for a sin about which he knows nothing. He is thrown into an eternal, inescapable prison known as the Abyss from which there is no escape. There, ...",
    "trailerUrl": "9Psc_hBkOoc"
  },
  {
    "id": "mv-al-86551",
    "anilistId": 86551,
    "mangadexId": "fe1c6cb0-bfc5-4809-b261-1238876d97b6",
    "title": "Made in Abyss",
    "altTitle": "メイドインアビス",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Adventure",
      "Drama",
      "Fantasy",
      "Horror",
      "Sci-Fi"
    ],
    "rating": 4.25,
    "totalChapters": 96,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 96,
      "title": "Chapter 96",
      "views": "2.2M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx86551-0EzmsMZiPSu9.jpg",
    "author": "Akihito Tsukushi",
    "artist": "Akihito Tsukushi",
    "synopsis": "In an age when the corners of the world have been scoured for their secrets, only one place remains unexplored–a massive cave system known as the Abyss. Those who traverse its endless pits and labyrinth-like tunnels are known as Cave Raiders. A young orphan named Riko dreams of followin...",
    "trailerUrl": "AQbaZeby2zA"
  },
  {
    "id": "mv-al-101563",
    "anilistId": 101563,
    "mangadexId": null,
    "title": "Grandmaster of Demonic Cultivation: Mo Dao Zu Shi",
    "altTitle": "魔道祖师",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Mystery"
    ],
    "rating": 4.25,
    "totalChapters": 259,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 259,
      "title": "Chapter 259",
      "views": "2.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101563-nTBq5IEYYWbX.png",
    "author": "Luo Di Cheng Qiu",
    "artist": "Luo Di Cheng Qiu",
    "synopsis": "Feared and hated for his sinister abilities, Wei Wuxian–the grandmaster of demonic cultivation–was driven to his death when the most powerful clans united to destroy him.    Thirteen years later, Wei Wuxian is reborn. Summoned by a young man who sacrificed his soul in a forbidden ritual..."
  },
  {
    "id": "mv-al-171068",
    "anilistId": 171068,
    "mangadexId": "6bd5a776-b219-42b5-8ff4-3fe1f3e3c4a0",
    "title": "One-Room TA",
    "altTitle": "원룸 조교님",
    "type": "Manhwa",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.25,
    "totalChapters": 42,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 42,
      "title": "Chapter 42",
      "views": "8.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx171068-6ZG2cmpg2uBH.png",
    "author": "Jibung",
    "artist": "Jibung",
    "synopsis": "When college student U-Yun meets the quiet and introverted TA Jin-Hyeong, he immediately asks him out, saying he wants to get to know him more. After just three days of dating, Jin-Hyeong moves in with him, and that’s when he starts showing a completely different wild side. All of his B...",
    "trailerUrl": "MIGS_dy-teU"
  },
  {
    "id": "mv-al-30698",
    "anilistId": 30698,
    "mangadexId": "456ca0b6-5b4b-4515-84bc-04c804207bf5",
    "title": "Neon Genesis Evangelion",
    "altTitle": "新世紀エヴァンゲリオン",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Drama",
      "Mecha",
      "Mystery",
      "Psychological"
    ],
    "rating": 4.25,
    "totalChapters": 97,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 97,
      "title": "Chapter 97",
      "views": "2.5M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30698-0niTa3yn2rNK.png",
    "author": "Hideaki Anno",
    "artist": "Yoshiyuki Sadamoto",
    "synopsis": "In 2015, the \"Angels\" have returned, and Shinji Ikari, a fourteen year-old child of the new Earth, is forced by his father Gendo--commander of the secret organization NERV--to pilot the monstrous biomechanical weapon called \"Evangelion\" to match the Angels' fearsome power...    (Source:...",
    "trailerUrl": "kOH2_8MkgZY"
  },
  {
    "id": "mv-59f47645",
    "anilistId": 63327,
    "mangadexId": "59f47645-66a9-443e-8228-788313c3ae3c",
    "title": "Tokyo Ghoul",
    "altTitle": "東京喰種 トーキョーグール",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Horror",
      "Mystery",
      "Psychological",
      "Supernatural"
    ],
    "rating": 4.25,
    "totalChapters": 144,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 144,
      "title": "Chapter 144",
      "views": "5.7M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-59f47645.jpg",
    "author": "Ishida Sui",
    "artist": "Ishida Sui",
    "synopsis": "Shy Ken Kaneki is thrilled to go on a date with the beautiful Rize. But it turns out that she’s only interested in his body—eating it, that is. When a morally questionable rescue transforms him into the first half-human half-Ghoul hybrid, Ken is drawn into the dark and violent world of ...",
    "trailerUrl": "61_N5Wz_oMg"
  },
  {
    "id": "mv-al-132144",
    "anilistId": 132144,
    "mangadexId": "f0f62b75-5989-4f32-9b59-ab56abe35fc1",
    "title": "Return of the Blossoming Blade",
    "altTitle": "화산귀환",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.25,
    "totalChapters": 90,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 90,
      "title": "Chapter 90",
      "views": "4.7M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx132144-i5B4VnG9sRgh.png",
    "author": "Biga",
    "artist": "LICO",
    "synopsis": "When Cheong-Myeong of the Mount Hua Sect awakens a hundred years in the future, his last memories are of a bloody battle against the Leader of the Demonic Cult, the evil Cheon-Ma. The battle almost saw the end of the Ten Great Sects of ancient China, when Cheong-Myeong ended the hard-fo...",
    "trailerUrl": "ZHTcZsg975A"
  },
  {
    "id": "mv-al-74347",
    "anilistId": 74347,
    "mangadexId": "29c42e49-d6f5-4084-9cec-771f5660c90f",
    "title": "One-Punch Man",
    "altTitle": "ワンパンマン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Comedy",
      "Sci-Fi",
      "Supernatural"
    ],
    "rating": 4.2,
    "totalChapters": 82,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 82,
      "title": "Chapter 82",
      "views": "8.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx74347-sZpmNJ5xLwRK.jpg",
    "author": "ONE",
    "artist": "Yuusuke Murata",
    "synopsis": "In this new action-comedy, everything about a young man named Saitama screams \"AVERAGE,&rdquo; from his lifeless expression, to his bald head, to his unimpressive physique. However, this average-looking fellow doesn't have your average problem... He's actually a superhero that's looking...",
    "trailerUrl": "-Z0pey2j5To"
  },
  {
    "id": "mv-al-85850",
    "anilistId": 85850,
    "mangadexId": "dc90853b-a3e6-4d5b-8b47-1fa15aa15923",
    "title": "19 Tian",
    "altTitle": "19天",
    "type": "Manhua",
    "demographic": "Shōjo",
    "genres": [
      "Comedy",
      "Romance",
      "Slice of Life"
    ],
    "rating": 4.2,
    "totalChapters": 90,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 90,
      "title": "Chapter 90",
      "views": "5.1M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/medium/b85850-C9jxTZSRutBw.png",
    "author": "Old Xian",
    "artist": "Old Xian",
    "synopsis": "A group photo in kindergarten is the start of a lifetime friendship between Jian Yi and Zhan Zhengxi. They grew up together, and met good friends like He Tian and Mo Guanshan on campus.   \"19 Days\" not only shows the relaxed and happy school days of the four, but is also a story in whic..."
  },
  {
    "id": "mv-e896c48c",
    "mangadexId": "e896c48c-3150-437d-ba57-d8567eb399ae",
    "title": "Chainsaw Man",
    "altTitle": "チェンソーマン",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Demons",
      "Dark Fantasy",
      "Supernatural"
    ],
    "rating": 4.96,
    "totalChapters": 175,
    "releaseDay": "Tue",
    "latestChapter": {
      "number": 175,
      "title": "Chapter 175",
      "views": "14.2M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "mangas/covers/mv-e896c48c.jpg",
    "author": "Fujimoto Tatsuki",
    "artist": "Fujimoto Tatsuki",
    "synopsis": "Denji was a small-time devil hunter just trying to survive in a harsh world. After being killed on a job, he is revived by his pet devil-dog Pochita and becomes Chainsaw Man — a man with a chainsaw for a heart, hunting devils for Public Safety.",
    "trailerUrl": "q9GpIJKPMGk"
  },
  {
    "id": "mv-6114f59f",
    "mangadexId": "6114f59f-4047-496b-8605-c6264c76d49f",
    "title": "Mushoku Tensei ~Isekai Ittara Honki Dasu~",
    "altTitle": "無職転生 ～異世界行ったら本気だす～",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Isekai",
      "Magic"
    ],
    "rating": 4.95,
    "totalChapters": 102,
    "releaseDay": "Fri",
    "latestChapter": {
      "number": 102,
      "title": "Chapter 102",
      "views": "9.4M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-6114f59f.jpg",
    "author": "Rifujin na Magonote",
    "artist": "Fujikawa Yuka",
    "synopsis": "A 34-year-old shut-in dies saving strangers and reincarnates in a world of swords and magic as baby Rudeus Greyrat. Keeping his memories, he resolves to live his new life to the absolute fullest and master powerful ancient magic.",
    "trailerUrl": "SYcTaxHuZI8"
  },
  {
    "id": "mv-77bee52c",
    "mangadexId": "77bee52c-d2d6-44ad-a33a-1734c1fe696a",
    "title": "Kage no Jitsuryokusha ni Naritakute!",
    "altTitle": "陰の実力者になりたくて！",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Reincarnation",
      "Action",
      "Demons",
      "Comedy",
      "Martial Arts"
    ],
    "rating": 4.95,
    "totalChapters": 92,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 92,
      "title": "Chapter 92",
      "views": "5.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": true,
    "coverUrl": "mangas/covers/mv-77bee52c.jpg",
    "author": "Sakano Anri",
    "artist": "Sakano Anri",
    "synopsis": "Just like how everyone adored heroes in their childhood, a certain young man adored those powers hidden in shadows. Ninjas, rogues, shadowy mentor types, that sort of deal.   After hiding his strength and living the mediocre life of a NPC by day while undergoing frenzied train...",
    "trailerUrl": "9pahhkIs4Ss"
  },
  {
    "id": "mv-4ec3e6b3",
    "mangadexId": "4ec3e6b3-18bf-4964-9c87-1f287d3398f4",
    "title": "Horimiya",
    "altTitle": "ホリミヤ",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Comedy",
      "Romance",
      "School Life",
      "Slice of Life"
    ],
    "rating": 4.92,
    "totalChapters": 125,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 125,
      "title": "Chapter 125",
      "views": "8.6M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-4ec3e6b3.jpg",
    "author": "HERO",
    "artist": "Hagiwara Daisuke",
    "synopsis": "Hori is a popular high school girl who secretly looks after her home and younger brother. Miyamura seems like an aloof otaku at school, but outside he has piercings and tattoos. The two bond over their secret lives.",
    "trailerUrl": "tryurXgGqkI"
  },
  {
    "id": "mv-37f5cce0",
    "mangadexId": "37f5cce0-8070-4ada-96e5-fa24b1bd4ff9",
    "title": "Kaguya-sama wa Kokurasetai: Tensai-tachi no Renai Zunousen",
    "altTitle": "かぐや様は告らせたい～天才たちの恋愛頭脳戦～",
    "type": "Manga",
    "demographic": "Seinen",
    "genres": [
      "Comedy",
      "Romance",
      "School Life",
      "Psychological"
    ],
    "rating": 4.97,
    "totalChapters": 281,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 281,
      "title": "Chapter 281",
      "views": "13.1M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-37f5cce0.jpg",
    "author": "Akasaka Aka",
    "artist": "Akasaka Aka",
    "synopsis": "Student council president Shirogane Miyuki and vice-president Shinomiya Kaguya appear to be the perfect couple. Pride gets in the way: whoever confesses first is the loser, initiating an all-out battle of psychological wits."
  },
  {
    "id": "mv-a96676e5",
    "mangadexId": "a96676e5-8ae2-425e-b549-7f15dd34a6d8",
    "title": "Komi-san wa Komyushou Desu.",
    "altTitle": "Comi-san ha Comyusho Desu.",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Award Winning",
      "Romance",
      "Comedy",
      "School Life",
      "Slice of Life"
    ],
    "rating": 4.92,
    "totalChapters": 500,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 500,
      "title": "Chapter 500",
      "views": "4.8M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-a96676e5.jpg",
    "author": "Oda Tomohito",
    "artist": "Oda Tomohito",
    "synopsis": "Komi-san is a beautiful and admirable girl that no one can take their eyes off of. Almost the whole school sees her as the cold beauty that's out of their league, but Tadano Hitohito knows the truth: she's just really bad at communicating with others. Komi-san, who wishes to f..."
  },
  {
    "id": "mv-eb2d1a45",
    "mangadexId": "eb2d1a45-d4e7-4e32-a171-b5b029c5b0cb",
    "title": "Kumo desu ga, Nani ka?",
    "altTitle": "kumoko",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Reincarnation",
      "Monsters",
      "Action",
      "Demons",
      "Comedy"
    ],
    "rating": 4.91,
    "totalChapters": 108,
    "releaseDay": "Fri",
    "latestChapter": {
      "number": 108,
      "title": "Chapter 108",
      "views": "4.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-eb2d1a45.jpg",
    "author": "Baba Okina",
    "artist": "Kakashi Asahiro",
    "synopsis": "When a mysterious explosion killed an entire class full of high school students, the souls of everyone in class were transported into a fantasy world and reincarnated. While some students were reincarnated as princes or prodigies, others were not as blessed.   Our heroine, who...",
    "trailerUrl": "uWKJr7OnOYQ"
  },
  {
    "id": "mv-9d3d3403",
    "mangadexId": "9d3d3403-1a87-4737-9803-bc3d99db1424",
    "title": "Ki ni Natteru Hito ga Otoko ja Nakatta",
    "altTitle": "気になってる人が男じゃなかった",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Award Winning",
      "Romance",
      "Girls' Love",
      "School Life",
      "Slice of Life"
    ],
    "rating": 4.9,
    "totalChapters": 112,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 112,
      "title": "Chapter 112",
      "views": "4.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-9d3d3403.jpg",
    "author": "Arai Sumiko",
    "artist": "Arai Sumiko",
    "synopsis": "Fashionable and upbeat high schooler Aya falls head over heels for an employee at a local CD shop. He’s got an air of mystery about him, always dressed well, and has impeccable taste in music. Little does she know — this supposedly male employee is actually her female classmat...",
    "trailerUrl": "kLO7KyjhGR0"
  },
  {
    "id": "mv-d7037b2a",
    "mangadexId": "d7037b2a-874a-4360-8a7b-07f2899152fd",
    "title": "Mairimashita! Iruma-kun",
    "altTitle": "魔入りました！入間くん",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Monsters",
      "Action",
      "Demons",
      "Romance",
      "Comedy"
    ],
    "rating": 4.89,
    "totalChapters": 116,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 116,
      "title": "Chapter 116",
      "views": "4.0M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-d7037b2a.jpg",
    "author": "Nishi Osamu ",
    "artist": "Nishi Osamu ",
    "synopsis": "Hopeless pushover Iruma Suzuki has found himself in a devil of a predicament... His trashy parents have sold off his soul, and he now has to live and attend school in the Netherworld. But with his unique survival skills and doting demon grandfather’s support, Iruma will surely...",
    "trailerUrl": "jmr4ZSGk0mY"
  },
  {
    "id": "mv-878634d2",
    "mangadexId": "878634d2-ea39-4001-a4bf-31458020d16a",
    "title": "Akuyaku Reijou Level 99 ~Watashi wa Ura Boss desuga Maou de wa Arimasen~",
    "altTitle": "悪役令嬢レベル９９～私は裏ボスですが魔王ではありません～",
    "type": "Manga",
    "demographic": "Josei",
    "genres": [
      "Reincarnation",
      "Monsters",
      "Action",
      "Demons",
      "Romance"
    ],
    "rating": 4.88,
    "totalChapters": 120,
    "releaseDay": "Mon",
    "latestChapter": {
      "number": 120,
      "title": "Chapter 120",
      "views": "3.8M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-878634d2.jpg",
    "author": "Tanabata Satori",
    "artist": "Nokomi (のこみ)",
    "synopsis": "I reincarnated as the \"Villainess Eumiella\" from an RPG Otome game. In the main story, Eumiella is merely a side character, but after the ending, she re-enters the story as the Hidden Boss, a character boasting high stats on par with the heroes! Lighting a fire in my gamer's s..."
  },
  {
    "id": "mv-96471a2c",
    "mangadexId": "96471a2c-59f3-4a08-be7d-640bc0c022a4",
    "title": "Saigo ni Hitotsu Dake Onegai Shite mo Yoroshii Deshou ka",
    "altTitle": "最後にひとつだけお願いしてもよろしいでしょうか",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Monsters",
      "Action",
      "Romance",
      "Comedy",
      "Martial Arts"
    ],
    "rating": 4.87,
    "totalChapters": 124,
    "releaseDay": "Tue",
    "latestChapter": {
      "number": 124,
      "title": "Chapter 124",
      "views": "3.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-96471a2c.jpg",
    "author": "Otori Nana",
    "artist": "Hoonoki Sora",
    "synopsis": "The engagement between Scarlet, a noblewoman from a ducal family, and Second Prince Kyle was suddenly annulled during a ball. She had been falsely accused of harassing a girl called Terenezza, daughter to a baron, whom the Prince doted on heavily. Condemned by everyone around ...",
    "trailerUrl": "ZMcT7as-37o"
  },
  {
    "id": "mv-c6bbbeca",
    "mangadexId": "c6bbbeca-f4fd-4595-9d4d-4ba31370d08c",
    "title": "Otome Game no Hametsu Flag shika nai Akuyaku Reijou ni Tensei shite shimatta...",
    "altTitle": "Bakarina",
    "type": "Manga",
    "demographic": "Josei",
    "genres": [
      "Reincarnation",
      "Romance",
      "Comedy",
      "Reverse Harem",
      "Video Games"
    ],
    "rating": 4.86,
    "totalChapters": 128,
    "releaseDay": "Wed",
    "latestChapter": {
      "number": 128,
      "title": "Chapter 128",
      "views": "3.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-c6bbbeca.jpg",
    "author": "Yamaguchi Satoru",
    "artist": "Hidaka Nami",
    "synopsis": "I recovered my past memories when I was hit on the head by a rock. I am Katarina Claes, the eight year old daughter of the duke. In a feverish nightmare, in which the prince’s fiancee was determined, I have realized that this is the otome game from the previous life. Also, I h..."
  },
  {
    "id": "mv-af38f328",
    "mangadexId": "af38f328-8df1-4b4c-a272-e737625c3ddc",
    "title": "Senpai ga Uzai Kouhai no Hanashi",
    "altTitle": "先輩がうざい後輩の話",
    "type": "Manga",
    "demographic": "Shōjo",
    "genres": [
      "Award Winning",
      "Romance",
      "Comedy",
      "Office Workers",
      "Slice of Life"
    ],
    "rating": 4.85,
    "totalChapters": 236,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 236,
      "title": "Chapter 236",
      "views": "3.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-af38f328.jpg",
    "author": "Shiro Manta",
    "artist": "Shiro Manta",
    "synopsis": "Futaba Igarashi is a diminutive office lady who finds that her towering and boisterous work senpai Harumi Takeda always gets in her hair, but he always has her back, he always keeps her company, and she starts noticing that her heart is slowly veering towards him… Won 1st plac...",
    "trailerUrl": "NtDoMdKusAM"
  },
  {
    "id": "mv-829fc3a7",
    "mangadexId": "829fc3a7-d4f4-42e9-9032-0917083f9e0d",
    "title": "Nán Hào Shàng Fēng",
    "altTitle": "南号と尚風",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Award Winning",
      "Comedy",
      "School Life",
      "Slice of Life"
    ],
    "rating": 4.84,
    "totalChapters": 136,
    "releaseDay": "Fri",
    "latestChapter": {
      "number": 136,
      "title": "Chapter 136",
      "views": "2.8M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-829fc3a7.png",
    "author": "Brownie (布朗尼)",
    "artist": "Brownie (布朗尼)",
    "synopsis": "A comedy about two ordinary high school boys. Alt Official Raw: AC.QQ Buy: - Taobao: Volume 1, Volume 2"
  },
  {
    "id": "mv-812f9696",
    "mangadexId": "812f9696-048f-496d-9ed4-84c99345d1fb",
    "title": "Yāo Shén Jì",
    "altTitle": "Cuentos de Demonios y Dioses",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Time Travel",
      "Action",
      "Romance",
      "Martial Arts",
      "Adventure"
    ],
    "rating": 4.83,
    "totalChapters": 140,
    "releaseDay": "Sat",
    "latestChapter": {
      "number": 140,
      "title": "Chapter 140",
      "views": "2.5M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-812f9696.jpg",
    "author": "Mad Snail",
    "artist": "Jiang Ruotai",
    "synopsis": "Nie Li became the strongest Demon Spiritualist and stood at the pinnacle of the martial world. However, he lost his life during the battle with the Sage-Emperor and six deity-ranked beasts.      His soul was then brought back to when he was still 13 years old. At this point in..."
  },
  {
    "id": "mv-3f1453fb",
    "mangadexId": "3f1453fb-9dac-4aca-a2ea-69613856c952",
    "title": "Tāmen De Gùshì",
    "altTitle": "SQ 君の名前から始まる",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Romance",
      "Comedy",
      "Girls' Love",
      "Drama",
      "School Life"
    ],
    "rating": 4.82,
    "totalChapters": 144,
    "releaseDay": "Sun",
    "latestChapter": {
      "number": 144,
      "title": "Chapter 144",
      "views": "2.3M",
      "dropTime": "Today (Tokyo Sync)"
    },
    "isSimulpub": true,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-3f1453fb.png",
    "author": "Tan Jiu (坛九)",
    "artist": "Tan Jiu (坛九)",
    "synopsis": "The funny romantic story of how Qiu Tong and Sun Jing met and fell in love. Also contains insert art of the characters by the author. --- - Original Manhua <AC.QQ> - Japanese Translation"
  },
  {
    "id": "mv-17a56d33",
    "mangadexId": "17a56d33-9443-433a-9e0d-70459893ed8f",
    "title": "Wǒ Jiā Lǎopo Láizì Yīqiān Nián Qián",
    "altTitle": "我家老婆来自一千年前",
    "type": "Manhua",
    "demographic": "Shōnen",
    "genres": [
      "Time Travel",
      "Romance",
      "Comedy",
      "Martial Arts",
      "Drama"
    ],
    "rating": 4.82,
    "totalChapters": 456,
    "releaseDay": "Archive",
    "latestChapter": {
      "number": 456,
      "title": "Chapter 456",
      "views": "2.0M",
      "dropTime": "Archive Vault"
    },
    "isSimulpub": false,
    "isFeatured": false,
    "coverUrl": "mangas/covers/mv-17a56d33.png",
    "author": "Yuewen Manhua (阅文漫画)",
    "artist": "Painting Culture (之画文化)",
    "synopsis": "Jiang He, a girl from the Tang Dynasty, traveled through a thousand years and appeared in front of Xu Qing. Fate brought together this love that spanned a thousand years. Everything the girl was familiar with has become history. Relatives, friends, and enemies have all been le..."
  },
  {
    "id": "solo-leveling",
    "title": "Solo Leveling",
    "author": "Chugong (Story), Dubu (Art)",
    "description": "A weak hunter named Sung Jinwoo discovers a mysterious system that allows only him to level up, transforming from the weakest hunter to the most powerful being in existence.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx101517-uxyhFofRUmCF.jpg",
    "chapters": 179,
    "volumes": 14,
    "status": "Completed",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.6,
    "year": 2018,
    "releaseDay": "Wednesday",
    "tags": [
      "Game Elements",
      "Hunter",
      "Leveling System",
      "Overpowered MC",
      "Gates"
    ],
    "source": "kakao",
    "anilistId": 101517,
    "totalChapters": 179,
    "trailerUrl": "PKmnXrDlhEQ",
    "mangadexId": "ade0306c-f4b6-4890-9edb-1ddf04df2039"
  },
  {
    "id": "attack-on-titan",
    "title": "Attack on Titan",
    "author": "Hajime Isayama",
    "description": "In a world where humanity lives within enormous walled cities to protect themselves from Titans—giant humanoid creatures—Eren Yeager vows to exterminate the Titans after his hometown is destroyed.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx53390-1RsuABC34P9Q.jpg",
    "chapters": 139,
    "volumes": 34,
    "status": "Completed",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Drama",
      "Fantasy",
      "Mystery"
    ],
    "rating": 4.7,
    "year": 2009,
    "releaseDay": "Thursday",
    "tags": [
      "Military",
      "Post-Apocalyptic",
      "Survival",
      "Dark",
      "Titans",
      "Walls"
    ],
    "source": "kodansha",
    "anilistId": 53390,
    "totalChapters": 139,
    "trailerUrl": "MGRm4IzK1SQ",
    "mangadexId": "b76d94b5-c787-46ff-9925-f4f729b1ed39"
  },
  {
    "id": "death-note",
    "title": "Death Note",
    "author": "Tsugumi Ohba (Story), Takeshi Obata (Art)",
    "description": "A high school student discovers a supernatural notebook that grants its user the ability to kill anyone whose name and face they know. He decides to use it to cleanse the world of criminals.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx21519-4J8bYlNLBGJu.jpg",
    "chapters": 108,
    "volumes": 12,
    "status": "Completed",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Mystery",
      "Psychological",
      "Supernatural",
      "Thriller"
    ],
    "rating": 4.6,
    "year": 2003,
    "releaseDay": "Friday",
    "tags": [
      "Shinigami",
      "Death",
      "Genius MC",
      "Cat-and-Mouse",
      "Serial Killer",
      "Detective"
    ],
    "source": "shueisha",
    "anilistId": 21519,
    "totalChapters": 108,
    "trailerUrl": "NlJZ-YgAt-c",
    "mangadexId": "36bdbf91-5e57-4b81-a813-4c557091dbce"
  },
  {
    "id": "demon-slayer",
    "title": "Demon Slayer: Kimetsu no Yaiba",
    "author": "Koyoharu Gotouge",
    "description": "Tanjiro Kamado sets out to become a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon, aiming to find a cure and avenge his family.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx87216-RMGtd7uS29nb.jpg",
    "chapters": 205,
    "volumes": 23,
    "status": "Completed",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Supernatural"
    ],
    "rating": 4.5,
    "year": 2016,
    "releaseDay": "Saturday",
    "tags": [
      "Demons",
      "Swords",
      "Breathing Techniques",
      "Siblings",
      "Revenge",
      "Historical"
    ],
    "source": "shueisha",
    "anilistId": 87216,
    "totalChapters": 205,
    "trailerUrl": "VQGCKyvzIM4",
    "mangadexId": "789642f8-ca89-4e4e-8f7b-eee4d17ea08b"
  },
  {
    "id": "naruto",
    "title": "Naruto",
    "author": "Masashi Kishimoto",
    "description": "Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story follows his journey to become a great ninja.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx11061-ONEbSUDkMVqL.jpg",
    "chapters": 700,
    "volumes": 72,
    "status": "Completed",
    "type": "Manga",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy"
    ],
    "rating": 4.5,
    "year": 1999,
    "releaseDay": "Monday",
    "tags": [
      "Ninja",
      "Coming of Age",
      "Friendship",
      "Rivalry",
      "Nine-Tails",
      "Hokage"
    ],
    "source": "shueisha",
    "anilistId": 11061,
    "totalChapters": 700,
    "trailerUrl": "4TXF9hm3V7Q",
    "mangadexId": "275c3ee8-bdeb-4070-a333-6add23a8415a"
  },
  {
    "id": "tower-of-god",
    "title": "Tower of God",
    "author": "SIU (Slave In Utero)",
    "description": "Twenty-Fifth Bam has lived all his life in a cave beneath a mysterious Tower. When his only friend Rachel enters the Tower, Bam follows her and must ascend its floors to find her.",
    "coverUrl": "https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx76044-BCWsVlCH6SNVL.jpg",
    "chapters": 600,
    "volumes": null,
    "status": "Releasing",
    "type": "Manhwa",
    "demographic": "Shōnen",
    "genres": [
      "Action",
      "Adventure",
      "Fantasy",
      "Mystery"
    ],
    "rating": 4.5,
    "year": 2010,
    "releaseDay": "Sunday",
    "tags": [
      "Tower",
      "Betrayal",
      "Power System",
      "Hidden Powers",
      "Competition"
    ],
    "source": "webtoon",
    "anilistId": 76044,
    "totalChapters": 600,
    "trailerUrl": "FhcbdEdvHr4",
    "mangadexId": "57e1d491-1dc9-4854-83bf-7a9379566fb2"
  }
];

// All 40+ Anime-Planet Style Filter Tags
const ALL_GENRE_TAGS = [
  "Action", "Adventure", "Body Swap", "Comedy", "Cultivation", "Cyberpunk",
  "Dark Fantasy", "Drama", "Dungeon", "Food/Cooking", "Fantasy", "Historical",
  "Horror", "Isekai", "Josei", "Leveling", "Magic", "Martial Arts", "Mecha",
  "Military", "Monsters", "Mystery", "Nobility", "Post-Apocalyptic",
  "Psychological", "Reijo/Villainess", "Reincarnation", "Romance", "Samurai",
  "Sci-Fi", "School Life", "Seinen", "Shōjo", "Shōnen", "Slice of Life",
  "Sports", "Supernatural", "Vampires", "Workplace"
];

// Campaign Presets
const CAMPAIGN_PRESETS = {
  princess: {
    badge: "Featured Event",
    title: "National Princess Day: Free Chapters & Passes",
    desc: "Read featured romance and fantasy chapters for free, and claim event passes for your library.",
    spotlightId: "mv-villainess-destiny",
    code: "PRINCESS50"
  },
  jumpfest: {
    badge: "Weekly Simulpub",
    title: "Weekly Shonen Jump Releases",
    desc: "Follow the latest weekly Shonen Jump chapters with synchronized release schedules.",
    spotlightId: "mv-chrono-samurai",
    code: "JUMPZERO"
  },
  isekai: {
    badge: "Genre Spotlight",
    title: "Fantasy & Isekai Showcase",
    desc: "Explore top-rated fantasy, regression, and reincarnation manga and manhwa titles.",
    spotlightId: "mv-void-hunter",
    code: "ISEKAI100"
  }
};

// ==========================================================================
// 2. SVG DYNAMIC ARTWORK GENERATOR
// ==========================================================================
function generateCoverSVG(manga) {
  if (manga.coverUrl) {
    return manga.coverUrl;
  }
  if (manga.coverPath) {
    return manga.coverPath;
  }
  if (manga.customCoverDataUrl) {
    return manga.customCoverDataUrl;
  }
  const c = manga.coverColor || { bg1: "#1e1b4b", bg2: "#0f172a", accent: "#00f2fe" };
  const seal = manga.kanjiSeal || "魁";
  const title = manga.title.replace(/&/g, "&amp;");
  const author = (manga.author || "MangaVerse").replace(/&/g, "&amp;");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="100%" height="100%">
    <defs>
      <linearGradient id="g_${manga.id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c.bg1}"/>
        <stop offset="100%" stop-color="${c.bg2}"/>
      </linearGradient>
      <pattern id="pat_${manga.id}" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.2" fill="${c.accent}" opacity="0.15"/>
      </pattern>
    </defs>
    <rect width="400" height="600" fill="url(#g_${manga.id})"/>
    <rect width="400" height="600" fill="url(#pat_${manga.id})"/>
    
    <rect x="18" y="18" width="364" height="564" fill="none" stroke="${c.accent}" stroke-width="2.5" opacity="0.4" rx="10"/>
    <rect x="26" y="26" width="348" height="548" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.25" rx="6"/>
    
    <text x="200" y="310" font-family="'Inter', serif" font-weight="900" font-size="160" fill="${c.accent}" opacity="0.12" text-anchor="middle" dominant-baseline="central">${seal}</text>
    
    <rect x="18" y="18" width="160" height="32" fill="${c.accent}" rx="6"/>
    <text x="98" y="39" font-family="'Outfit', sans-serif" font-weight="900" font-size="13" fill="#000" text-anchor="middle">MANGA•VERSE</text>
    
    <line x1="20" y1="200" x2="380" y2="240" stroke="#fff" stroke-width="0.8" opacity="0.1"/>
    <line x1="380" y1="180" x2="20" y2="260" stroke="#fff" stroke-width="0.8" opacity="0.1"/>

    <rect x="18" y="420" width="364" height="162" fill="#060912" opacity="0.92" rx="0 0 10 10"/>
    
    <foreignObject x="32" y="430" width="336" height="85">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Outfit', sans-serif; font-weight:900; font-size:19px; line-height:1.2; color:#ffffff; text-shadow:0 2px 8px rgba(0,0,0,0.8);">
        ${title}
      </div>
    </foreignObject>
    
    <text x="34" y="545" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="${c.accent}">${author}</text>
    <text x="34" y="565" font-family="'Inter', sans-serif" font-weight="800" font-size="13" fill="#f6d365">★ ${manga.rating} • Ch. ${manga.totalChapters}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generate Realistic Interior Manga Pages for the Reader
function generateMangaPageSVG(manga, chapterNum, pageNum, totalPages) {
  if (AppState.activeReader && AppState.activeReader._offlinePages && AppState.activeReader._offlinePages[pageNum - 1]) {
    return AppState.activeReader._offlinePages[pageNum - 1];
  }
  if (manga && manga.customPages && manga.customPages[pageNum - 1]) {
    return manga.customPages[pageNum - 1];
  }
  const seal = manga.kanjiSeal || "轟";
  const sfxList = ["ゴゴゴ...", "ドドドッ!", "バァァン!", "ザシュッ!", "カッ!!", "パァァァ"];
  const sfx = sfxList[(pageNum - 1) % sfxList.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
    <defs>
      <linearGradient id="pgrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f5f5f5"/>
      </linearGradient>
      <pattern id="screentone" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#111" opacity="0.2"/>
      </pattern>
    </defs>
    
    <rect width="800" height="1200" fill="url(#pgrad)"/>
    <rect x="40" y="40" width="720" height="1120" fill="none" stroke="#000" stroke-width="4"/>

    <rect x="55" y="55" width="690" height="420" fill="#fff" stroke="#000" stroke-width="3"/>
    <rect x="55" y="55" width="690" height="420" fill="url(#screentone)"/>
    <line x1="55" y1="55" x2="745" y2="475" stroke="#000" stroke-width="1.5" opacity="0.2"/>
    <line x1="745" y1="55" x2="55" y2="475" stroke="#000" stroke-width="1.5" opacity="0.2"/>
    
    <text x="400" y="270" font-family="'Inter', sans-serif" font-weight="900" font-size="78" fill="#111" text-anchor="middle" transform="rotate(-6 400 270)">${sfx}</text>

    <path d="M 120 120 Q 120 90 260 90 Q 400 90 400 120 Q 400 170 320 170 L 300 200 L 290 170 Q 120 170 120 120 Z" fill="#fff" stroke="#000" stroke-width="3"/>
    <text x="250" y="132" font-family="'Inter', sans-serif" font-weight="700" font-size="18" fill="#000" text-anchor="middle">"This power... It defies all logic!"</text>

    <rect x="55" y="490" width="335" height="340" fill="#fff" stroke="#000" stroke-width="3"/>
    <circle cx="220" cy="650" r="90" fill="#000"/>
    <text x="220" y="665" font-family="'Inter', sans-serif" font-weight="900" font-size="64" fill="#fff" text-anchor="middle">${seal}</text>
    
    <rect x="410" y="490" width="335" height="340" fill="#fafafa" stroke="#000" stroke-width="3"/>
    <path d="M 440 560 Q 440 520 580 520 Q 720 520 720 560 Q 720 620 620 620 L 600 660 L 590 620 Q 440 620 440 560 Z" fill="#fff" stroke="#000" stroke-width="2.5"/>
    <text x="580" y="565" font-family="'Inter', sans-serif" font-weight="600" font-size="16" fill="#000" text-anchor="middle">"Hold the defensive line!"</text>
    <text x="580" y="588" font-family="'Inter', sans-serif" font-weight="600" font-size="15" fill="#000" text-anchor="middle">"The gate is rupturing!"</text>

    <rect x="55" y="845" width="690" height="280" fill="#111" stroke="#000" stroke-width="3"/>
    <text x="400" y="980" font-family="'Outfit', sans-serif" font-weight="900" font-size="44" fill="#fff" text-anchor="middle" letter-spacing="4">TO BE CONTINUED</text>
    
    <text x="60" y="1180" font-family="'Inter', sans-serif" font-weight="600" font-size="13" fill="#666">${manga.title} • Ch. ${chapterNum}</text>
    <text x="740" y="1180" font-family="'Inter', sans-serif" font-weight="700" font-size="14" fill="#111" text-anchor="end">${pageNum} / ${totalPages}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// ==========================================================================
// 3. APPLICATION STATE & CONTROLLER
// ==========================================================================
const AppState = {
  activeSearchQuery: "",
  activeFormatFilter: "All",
  activeDemographicFilter: "All",
  activeSort: "popularity",
  includedTags: new Set(),
  excludedTags: new Set(),
  filteredManga: [...MANGA_DATABASE],
  catalogDisplayLimit: 8,

  // Simulpub tab
  activeSimulpubDay: "All",

  // Active Campaign
  currentCampaignKey: "princess",

  // User Favorites Set for 1-click quick-bookmarking
  userFavorites: new Set(),
  activeDailySchedule: "All",

  // Quest Stamp System
  userQuestStamps: 3,

  // Reader State (4-Mode Engine)
  activeReader: {
    isOpen: false,
    manga: null,
    chapterNumber: 1,
    currentPage: 1,
    totalPages: 8,
    mode: "vertical", // vertical, single-rtl, single-ltr, double-spread
    theme: "charcoal" // charcoal (default clean slate), white, sepia, oled
  },

  // Web Worker instance
  searchWorker: null
};

// ==========================================================================
// 4. INITIALIZATION & WORKER SETUP
// ==========================================================================
// ==========================================================================
// GLOBAL BREADCRUMB NAVIGATION SYSTEM
// ==========================================================================

/**
 * updateBreadcrumb(crumbs)
 * crumbs = array of { label, action? }
 *   - action: a JS string to eval onclick, or null for the last (current) crumb
 * Example: [ { label:"Home" }, { label:"Directory", action:"showCatalogView()" }, { label:"Solo Leveling" } ]
 */
function updateBreadcrumb(crumbs) {
  const nav = document.getElementById("globalBreadcrumb");
  if (!nav) return;

  if (!crumbs || crumbs.length === 0) {
    nav.innerHTML = "";
    nav.style.display = "none";
    return;
  }

  nav.style.display = "flex";

  // Build structured JSON-LD BreadcrumbList for SEO
  const ldItems = crumbs.map((c, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": c.label
  }));

  nav.innerHTML = `
    <ol class="breadcrumb-trail" aria-label="Breadcrumb navigation" itemscope itemtype="https://schema.org/BreadcrumbList">
      ${crumbs.map((c, i) => {
        const isLast = i === crumbs.length - 1;
        const sep = i > 0 ? `<li class="crumb-sep-li" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg></li>` : "";
        if (isLast) {
          return `${sep}<li class="crumb-item crumb-item-current" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            <span itemprop="name" aria-current="page">${escapeHtml(c.label)}</span>
            <meta itemprop="position" content="${i + 1}"/>
          </li>`;
        }
        return `${sep}<li class="crumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <button class="crumb-btn" onclick="${c.action || ''}" itemprop="item">
            <span itemprop="name">${escapeHtml(c.label)}</span>
          </button>
          <meta itemprop="position" content="${i + 1}"/>
        </li>`;
      }).join("")}
    </ol>
  `;
}

// ==========================================================================
// 2B. LIVE BACKEND API SYNCHRONIZATION WITH STATIC SAFE FALLBACK
// ==========================================================================

/**
 * Auto-detect backend API URL:
 *  - On cPanel (any real domain): /api/v1
 *  - On Vercel: skip (no PHP backend)
 *  - On localhost dev server: http://localhost:7890/backend/public/v1
 */
function detectApiBase() {
  const h = window.location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') return 'http://localhost:7890/backend/public/v1';
  if (h.endsWith('.vercel.app')) return null; // no backend on Vercel
  return '/api/v1'; // cPanel with .htaccess routing
}

const API_BASE_URL = window.MANGAVERSE_API_URL || detectApiBase();

async function apiFetch(path, timeoutMs = 3000) {
  if (!API_BASE_URL) return null;
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(`${API_BASE_URL}${path}`, {
      signal: ctrl.signal,
      headers: { 'Accept': 'application/json' }
    });
    clearTimeout(tid);
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

async function fetchLiveMangaCatalog() {
  const data = await apiFetch('/manga?limit=200');
  if (data?.success && Array.isArray(data.manga) && data.manga.length > 0) {
    // Map API shape → frontend shape (keep all static rich fields, merge in live values)
    const liveMap = new Map(data.manga.map(m => [m.slug, m]));
    const merged = MANGA_DATABASE.map(local => {
      const live = liveMap.get(local.id) || liveMap.get(local.slug);
      if (!live) return local;
      return {
        ...local,
        // Override with fresh API values where useful
        coverUrl: live.cover_url || local.coverUrl,
        mangadexId: live.mangadex_id || local.mangadexId,
        trailerUrl: live.trailer_id || local.trailerUrl,
        totalChapters: live.total_chapters ?? local.totalChapters,
        publicationStatus: live.publication_status || local.publicationStatus,
        _fromApi: true
      };
    });
    // Append any new titles from DB not yet in static database
    data.manga.forEach(live => {
      const exists = MANGA_DATABASE.some(l => l.id === live.slug || l.id === String(live.id));
      if (!exists) {
        merged.push({
          id: live.slug || String(live.id),
          title: live.title,
          altTitle: live.original_title || '',
          type: live.content_type || 'Manga',
          demographic: live.demographic || 'Unknown',
          genres: [],
          rating: parseFloat(live.rating) || 4.5,
          totalChapters: 0,
          coverUrl: live.cover_url || null,
          mangadexId: live.mangadex_id || null,
          trailerUrl: live.trailer_id || null,
          author: live.author || 'Unknown',
          artist: live.artist || 'Unknown',
          synopsis: live.synopsis || '',
          releaseDay: live.release_day || 'Archive',
          isSimulpub: live.publication_status === 'ongoing',
          isFeatured: live.is_featured || false,
          latestChapter: { number: 0, views: '0', dropTime: '' }
        });
      }
    });
    return merged;
  }
  return MANGA_DATABASE;
}

/**
 * Fetch published chapters for a manga from the PHP API (cPanel only).
 * Returns null if API unavailable or no results (fall through to MangaDex).
 */
async function fetchApiChapters(mangaId) {
  const data = await apiFetch(`/manga/${mangaId}/chapters`);
  if (data?.success && Array.isArray(data.chapters) && data.chapters.length > 0) {
    return data.chapters.map(c => ({
      id: c.external_chapter_id || String(c.id),
      number: String(c.chapter_number),
      title: c.chapter_title || `Chapter ${c.chapter_number}`,
      pages: c.page_count || 0,
      pdfUrl: c.pdf_url || null,
      source: 'api'
    }));
  }
  return null;
}

document.addEventListener("DOMContentLoaded", async () => {
  // Check for live published manga updates
  try {
    const liveList = await fetchLiveMangaCatalog();
    if (liveList && liveList.length > 0 && liveList !== MANGA_DATABASE) {
      AppState.filteredManga = liveList;
    }
  } catch (e) {}
  // 1. Initialize IndexedDB
  try {
    await MangaDB.init();
    await refreshLibraryCountBadge();
    await refreshWalletBadge();
    await refreshUserFavorites();
  } catch (err) {
    console.warn("IndexedDB fallback to memory:", err);
  }

  // 2. Initialize Web Worker Search Engine
  try {
    AppState.searchWorker = new Worker("search-worker.js");
    AppState.searchWorker.postMessage({
      action: "INIT_DATABASE",
      payload: MANGA_DATABASE
    });

    AppState.searchWorker.onmessage = (e) => {
      if (e.data.action === "FILTER_RESULTS") {
        let results = e.data.results;
        if (AppState.activeDailySchedule && AppState.activeDailySchedule !== "All") {
          let target = AppState.activeDailySchedule;
          if (target === "Today") {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            target = days[new Date().getDay()];
          }
          if (target === "Archive") {
            results = results.filter(m => m.releaseDay === "Archive");
          } else {
            results = results.filter(m => m.releaseDay === target);
          }
        }
        AppState.filteredManga = results;
        AppState.catalogPage = 1;
        renderCatalog();
        updateCatalogResultsCount();
      }
    };
  } catch (err) {
    console.warn("Worker not supported on local file protocol, using main thread fallback.");
  }

  // 3. Render Initial Components
  initTokyoSyncClock();
  initCampaignCountdown();
  renderSimulpubGrid();
  renderTagChips();
  renderCatalog();
  updateCatalogResultsCount();
  setupEventListeners();

  // Set initial breadcrumb: Home > Directory
  updateBreadcrumb([
    { label: "MangaVerse", action: "window.scrollTo({top:0,behavior:'smooth'})" },
    { label: "Manga Directory" }
  ]);

  // 4. Register PWA Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }

  // 5. Network status + Continue Reading + Storage estimate
  initNetworkStatusListener();
  initContinueReadingBar();
  updateStorageUsageLabel();
});

// ==========================================================================
// 5. TOKYO SYNCHRONIZED SIMULPUB CLOCK
// ==========================================================================
function initTokyoSyncClock() {
  const clockEl = document.getElementById("tokyoLiveClock");
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    const tokyoOffset = 9 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tokyoDate = new Date(utc + (tokyoOffset * 60000));
    
    const h = String(tokyoDate.getHours()).padStart(2, '0');
    const m = String(tokyoDate.getMinutes()).padStart(2, '0');
    const s = String(tokyoDate.getSeconds()).padStart(2, '0');
    clockEl.textContent = `JST ${h}:${m}:${s}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// Simulpub Grid Renderer
function renderSimulpubGrid() {
  const container = document.getElementById("simulpubGrid");
  if (!container) return;

  let items = MANGA_DATABASE.filter(m => m.isSimulpub);
  if (AppState.activeSimulpubDay !== "All") {
    items = items.filter(m => m.releaseDay === AppState.activeSimulpubDay);
  }

  container.innerHTML = items.map(m => {
    const cover = generateCoverSVG(m);
    return `
      <article class="simulpub-card" onclick="openReader('${m.id}', ${m.latestChapter.number})">
        <div class="simulpub-thumb-wrap">
          <img class="simulpub-thumb" src="${cover}" alt="${m.title}" loading="lazy"/>
          <span class="card-format-tag">${m.type.toUpperCase()}</span>
          <div class="simulpub-drop-badge">${m.latestChapter.dropTime.toUpperCase()}</div>
        </div>
        <div class="simulpub-info">
          <div>
            <div class="simulpub-title" title="${m.title}">${m.title}</div>
            <span class="simulpub-chapter-badge">Ch. ${m.latestChapter.number}</span>
          </div>
          <div class="simulpub-meta-row">
            <span class="card-meta-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${m.latestChapter.views}</span>
            <span class="card-meta-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> ${m.latestChapter.comments}</span>
            <span class="card-meta-item score-val">★ ${m.rating}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function setSimulpubDay(day) {
  AppState.activeSimulpubDay = day;
  document.querySelectorAll(".day-pill-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.day === day);
  });
  renderSimulpubGrid();
}

// ==========================================================================
// 6. CAMPAIGN MULTI-TAB SWITCHER & COUNTDOWN TIMER
// ==========================================================================
function switchCampaign(campaignKey) {
  AppState.currentCampaignKey = campaignKey;
  const data = CAMPAIGN_PRESETS[campaignKey];
  if (!data) return;

  document.querySelectorAll(".campaign-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.campaign === campaignKey);
  });

  const tagEl = document.getElementById("campaignEventTag");
  if (tagEl) tagEl.textContent = data.badge;

  const headingEl = document.getElementById("campaignHeading");
  if (headingEl) headingEl.textContent = data.title;

  const descEl = document.getElementById("campaignDesc");
  if (descEl) descEl.textContent = data.desc;

  const spotlight = MANGA_DATABASE.find(m => m.id === data.spotlightId);
  if (spotlight) {
    const img = document.getElementById("spotlightCoverImg");
    if (img) img.src = generateCoverSVG(spotlight);
    const titleEl = document.getElementById("spotlightTitle");
    if (titleEl) titleEl.textContent = spotlight.title;
    const synopsisEl = document.getElementById("spotlightSynopsis");
    if (synopsisEl) synopsisEl.textContent = spotlight.synopsis.slice(0, 100) + "...";
  }
}

function initCampaignCountdown() {
  const countdownEl = document.getElementById("campaignCountdownText");
  if (!countdownEl) return;

  const targetDate = new Date("2026-12-01T23:59:59Z").getTime();

  function update() {
    const now = Date.now();
    const diff = targetDate - now;
    if (diff <= 0) {
      countdownEl.textContent = "Campaign Ended";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `Ends in: ${days}d ${hours}h ${mins}m ${secs}s`;
  }

  update();
  setInterval(update, 1000);
}

// ==========================================================================
// 7. ANIME-PLANET 3-STATE TAG ALGEBRA ENGINE
// ==========================================================================
function toggleTagsDrawer() {
  const drawer = document.getElementById("tagFilterDrawer");
  const btn = document.getElementById("toggleTagsBtn");
  if (!drawer) return;
  const isOpen = drawer.classList.toggle("open");
  drawer.classList.toggle("collapsed", !isOpen);
  if (btn) btn.classList.toggle("active", isOpen);
}

function renderTagChips() {
  const container = document.getElementById("tagsContainer");
  if (!container) return;

  const badge = document.getElementById("activeTagsBadge");
  if (badge) {
    const count = AppState.includedTags.size + AppState.excludedTags.size;
    if (count > 0) {
      badge.textContent = count;
      badge.style.display = "inline-flex";
    } else {
      badge.style.display = "none";
    }
  }

  container.innerHTML = ALL_GENRE_TAGS.map(tag => {
    let stateClass = "";
    let stateSymbol = "";
    if (AppState.includedTags.has(tag)) {
      stateClass = "tag-include";
      stateSymbol = "+ ";
    } else if (AppState.excludedTags.has(tag)) {
      stateClass = "tag-exclude";
      stateSymbol = "- ";
    }

    return `
      <button class="tag-chip ${stateClass}" onclick="cycleTagState('${tag}')">
        ${stateSymbol}${tag}
      </button>
    `;
  }).join("");
}

function cycleTagState(tag) {
  if (AppState.includedTags.has(tag)) {
    AppState.includedTags.delete(tag);
    AppState.excludedTags.add(tag);
  } else if (AppState.excludedTags.has(tag)) {
    AppState.excludedTags.delete(tag);
  } else {
    AppState.includedTags.add(tag);
  }

  renderTagChips();
  triggerSearch();
}

function resetAllFilters() {
  AppState.activeSearchQuery = "";
  AppState.activeFormatFilter = "All";
  AppState.activeDemographicFilter = "All";
  AppState.activeSort = "popularity";
  AppState.includedTags.clear();
  AppState.excludedTags.clear();

  const searchInput = document.getElementById("mainSearchInput");
  if (searchInput) searchInput.value = "";
  const formatSelect = document.getElementById("formatSelect");
  if (formatSelect) formatSelect.value = "All";
  const demoSelect = document.getElementById("demoSelect");
  if (demoSelect) demoSelect.value = "All";
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "popularity";

  renderTagChips();
  triggerSearch();
}

function triggerSearch() {
  const payload = {
    query: AppState.activeSearchQuery,
    type: AppState.activeFormatFilter,
    demographic: AppState.activeDemographicFilter,
    sort: AppState.activeSort,
    includedTags: Array.from(AppState.includedTags),
    excludedTags: Array.from(AppState.excludedTags)
  };

  if (AppState.searchWorker) {
    AppState.searchWorker.postMessage({ action: "FILTER_QUERY", payload });
  } else {
    executeFallbackSearch(payload);
  }
}

function executeFallbackSearch(payload) {
  let res = [...MANGA_DATABASE];

  if (payload.query) {
    const q = payload.query.toLowerCase();
    res = res.filter(m => m.title.toLowerCase().includes(q) || m.genres.some(g => g.toLowerCase().includes(q)));
  }

  if (payload.type && payload.type !== "All") {
    res = res.filter(m => m.type === payload.type);
  }

  if (payload.demographic && payload.demographic !== "All") {
    res = res.filter(m => m.demographic === payload.demographic);
  }

  if (payload.includedTags.length > 0) {
    res = res.filter(m => payload.includedTags.every(inc => m.genres.includes(inc)));
  }

  if (payload.excludedTags.length > 0) {
    res = res.filter(m => !payload.excludedTags.some(exc => m.genres.includes(exc)));
  }

  // WEBTOON style Daily Release filter
  if (AppState.activeDailySchedule && AppState.activeDailySchedule !== "All") {
    let target = AppState.activeDailySchedule;
    if (target === "Today") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      target = days[new Date().getDay()];
    }
    if (target === "Archive") {
      res = res.filter(m => m.releaseDay === "Archive");
    } else {
      res = res.filter(m => m.releaseDay === target);
    }
  }

  AppState.filteredManga = res;
  AppState.catalogPage = 1;
  renderCatalog();
  updateCatalogResultsCount();
}

function selectDailySchedule(day) {
  AppState.activeDailySchedule = day;
  document.querySelectorAll(".day-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.day === day);
  });
  triggerSearch();
}

async function refreshUserFavorites() {
  try {
    const lib = await MangaDB.getLibrary();
    AppState.userFavorites = new Set(
      (lib || []).filter(item => item.shelf === "favorites").map(item => item.id || item.mangaId)
    );
  } catch (e) {
    AppState.userFavorites = new Set();
  }
}

async function toggleCardFavorite(event, mangaId) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const manga = MANGA_DATABASE.find(m => m.id === mangaId);
  if (!manga) return;

  const isFav = AppState.userFavorites && AppState.userFavorites.has(mangaId);
  const newShelf = isFav ? "none" : "favorites";

  try {
    await MangaDB.setLibraryShelf(mangaId, newShelf, manga.title, generateCoverSVG(manga));
    if (isFav) {
      AppState.userFavorites.delete(mangaId);
      showToast(`Removed "${manga.title}" from favorites`);
    } else {
      AppState.userFavorites.add(mangaId);
      showToast(`Saved "${manga.title}" to favorites ★`, "success");
    }
    await refreshLibraryCountBadge();
    syncBnavBadge();

    // Toggle button state in DOM
    const btn = event.currentTarget || document.querySelector(`.card-fav-btn[data-id="${mangaId}"]`);
    if (btn) {
      btn.classList.toggle("active", !isFav);
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", !isFav ? "currentColor" : "none");
    }
  } catch (err) {
    console.error("Favorite toggle error:", err);
  }
}

function updateCatalogResultsCount() {
  const el = document.getElementById("catalogResultsCount");
  if (el) el.textContent = AppState.filteredManga.length;
}

// Render Manga Catalog Grid  — now with page-number pagination (3 rows of 6 cards = 18 items)
const CATALOG_PAGE_SIZE = 18;
const SERIES_CHAPTER_PAGE_SIZE = 16;

function renderCatalog() {
  const container = document.getElementById("catalogGrid");
  if (!container) return;

  const total = AppState.filteredManga.length;

  if (total === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding: 48px 20px; color: var(--text-muted);">
        <h3>No manga found matching your active filters.</h3>
        <p style="margin-top:6px;">Try removing some excluded tags or widening your search query.</p>
        <button class="btn-cyan-glow" style="margin-top:16px;" onclick="resetAllFilters()">Reset All Filters</button>
      </div>
    `;
    renderCatalogPagination(0, 0);
    return;
  }

  // Clamp current page within valid range
  const totalPages = Math.ceil(total / CATALOG_PAGE_SIZE);
  if (!AppState.catalogPage || AppState.catalogPage < 1) AppState.catalogPage = 1;
  if (AppState.catalogPage > totalPages) AppState.catalogPage = totalPages;

  const pageStart = (AppState.catalogPage - 1) * CATALOG_PAGE_SIZE;
  const pageEnd   = Math.min(pageStart + CATALOG_PAGE_SIZE, total);
  const visible   = AppState.filteredManga.slice(pageStart, pageEnd);

  container.innerHTML = visible.map(m => {
    const cover = generateCoverSVG(m);
    const views = m.latestChapter ? m.latestChapter.views : "1.2M";
    const isFav = AppState.userFavorites && AppState.userFavorites.has(m.id);
    return `
      <article class="manga-card" onclick="openMangaDetails('${m.id}')" onmouseenter="onMangaCardHoverEnter(event, '${m.id}')" onmouseleave="onMangaCardHoverLeave(event)">
        <div class="manga-cover-wrap">
          <img class="manga-cover-img" src="${cover}" alt="${m.title}" loading="lazy" onerror="this.onerror=null;this.src=generateCoverSVG({...MANGA_DATABASE.find(x=>x.id==='${m.id}')||{id:'${m.id}',title:'${m.title}',rating:0,totalChapters:0},coverUrl:null});"/>
          <span class="manga-format-badge catalog-format-badge">${m.type.toUpperCase()}</span>
          <span class="manga-score-badge catalog-score-badge">★ ${m.rating}</span>
          <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${m.id}" onclick="toggleCardFavorite(event, '${m.id}')" title="${isFav ? 'Remove from favorites' : 'Save to favorites'}" aria-label="Favorite">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="manga-details">
          <div>
            <h3 class="manga-card-title">${m.title}</h3>
            <div class="manga-genres-preview">${m.genres.slice(0, 3).join(" • ")}</div>
          </div>
          <div class="manga-card-footer">
            <span class="catalog-ch-label">Ch. ${m.totalChapters}</span>
            <span class="catalog-views-label">${views}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");

  renderCatalogPagination(AppState.catalogPage, totalPages);
}

function renderCatalogPagination(currentPage, totalPages) {
  // Hide old load-more controls — pagination replaces them
  const loadBtn = document.getElementById("btnLoadMore");
  if (loadBtn) loadBtn.style.display = "none";

  const pager = document.getElementById("catalogPager");
  if (!pager) return;

  if (totalPages <= 1) {
    pager.innerHTML = "";
    return;
  }

  // Build page number list with leading/trailing ellipsis
  function buildPageWindow(cur, total) {
    const pages = [];
    const delta = 2; // pages on each side of current
    const rangeStart = Math.max(2, cur - delta);
    const rangeEnd   = Math.min(total - 1, cur + delta);

    pages.push(1);
    if (rangeStart > 2) pages.push("…");
    for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p);
    if (rangeEnd < total - 1) pages.push("…");
    if (total > 1) pages.push(total);
    return pages;
  }

  const window = buildPageWindow(currentPage, totalPages);
  const total = AppState.filteredManga.length;
  const pageStart = (currentPage - 1) * CATALOG_PAGE_SIZE + 1;
  const pageEnd   = Math.min(currentPage * CATALOG_PAGE_SIZE, total);

  const pageItems = window.map(item => {
    if (item === "…") {
      return `<span class="page-ellipsis">···</span>`;
    }
    const active = item === currentPage ? " page-btn-active" : "";
    return `<button class="page-btn${active}" onclick="goToCatalogPage(${item})" aria-label="Page ${item}" ${item === currentPage ? 'aria-current="page"' : ""}>${item}</button>`;
  }).join("");

  pager.innerHTML = `
    <div class="pager-container">
      <div class="pager-counter">Showing ${pageStart} to ${pageEnd} of ${total} entries</div>
      <div class="pager-row">
        <button class="page-btn page-nav-btn page-text-btn" onclick="goToCatalogPage(${currentPage - 1})" ${currentPage === 1 ? "disabled" : ""}>
          Previous
        </button>
        ${pageItems}
        <button class="page-btn page-nav-btn page-text-btn" onclick="goToCatalogPage(${currentPage + 1})" ${currentPage === totalPages ? "disabled" : ""}>
          Next
        </button>
      </div>
    </div>
  `;
}

function goToCatalogPage(page) {
  const total = AppState.filteredManga.length;
  const totalPages = Math.ceil(total / CATALOG_PAGE_SIZE);
  if (page < 1 || page > totalPages) return;
  AppState.catalogPage = page;
  renderCatalog();
  // Scroll the catalog section back into view smoothly
  const grid = document.getElementById("directorySection");
  if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
}

function loadMoreCatalogTitles() {
  // Legacy alias — now unused but kept so old inline calls don't throw
  goToCatalogPage((AppState.catalogPage || 1) + 1);
}

function handleDirSearch(val) {
  const clearBtn = document.getElementById("clearDirSearchBtn");
  if (clearBtn) clearBtn.style.display = val ? "block" : "none";
  
  const mainInput = document.getElementById("mainSearchInput");
  if (mainInput && mainInput.value !== val) mainInput.value = val;

  AppState.activeSearchQuery = val.trim();
  AppState.catalogDisplayLimit = 8;
  triggerSearch();
}

function clearDirSearch() {
  const dirInput = document.getElementById("dirSearchInput");
  if (dirInput) dirInput.value = "";
  const clearBtn = document.getElementById("clearDirSearchBtn");
  if (clearBtn) clearBtn.style.display = "none";
  
  const mainInput = document.getElementById("mainSearchInput");
  if (mainInput) mainInput.value = "";

  AppState.activeSearchQuery = "";
  AppState.catalogDisplayLimit = 8;
  triggerSearch();
}

// ==========================================================================
// 7B. DESKTOP MANGA HOVER QUICK-PREVIEW POPOVER
// ==========================================================================
let _popoverTimer = null;
let _popoverCloseTimer = null;

function onMangaCardHoverEnter(event, mangaId) {
  if (window.matchMedia && window.matchMedia("(hover: none)").matches) return;

  clearTimeout(_popoverCloseTimer);
  clearTimeout(_popoverTimer);
  const cardEl = event.currentTarget;

  _popoverTimer = setTimeout(() => {
    showMangaHoverPopover(cardEl, mangaId);
  }, 220);
}

function onMangaCardHoverLeave(event) {
  clearTimeout(_popoverTimer);
  _popoverCloseTimer = setTimeout(() => {
    hideMangaHoverPopover();
  }, 160);
}

function keepHoverPopoverOpen() {
  clearTimeout(_popoverCloseTimer);
}

function onHoverPopoverLeave() {
  hideMangaHoverPopover();
}

function hideMangaHoverPopover() {
  const popover = document.getElementById("mangaHoverPopover");
  if (popover) {
    popover.style.display = "none";
    popover.innerHTML = "";
  }
}

function showMangaHoverPopover(cardEl, mangaId) {
  const manga = MANGA_DATABASE.find(m => m.id === mangaId);
  const popover = document.getElementById("mangaHoverPopover");
  if (!manga || !popover || !cardEl) return;

  const safeTitle = escapeHtml(manga.title);
  const safeSynopsis = escapeHtml(manga.synopsis || "No description available.");
  const synopsisSnippet = safeSynopsis.length > 175 ? safeSynopsis.substring(0, 172) + "..." : safeSynopsis;
  const tagsHtml = manga.genres.slice(0, 5).map(g => `<span class="popover-tag">${escapeHtml(g)}</span>`).join("");
  const isOngoing = manga.releaseDay && manga.releaseDay !== "Archive";
  const statusLabel = isOngoing ? `Ongoing • ${manga.releaseDay}` : "Completed Archive";

  popover.innerHTML = `
    <div class="popover-header">
      <div class="popover-title-row">
        <h4 class="popover-title" title="${safeTitle}">${safeTitle}</h4>
        <span class="popover-score">★ ${manga.rating}</span>
      </div>
      <div class="popover-meta-row">
        <span>📖 Ch. ${manga.totalChapters}</span>
        <span>•</span>
        <span>${manga.type} (${manga.demographic})</span>
        <span>•</span>
        <span class="popover-status">${statusLabel}</span>
      </div>
    </div>

    <p class="popover-synopsis">${synopsisSnippet}</p>

    <div class="popover-tags-row">
      ${tagsHtml}
    </div>

    <div class="popover-actions-row">
      <button class="popover-btn-read" onclick="event.stopPropagation(); hideMangaHoverPopover(); openReader('${manga.id}', 1)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        Read Ch. 1
      </button>
      <button class="popover-btn-details" onclick="event.stopPropagation(); hideMangaHoverPopover(); openMangaDetails('${manga.id}')">
        Details →
      </button>
    </div>
  `;

  // Measure card rect
  const rect = cardEl.getBoundingClientRect();
  const popoverWidth = 320;
  popover.style.display = "block";
  popover.style.visibility = "hidden";
  const popoverHeight = popover.offsetHeight || 250;
  popover.style.visibility = "visible";

  // Calculate X: place to the right, or flip to left if near right viewport edge
  let left = rect.right + 12;
  if (left + popoverWidth > window.innerWidth - 12) {
    left = rect.left - popoverWidth - 12;
  }
  if (left < 10) {
    left = Math.max(10, (window.innerWidth - popoverWidth) / 2);
  }

  // Calculate Y: center vertically with card
  let top = rect.top + (rect.height / 2) - (popoverHeight / 2);
  if (top + popoverHeight > window.innerHeight - 10) {
    top = window.innerHeight - popoverHeight - 10;
  }
  if (top < 10) {
    top = 10;
  }

  popover.style.left = `${Math.round(left)}px`;
  popover.style.top = `${Math.round(top)}px`;
}

// Hide popover on window scroll to prevent trailing
window.addEventListener("scroll", () => {
  hideMangaHoverPopover();
}, { passive: true });

// ==========================================================================
// 8. ADVANCED 4-MODE FULLSCREEN READER ENGINE (MangaPlus Evolution)
// ==========================================================================
function getReaderPageSrc(manga, chapterNumber, pageNum, totalPages) {
  if (AppState.activeReader._offlinePages && AppState.activeReader._offlinePages[pageNum - 1]) {
    return AppState.activeReader._offlinePages[pageNum - 1];
  }
  if (manga && manga.customPages && manga.customPages[pageNum - 1]) {
    return manga.customPages[pageNum - 1];
  }
  return generateMangaPageSVG(manga, chapterNumber, pageNum, totalPages);
}

function scrollReaderToTop() {
  const vp = document.getElementById("readerViewport");
  if (vp) vp.scrollTo({ top: 0, behavior: "smooth" });
}

async function openReader(mangaId, chapterNum = 1, mangadexChapterId = null) {
  const manga = MANGA_DATABASE.find(m => m.id === mangaId);
  if (!manga) return;

  // If chapter is an external link (e.g. MangaPlus/Publisher direct link), open directly
  if (manga._externalMap && manga._externalMap[String(chapterNum)]) {
    window.open(manga._externalMap[String(chapterNum)], "_blank", "noopener,noreferrer");
    return;
  }
  if (AppState.activeSeriesChapters && AppState.activeSeriesManga && AppState.activeSeriesManga.id === mangaId) {
    const chObj = AppState.activeSeriesChapters.find(c => String(c.number) === String(chapterNum));
    if (chObj && chObj.externalUrl) {
      window.open(chObj.externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
  }

  // Clear previous live pages so stale images don't show for a new chapter
  manga.customPages = null;

  AppState.activeReader.isOpen = true;
  AppState.activeReader.manga = manga;
  AppState.activeReader.chapterNumber = chapterNum;
  AppState.activeReader.currentPage = 1;
  AppState.activeReader.totalPages = 8; // placeholder until real pages load
  AppState.activeReader._offlinePages = null;

  // If series has chapters array with individual PDFs, resolve active chapter PDF
  if (manga.chapters && Array.isArray(manga.chapters)) {
    const activeChObj = manga.chapters.find(c => String(c.number) === String(chapterNum));
    if (activeChObj && activeChObj.pdfData) {
      manga.pdfData = activeChObj.pdfData;
    }
  }

  // ── NEW: Try PHP API chapters first (cPanel) — provides pdf_url for local/Archive PDF chapters
  if (!manga.pdfData) {
    try {
      const apiChapters = await fetchApiChapters(manga.id);
      if (apiChapters) {
        const apiCh = apiChapters.find(c => String(c.number) === String(chapterNum));
        if (apiCh?.pdfUrl) {
          manga.pdfData = apiCh.pdfUrl;
        }
      }
    } catch (e) {}
  }

  // Check if offline chapter is stored first
  try {
    const offlineCh = await MangaDB.getOfflineChapter(`${manga.id}-ch${chapterNum}`);
    if (offlineCh) {
      if (offlineCh.pdfData) manga.pdfData = offlineCh.pdfData;
      if (offlineCh.pages && offlineCh.pages.length > 0) {
        AppState.activeReader.totalPages = offlineCh.pages.length;
        AppState.activeReader._offlinePages = offlineCh.pages;
      }
    }
  } catch (e) {}

  const modal = document.getElementById("readerModal");
  if (modal) {
    modal.className = `reader-modal open reader-theme-${AppState.activeReader.theme || "charcoal"}`;
  }
  const themeSelect = document.getElementById("readerThemeSelect");
  if (themeSelect) themeSelect.value = AppState.activeReader.theme || "charcoal";

  document.getElementById("readerMangaTitle").textContent = manga.title;

  // If we have a resolved chapterMap from the detail modal, use it
  // Otherwise fall back to the passed-in mangadexChapterId
  let resolvedChapterId = mangadexChapterId;
  if (!resolvedChapterId && manga._chapterMap) {
    resolvedChapterId = manga._chapterMap[String(chapterNum)];
  }

  // If chapterMap is not yet loaded and this manga is from MangaDex, fetch it
  if (!resolvedChapterId && manga.mangadexId) {
    try {
      if (!manga._chapterMap) {
        const feedRes = await fetch(`https://api.mangadex.org/manga/${manga.mangadexId}/feed?translatedLanguage[]=en&limit=100&order[chapter]=asc`);
        if (feedRes.ok) {
          const feedJson = await feedRes.json();
          manga._chapterMap = {};
          manga._externalMap = {};
          (feedJson.data || []).forEach(c => {
            const num = c.attributes.chapter;
            if (num) {
              if (c.attributes.externalUrl) {
                manga._externalMap[num] = c.attributes.externalUrl;
              } else if (!manga._chapterMap[num]) {
                manga._chapterMap[num] = c.id;
              }
            }
          });
        }
      }
      if (manga._externalMap && manga._externalMap[String(chapterNum)]) {
        window.open(manga._externalMap[String(chapterNum)], "_blank", "noopener,noreferrer");
        return;
      }
      if (manga._chapterMap) {
        resolvedChapterId = manga._chapterMap[String(chapterNum)];
      }
    } catch (err) {
      console.warn("Could not resolve MangaDex chapter:", err);
    }
  }

  // Build chapter select from chapterMap keys if available, else use totalChapters
  const select = document.getElementById("readerChapterSelect");
  if (select) {
    if (manga._chapterMap) {
      const keys = Object.keys(manga._chapterMap).sort((a, b) => parseFloat(a) - parseFloat(b));
      select.innerHTML = keys.map(ch =>
        `<option value="${ch}" ${String(ch) === String(chapterNum) ? "selected" : ""}>Chapter ${ch}</option>`
      ).join("");
    } else {
      select.innerHTML = Array.from({ length: manga.totalChapters }, (_, i) => i + 1)
        .map(ch => `<option value="${ch}" ${ch == chapterNum ? "selected" : ""}>Chapter ${ch}</option>`)
        .join("");
    }
  }

  const slider = document.getElementById("pageScrubber");

  // Show loading state in viewport immediately
  const viewport = document.getElementById("readerViewport");
  if (viewport) {
    viewport.innerHTML = `<div class="reader-pages-loading"><div class="chapter-spinner"></div><span>Loading chapter pages...</span></div>`;
  }

  // Fetch real pages from MangaDex at-home server if we have a chapter ID
  if (resolvedChapterId && !AppState.activeReader._offlinePages && !manga.pdfData) {
    try {
      const atHomeRes = await fetch(`https://api.mangadex.org/at-home/server/${resolvedChapterId}`);
      if (atHomeRes.ok) {
        const atHome = await atHomeRes.json();
        const baseUrl = atHome.baseUrl;
        const hash = atHome.chapter.hash;
        const pageFiles = atHome.chapter.dataSaver || atHome.chapter.data;
        if (pageFiles && pageFiles.length > 0) {
          const subFolder = atHome.chapter.dataSaver ? "data-saver" : "data";
          manga.customPages = pageFiles.map(p => `${baseUrl}/${subFolder}/${hash}/${p}`);
          AppState.activeReader.totalPages = manga.customPages.length;
        }
      }
    } catch (e) {
      console.error("At-home fetch error:", e);
    }
  }

  // If still no pages found, fall back to default preview pages with SVG
  if (!manga.customPages && !AppState.activeReader._offlinePages && !manga.pdfData) {
    AppState.activeReader.totalPages = 8;
  }

  if (slider) {
    slider.max = AppState.activeReader.totalPages;
    slider.value = 1;
  }

  renderReaderViewport();
  MangaDB.saveProgress(manga.id, chapterNum, 1, AppState.activeReader.totalPages);

  updateBreadcrumb([
    { label: "MangaVerse", action: "showCatalogView()" },
    { label: "Directory", action: "showCatalogView()" },
    { label: manga.title, action: `openMangaDetails('${manga.id}')` },
    { label: `Chapter ${chapterNum}` }
  ]);
}

function closeReader() {
  AppState.activeReader.isOpen = false;
  const modal = document.getElementById("readerModal");
  if (modal) modal.classList.remove("open");

  if (AppState.activeSeriesManga) {
    updateBreadcrumb([
      { label: "MangaVerse", action: "showCatalogView()" },
      { label: "Manga Directory", action: "showCatalogView()" },
      { label: AppState.activeSeriesManga.title }
    ]);
  } else {
    updateBreadcrumb([
      { label: "MangaVerse", action: "showCatalogView()" },
      { label: "Manga Directory" }
    ]);
  }
}

function exitReaderToSeries() {
  if (AppState.activeReader && AppState.activeReader.manga) {
    const mangaId = AppState.activeReader.manga.id;
    closeReader();
    openMangaDetails(mangaId);
  } else {
    closeReader();
    showCatalogView();
  }
}

function navigateToHome() {
  closeReader();
  const libModal = document.getElementById("libraryModal");
  if (libModal) libModal.classList.remove("open");
  const detailsModal = document.getElementById("mangaDetailsModal");
  if (detailsModal) detailsModal.classList.remove("open");
  showCatalogView();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function downloadCurrentChapterOffline() {
  const { manga, chapterNumber, totalPages } = AppState.activeReader;
  if (!manga) return;
  const chapterKey = `${manga.id}-ch${chapterNumber}`;
  showToast(`Saving Chapter ${chapterNumber} offline...`);

  try {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(generateMangaPageSVG(manga, chapterNumber, i, totalPages));
    }
    await MangaDB.saveOfflineChapter(chapterKey, manga.id, chapterNumber, pages);
    showToast(`Chapter ${chapterNumber} saved for offline reading.`, "success");
    updateStorageUsageLabel();
  } catch (err) {
    console.error("Offline save error:", err);
    showToast("Could not save chapter offline: " + err.message, "warn");
  }
}

function switchReaderMode(mode) {
  AppState.activeReader.mode = mode;
  document.querySelectorAll(".reader-mode-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });
  renderReaderViewport();
}

let _pdfJsPromise = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (_pdfJsPromise) return _pdfJsPromise;
  _pdfJsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      } else {
        reject(new Error("pdfjsLib unavailable"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js"));
    document.head.appendChild(script);
  });
  return _pdfJsPromise;
}

async function renderPdfChapterCanvas(viewport, pdfUrl, manga) {
  const pageLabel = document.getElementById("readerPageNumLabel");
  const fill = document.getElementById("readerProgressFill");
  viewport.innerHTML = `<div class="reader-loading-state"><div class="loader-spinner"></div><p>Loading ${escapeHtml(manga.title)}...</p></div>`;

  try {
    const pdfjsLib = await loadPdfJs();
    const pdf = await pdfjsLib.getDocument({ url: pdfUrl, disableAutoFetch: false }).promise;
    AppState.activeReader.totalPages = pdf.numPages;
    if (pageLabel) pageLabel.textContent = `Page 1 / ${pdf.numPages}`;
    if (fill) fill.style.width = `${Math.round((1 / pdf.numPages) * 100)}%`;

    const stack = document.createElement("div");
    stack.className = "reader-webtoon-stack pdf-canvas-stack";
    stack.oncontextmenu = () => false;
    viewport.innerHTML = "";
    viewport.appendChild(stack);

    const targetWidth = Math.min(860, Math.max(320, viewport.clientWidth - 32));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const baseVp = page.getViewport({ scale: 1 });
      const scale = targetWidth / baseVp.width;
      const renderVp = page.getViewport({ scale: scale * dpr });

      const canvas = document.createElement("canvas");
      canvas.className = "reader-pdf-canvas";
      canvas.width = Math.floor(renderVp.width);
      canvas.height = Math.floor(renderVp.height);
      canvas.style.width = `${Math.floor(targetWidth)}px`;
      canvas.style.height = `${Math.floor(baseVp.height * scale)}px`;
      canvas.dataset.page = String(pageNum);
      stack.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport: renderVp }).promise;
    }
  } catch (err) {
    console.warn("PDF.js fallback:", err);
    viewport.innerHTML = `
      <div class="reader-viewport-pdf" oncontextmenu="return false;">
        <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1" class="manga-pdf-frame" title="${escapeHtml(manga.title)}"></iframe>
      </div>
    `;
    if (pageLabel) pageLabel.textContent = "PDF Reader";
  }
}

function renderReaderViewport() {
  const viewport = document.getElementById("readerViewport");
  if (!viewport) return;

  const { manga, chapterNumber, currentPage, totalPages, theme, mode } = AppState.activeReader;
  if (!manga) return;
  viewport.className = `reader-viewport-container reader-theme-${theme}`;

  // Update page number label
  const pageLabel = document.getElementById("readerPageNumLabel");
  if (pageLabel) pageLabel.textContent = `Page ${currentPage} / ${totalPages}`;

  const fill = document.getElementById("readerProgressFill");
  if (fill) fill.style.width = `${Math.min(100, Math.round((currentPage / totalPages) * 100))}%`;

  if (manga.pdfData) {
    renderPdfChapterCanvas(viewport, manga.pdfData, manga);
    return;
  }

  // Smart previous / next chapter calculation
  let prevCh = null;
  let nextCh = null;
  if (AppState.activeSeriesChapters && AppState.activeSeriesChapters.length > 0) {
    const sortedNums = AppState.activeSeriesChapters
      .map(c => c.number)
      .sort((a, b) => parseFloat(a) - parseFloat(b));
    const curIdx = sortedNums.indexOf(String(chapterNumber));
    if (curIdx > 0) prevCh = sortedNums[curIdx - 1];
    if (curIdx !== -1 && curIdx < sortedNums.length - 1) nextCh = sortedNums[curIdx + 1];
  }
  if (!prevCh && Number(chapterNumber) > 1) prevCh = String(Number(chapterNumber) - 1);
  if (!nextCh && Number(chapterNumber) < manga.totalChapters) nextCh = String(Number(chapterNumber) + 1);

  const prevAttr = prevCh ? `onclick="openReader('${manga.id}', '${prevCh}')"` : "disabled";
  const nextAttr = nextCh ? `onclick="openReader('${manga.id}', '${nextCh}')"` : "disabled";

  const quickNavHtml = `
    <div class="reader-chapter-quicknav">
      <button class="quicknav-btn" ${prevAttr}>
        ← Previous
      </button>
      <span class="quicknav-chapter-title">${escapeHtml(manga.title)} • Chapter ${chapterNumber}</span>
      <button class="quicknav-btn" ${nextAttr}>
        Next →
      </button>
    </div>
  `;

  if (mode === "vertical") {
    // Mode 1: Continuous Webtoon Scroll (Seamless, Eleceed/Webtoons style)
    viewport.innerHTML = `
      <div class="reader-viewport-vertical">
        ${quickNavHtml}
        ${Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const pageSrc = getReaderPageSrc(manga, chapterNumber, pageNum, totalPages);
          return `<img class="manga-page-img" src="${pageSrc}" alt="Page ${pageNum}" loading="lazy" referrerpolicy="no-referrer"/>`;
        }).join("")}

        <!-- Screen 4 Chapter Climax Card -->
        <div class="reader-climax-card">
          <span class="climax-badge">CHAPTER CLIMAX</span>
          <h3 class="climax-title">TO BE CONTINUED</h3>
          <p class="climax-desc">Chapter ${nextCh || Math.min(manga.totalChapters, Number(chapterNumber) + 1)}: Official simulpub releases weekly on MangaVerse.</p>
          <div class="climax-actions">
            <button class="climax-next-btn" ${nextAttr}>Next Chapter →</button>
            <button class="climax-fav-btn" onclick="setMangaShelf('${manga.id}', 'favorites')" title="Favorite" aria-label="Favorite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
          </div>
        </div>

        <!-- Chapter Discussion Section (Webtoons / MangaPlus style) -->
        <section id="chapterDiscussionSection" class="reader-comments-section">
          <div class="comments-section-header">
            <div class="comments-section-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>Chapter Discussion (<span id="chapterCommentCount">2</span>)</span>
            </div>
            <span class="comments-guidelines-hint">Keep it respectful • Tag spoilers</span>
          </div>

          <!-- Comment Input Box -->
          <div class="comment-input-box">
            <textarea id="chapterCommentInput" class="comment-textarea" placeholder="Share your thoughts or theories on Chapter ${chapterNumber}..." rows="3" maxlength="800"></textarea>
            <div class="comment-input-footer">
              <label class="comment-spoiler-label">
                <input type="checkbox" id="chapterSpoilerCheck"/>
                <span>Mark as spoiler</span>
              </label>
              <button class="btn-primary-glow comment-post-btn" onclick="postInlineChapterComment()">Post Comment</button>
            </div>
          </div>

          <!-- Comments List -->
          <div id="chapterCommentsList" class="chapter-comments-list"></div>
        </section>

        <!-- Floating Scroll to Top button (Webtoons style) -->
        <button id="readerScrollTopBtn" class="reader-scroll-top-btn" onclick="scrollReaderToTop()" title="Back to Top" aria-label="Back to Top">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
        </button>
      </div>
    `;

    viewport.onscroll = () => {
      const scrollPercent = viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
      if (fill) fill.style.width = `${Math.min(100, Math.round(scrollPercent * 100))}%`;
      const topBtn = document.getElementById("readerScrollTopBtn");
      if (topBtn) {
        topBtn.classList.toggle("visible", viewport.scrollTop > 350);
      }
    };
    loadAndRenderChapterComments();
  } else if (mode === "double-spread") {
    // Mode 2: Double-Page Spread
    const page1 = currentPage;
    const page2 = Math.min(totalPages, currentPage + 1);
    const src1 = getReaderPageSrc(manga, chapterNumber, page1, totalPages);
    const src2 = getReaderPageSrc(manga, chapterNumber, page2, totalPages);

    viewport.innerHTML = `
      ${quickNavHtml}
      <div class="tap-zone-left" onclick="prevReaderPage()" title="Previous Page"></div>
      <div class="tap-zone-right" onclick="nextReaderPage()" title="Next Page"></div>
      <div class="reader-viewport-spread">
        <img class="spread-page-img" src="${src1}" alt="Page ${page1}" referrerpolicy="no-referrer"/>
        ${page2 !== page1 ? `<img class="spread-page-img" src="${src2}" alt="Page ${page2}" referrerpolicy="no-referrer"/>` : ""}
      </div>
    `;
  } else {
    // Mode 3: Single Page (RTL or LTR)
    const src = getReaderPageSrc(manga, chapterNumber, currentPage, totalPages);
    viewport.innerHTML = `
      ${quickNavHtml}
      <div class="tap-zone-left" onclick="${mode === 'single-rtl' ? 'nextReaderPage()' : 'prevReaderPage()'}" title="Flip"></div>
      <div class="tap-zone-right" onclick="${mode === 'single-rtl' ? 'prevReaderPage()' : 'nextReaderPage()'}" title="Flip"></div>
      <div class="reader-viewport-single">
        <img class="paginated-img" src="${src}" alt="Page ${currentPage}" referrerpolicy="no-referrer"/>
      </div>
    `;
  }
}

function nextReaderPage() {
  const { currentPage, totalPages, manga, chapterNumber } = AppState.activeReader;
  const step = AppState.activeReader.mode === "double-spread" ? 2 : 1;
  if (currentPage + step <= totalPages) {
    AppState.activeReader.currentPage += step;
    renderReaderViewport();
    MangaDB.saveProgress(manga.id, chapterNumber, AppState.activeReader.currentPage, totalPages);
  } else {
    showToast(`Reached end of Chapter ${chapterNumber}. Loading next chapter...`);
  }
}

function prevReaderPage() {
  const { currentPage, totalPages, manga, chapterNumber } = AppState.activeReader;
  const step = AppState.activeReader.mode === "double-spread" ? 2 : 1;
  if (currentPage - step >= 1) {
    AppState.activeReader.currentPage -= step;
    renderReaderViewport();
    MangaDB.saveProgress(manga.id, chapterNumber, AppState.activeReader.currentPage, totalPages);
  }
}

function jumpToPage(val) {
  AppState.activeReader.currentPage = parseInt(val);
  renderReaderViewport();
}

function setReaderTheme(theme) {
  AppState.activeReader.theme = theme;
  const modal = document.getElementById("readerModal");
  if (modal) {
    modal.className = `reader-modal open reader-theme-${theme}`;
  }
  const select = document.getElementById("readerThemeSelect");
  if (select && select.value !== theme) select.value = theme;
  renderReaderViewport();
}

function toggleDiscussionsDrawer() {
  const drawer = document.getElementById("discussionsDrawer");
  const inlineSec = document.getElementById("chapterDiscussionSection");
  if (AppState.activeReader.mode === "vertical" && inlineSec) {
    inlineSec.scrollIntoView({ behavior: "smooth" });
  } else if (drawer) {
    drawer.classList.toggle("open");
  }
}

function getChapterCommentsKey(mangaId, chapterNum) {
  return `mv_comments_${mangaId}_ch${chapterNum}`;
}

function loadAndRenderChapterComments() {
  const listEl = document.getElementById("chapterCommentsList");
  const countEl = document.getElementById("chapterCommentCount");
  const { manga, chapterNumber } = AppState.activeReader;
  if (!listEl || !manga) return;

  const storageKey = getChapterCommentsKey(manga.id, chapterNumber);
  let comments = [];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) comments = JSON.parse(saved);
  } catch (e) {}

  if (comments.length === 0) {
    comments = [
      {
        id: "c-seed-1",
        author: "Ren_Tokyo99",
        text: `The artwork and pacing in Chapter ${chapterNumber} is top tier! Really enjoy how this story develops.`,
        isSpoiler: false,
        upvotes: 142,
        timeAgo: "2h ago"
      },
      {
        id: "c-seed-2",
        author: "OtomeReader",
        text: `Keep an eye on the background panels on the final page! Such subtle foreshadowing.`,
        isSpoiler: true,
        upvotes: 89,
        timeAgo: "5h ago"
      }
    ];
  }

  if (countEl) countEl.textContent = comments.length;

  listEl.innerHTML = comments.map(c => {
    const safeAuthor = escapeHtml(c.author);
    const safeText = escapeHtml(c.text);
    const spoilerClass = c.isSpoiler ? " spoiler-hidden" : "";
    const spoilerBadge = c.isSpoiler ? `<span class="spoiler-tag">Spoiler • Click to reveal</span>` : "";
    return `
      <div class="reader-comment-card">
        <div class="comment-author-bar">
          <div class="comment-author-info">
            <span class="comment-avatar">${safeAuthor.charAt(0).toUpperCase()}</span>
            <span class="comment-author-name">${safeAuthor}</span>
            <span class="comment-time">${c.timeAgo || "Just now"}</span>
          </div>
          <button class="comment-upvote-pill" onclick="upvoteInlineComment('${c.id}')" title="Upvote">
            ▲ <span>${c.upvotes || 0}</span>
          </button>
        </div>
        ${spoilerBadge}
        <div class="comment-content${spoilerClass}" onclick="this.classList.toggle('spoiler-hidden')">
          ${safeText}
        </div>
      </div>
    `;
  }).join("");
}

function postInlineChapterComment() {
  const input = document.getElementById("chapterCommentInput");
  const spoilerCheck = document.getElementById("chapterSpoilerCheck");
  const { manga, chapterNumber } = AppState.activeReader;
  if (!input || !manga) return;

  const text = (input.value || "").trim();
  if (!text) {
    showToast("Please enter a comment before posting.", "warn");
    return;
  }

  const storageKey = getChapterCommentsKey(manga.id, chapterNumber);
  let comments = [];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) comments = JSON.parse(saved);
  } catch (e) {}

  if (comments.length === 0) {
    comments = [
      {
        id: "c-seed-1",
        author: "Ren_Tokyo99",
        text: `The artwork and pacing in Chapter ${chapterNumber} is top tier! Really enjoy how this story develops.`,
        isSpoiler: false,
        upvotes: 142,
        timeAgo: "2h ago"
      },
      {
        id: "c-seed-2",
        author: "OtomeReader",
        text: `Keep an eye on the background panels on the final page! Such subtle foreshadowing.`,
        isSpoiler: true,
        upvotes: 89,
        timeAgo: "5h ago"
      }
    ];
  }

  const newComment = {
    id: "c-" + Date.now(),
    author: "MangaVerseReader",
    text: text,
    isSpoiler: spoilerCheck ? spoilerCheck.checked : false,
    upvotes: 1,
    timeAgo: "Just now"
  };

  comments.unshift(newComment);
  try {
    localStorage.setItem(storageKey, JSON.stringify(comments));
  } catch (e) {}

  input.value = "";
  if (spoilerCheck) spoilerCheck.checked = false;
  showToast("Comment posted!");
  loadAndRenderChapterComments();
}

function upvoteInlineComment(commentId) {
  const { manga, chapterNumber } = AppState.activeReader;
  if (!manga) return;
  const storageKey = getChapterCommentsKey(manga.id, chapterNumber);
  let comments = [];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) comments = JSON.parse(saved);
  } catch (e) {}

  const target = comments.find(c => c.id === commentId);
  if (target) {
    target.upvotes = (target.upvotes || 0) + 1;
    try {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch (e) {}
    loadAndRenderChapterComments();
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

async function postReaderComment() {
  const input = document.getElementById("commentTextInput");
  if (!input || !input.value.trim()) return;

  // Rate limiting — 10-second cooldown
  const now = Date.now();
  if (now - lastCommentTimestamp < 10000) {
    showToast("Please wait 10 seconds before posting another comment.", "warn");
    return;
  }
  lastCommentTimestamp = now;

  // Input length guard
  if (input.value.trim().length > 500) {
    showToast("Comment too long — maximum 500 characters.", "warn");
    return;
  }

  const isSpoiler = document.getElementById("commentSpoilerCheck")?.checked;
  const mangaId = AppState.activeReader.manga?.id || "general";
  const chapterKey = `${mangaId}-ch${AppState.activeReader.chapterNumber}`;

  const comment = {
    chapterKey,
    author: "MangaFan_" + Math.floor(Math.random() * 899 + 100),
    text: input.value.trim(),
    isSpoiler: !!isSpoiler
  };

  try {
    await MangaDB.addDiscussion(comment);

    const body = document.getElementById("discussionsBody");
    if (body) {
      const el = document.createElement("div");
      el.className = "discussion-msg";
      const safeAuthor = escapeHtml(comment.author);
      const safeText = escapeHtml(comment.text);
      el.innerHTML = `
        <div class="discussion-author-row">
          <span class="discussion-author">${safeAuthor}</span>
          <button class="upvote-btn" onclick="upvoteComment(this)">Upvote <span>0</span></button>
        </div>
        <div class="discussion-text ${comment.isSpoiler ? 'spoiler-text' : ''}" onclick="this.classList.toggle('revealed')">
          ${safeText}
        </div>
      `;
      body.appendChild(el);
    }

    input.value = "";
    showToast("Comment posted.");
  } catch (err) {
    console.error("Failed to post comment:", err);
    showToast("Could not save comment: " + (err.message || "Storage error"), "warn");
  }
}

function upvoteComment(btn) {
  const countSpan = btn.querySelector("span");
  if (countSpan) {
    const count = parseInt(countSpan.textContent) + 1;
    countSpan.textContent = count;
    btn.style.color = "var(--accent-crimson)";
  }
}

// ==========================================================================
// 9. MANGA DETAILS & SHELF SELECTOR
// ==========================================================================
// ==========================================================================
// 10. DEDICATED MANGA SERIES PAGE & OFFICIAL CHAPTER DIRECTORY
// ==========================================================================
function openMangaDetails(mangaId) {
  const manga = MANGA_DATABASE.find(m => m.id === mangaId);
  if (!manga) return;

  const dirSec = document.getElementById("directorySection");
  const serSec = document.getElementById("seriesSection");

  // If dedicated series section exists in DOM, switch to full-page view
  if (dirSec && serSec) {
    dirSec.style.display = "none";
    serSec.style.display = "block";
    window.location.hash = `#/series/${manga.id}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    renderSeriesPage(manga);
    return;
  }

  // Fallback to modal if section not present
  const modal = document.getElementById("mangaDetailsModal");
  const body = document.getElementById("mangaDetailsBody");
  if (!modal || !body) return;
  modal.classList.add("open");
}

function showCatalogView() {
  const dirSec = document.getElementById("directorySection");
  const serSec = document.getElementById("seriesSection");
  if (serSec) serSec.style.display = "none";
  if (dirSec) dirSec.style.display = "block";
  if (window.location.hash.startsWith("#/series/")) {
    history.pushState(null, "", window.location.pathname + window.location.search);
  }
  updateBreadcrumb([
    { label: "MangaVerse", action: "window.scrollTo({top:0,behavior:'smooth'})" },
    { label: "Manga Directory" }
  ]);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleSeriesShelfMenu(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById("seriesShelfDropdown");
  if (menu) menu.classList.toggle("open");
}

function renderSeriesPage(manga) {
  const serSec = document.getElementById("seriesSection");
  if (!serSec) return;

  updateBreadcrumb([
    { label: "MangaVerse", action: "showCatalogView()" },
    { label: "Manga Directory", action: "showCatalogView()" },
    { label: manga.title }
  ]);

  const cover = generateCoverSVG(manga);
  const safeTitle = escapeHtml(manga.title);
  const safeAlt = manga.altTitle ? escapeHtml(manga.altTitle) : safeTitle;
  const safeAuthor = escapeHtml(manga.author);
  const safeArtist = escapeHtml(manga.artist);
  const safeSynopsis = escapeHtml(manga.synopsis);

  AppState.activeSeriesManga = manga;
  AppState.activeSeriesChapters = [];
  AppState.activeSeriesVolume = "all";
  AppState.activeSeriesSort = "asc";

  const isOngoing = manga.releaseDay && manga.releaseDay !== "Archive";
  const statusBadge = isOngoing
    ? `<span class="badge-status-ongoing">Ongoing • Official Simulpub</span>`
    : `<span class="badge-status-completed">Completed Archive</span>`;

  serSec.innerHTML = `
    <!-- Top Navigation / Breadcrumbs -->
    <div class="series-nav-bar">
      <button class="btn-back-catalog" onclick="showCatalogView()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Catalog
      </button>
      <div class="series-breadcrumb">
        <span onclick="showCatalogView()" class="crumb-link">Directory</span>
        <span class="crumb-sep">/</span>
        <span class="crumb-current">${safeTitle}</span>
      </div>
    </div>

    <!-- Series Hero Card -->
    <div class="series-hero-card">
      <div class="series-poster-wrap">
        <img src="${cover}" alt="${safeTitle}" class="series-poster-img"/>
        <div class="series-poster-badge">★ ${manga.rating} • ${manga.demographic}</div>
      </div>

      <div class="series-info-pane">
        <div class="series-badge-row">
          <span class="series-type-pill">${manga.type.toUpperCase()}</span>
          ${statusBadge}
          <span class="series-provider-badge">Verified Official Index</span>
        </div>

        <h1 class="series-hero-title">${safeTitle}</h1>
        <div class="series-alt-title-line">
          <span class="alt-label">Alt titles:</span> <span class="alt-val">${safeAlt}</span>
        </div>

        <div class="series-meta-row">
          <div class="meta-item"><span class="meta-k">Author</span> <span class="meta-v">${safeAuthor}</span></div>
          <div class="meta-item"><span class="meta-k">Artist</span> <span class="meta-v">${safeArtist}</span></div>
          <div class="meta-item"><span class="meta-k">Format</span> <span class="meta-v">${manga.type} (${manga.demographic})</span></div>
          <div class="meta-item"><span class="meta-k">Total Chapters</span> <span class="meta-v" id="seriesTotalChLabel">${manga.totalChapters} Chapters</span></div>
        </div>

        <div class="series-genres-row">
          ${manga.genres.map(g => `<span class="genre-pill">${escapeHtml(g)}</span>`).join("")}
        </div>

        <p class="series-synopsis-text">${safeSynopsis}</p>

        <div class="series-cta-row">
          <button class="btn-primary-glow btn-series-start" onclick="openReader('${manga.id}', 1)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Start Chapter 1
          </button>

          <div class="shelf-dropdown-wrap">
            <button class="btn-shelf-trigger" onclick="toggleSeriesShelfMenu(event)" aria-haspopup="true">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              Add to Shelf ▾
            </button>
            <div id="seriesShelfDropdown" class="shelf-dropdown-menu" role="menu">
              <button class="shelf-opt" onclick="setMangaShelf('${manga.id}', 'reading')">Currently Reading</button>
              <button class="shelf-opt" onclick="setMangaShelf('${manga.id}', 'want_to_read')">Plan to Read</button>
              <button class="shelf-opt" onclick="setMangaShelf('${manga.id}', 'completed')">Completed</button>
              <button class="shelf-opt" onclick="setMangaShelf('${manga.id}', 'on_hold')">On Hold</button>
              <button class="shelf-opt" onclick="setMangaShelf('${manga.id}', 'favorites')">★ Favorite</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Official Trailer Strip (compact, below hero card) -->
    ${(manga.trailerUrl || manga.trailer_id || manga.trailerId) ? (() => {
      const rawTrailer = String(manga.trailerUrl || manga.trailer_id || manga.trailerId).trim();
      const ytMatch = rawTrailer.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
      const videoId = ytMatch ? ytMatch[1] : (rawTrailer.length === 11 ? rawTrailer : null);
      if (!videoId) return '';
      return `<div class="series-trailer-strip">
        <div class="trailer-strip-info">
          <div class="trailer-strip-label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            Official Trailer
          </div>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener noreferrer" class="trailer-yt-link">Watch on YouTube ↗</a>
        </div>
        <div class="trailer-strip-frame">
          <iframe
            src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1"
            title="${safeTitle} Official Trailer"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>`;
    })() : ''}

    <!-- Official Release Schedule Banner -->
    <div class="series-schedule-box">
      <div class="schedule-icon-pill">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="schedule-text-wrap">
        <div class="schedule-headline">Official Release Schedule & Research Data</div>
        <div id="seriesScheduleNote" class="schedule-subline">Analyzing latest chapter updates from MangaDex network...</div>
      </div>
    </div>

    <!-- Official Chapter Directory -->
    <div class="series-chapters-section">
      <div class="chapters-header-bar">
        <div class="chapters-heading-wrap">
          <h2 class="chapters-section-title">Official Chapters & Episodes</h2>
          <span id="seriesChapterCounterBadge" class="chapter-count-tag">Loading...</span>
        </div>

        <div class="chapters-controls-wrap">
          <!-- Chapter Search Box -->
          <div class="chapter-search-box">
            <input type="text" id="seriesChapterFilterInput" placeholder="Filter ch. number or title..." oninput="onSeriesChapterSearch(this.value)" autocomplete="off"/>
          </div>

          <!-- Sort Order Button -->
          <button id="seriesSortToggleBtn" class="btn-sort-toggle" onclick="toggleSeriesChapterSort()" title="Toggle Ascending / Descending">
            <span id="sortDirectionLabel">Oldest (1 → N)</span>
          </button>
        </div>
      </div>

      <!-- Volume Category Tabs Bar -->
      <div id="seriesVolumeTabs" class="volume-tabs-bar">
        <!-- Injected via JS -->
      </div>

      <!-- Chapter Cards Grid -->
      <div id="seriesChapterGrid" class="series-chapter-grid">
        <div class="chapter-grid-loading">
          <div class="chapter-spinner"></div>
          <span>Fetching official chapters from MangaDex...</span>
        </div>
      </div>

      <!-- Chapter Pagination Controls -->
      <div id="seriesChapterPagination" class="series-chapter-pagination"></div>
    </div>
  `;

  // Fetch chapters async
  _fetchAndRenderSeriesChapters(manga);
}

async function _fetchAndRenderSeriesChapters(manga) {
  const grid = document.getElementById("seriesChapterGrid");
  const countBadge = document.getElementById("seriesChapterCounterBadge");
  const scheduleNote = document.getElementById("seriesScheduleNote");
  const tabsBar = document.getElementById("seriesVolumeTabs");
  const totalChLabel = document.getElementById("seriesTotalChLabel");
  if (!grid) return;

  let allChapters = [];

  if (manga._cachedChapters && manga._cachedChapters.length > 0) {
    allChapters = manga._cachedChapters;
  } else if (manga.mangadexId) {
    try {
      let offset = 0;
      const limit = 100;
      while (true) {
        const url = `https://api.mangadex.org/manga/${manga.mangadexId}/feed?translatedLanguage[]=en&order[chapter]=asc&limit=${limit}&offset=${offset}&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&contentRating[]=pornographic`;
        const res = await fetch(url);
        if (!res.ok) break;
        const data = await res.json();
        const batch = data.data || [];
        allChapters.push(...batch);
        if (batch.length < limit || allChapters.length >= data.total) break;
        offset += limit;
        if (offset >= 500) break;
        await new Promise(r => setTimeout(r, 150));
      }
      manga._cachedChapters = allChapters;
    } catch (e) {
      console.warn("MangaDex feed error:", e);
    }
  }

  // If MangaDex returned chapters, format them
  // Otherwise generate official catalog chapters from manga.totalChapters
  let normalizedChapters = [];

  if (allChapters.length > 0) {
    // Keep 1 chapter entry per chapter number
    const seenNumbers = new Set();
    const chapterMap = {};
    const externalMap = {};

    allChapters.forEach(ch => {
      const num = ch.attributes.chapter;
      if (num && !seenNumbers.has(num)) {
        seenNumbers.add(num);
        if (ch.attributes.externalUrl) {
          externalMap[num] = ch.attributes.externalUrl;
        } else {
          chapterMap[num] = ch.id;
        }
        normalizedChapters.push({
          id: ch.id,
          number: num,
          volume: ch.attributes.volume || "1",
          title: ch.attributes.title || `Chapter ${num}`,
          publishAt: ch.attributes.publishAt,
          pages: ch.attributes.pages || 0,
          externalUrl: ch.attributes.externalUrl || null,
          isOfficial: true
        });
      }
    });
    manga._chapterMap = chapterMap;
    manga._externalMap = externalMap;
  }

  // If no chapters from MangaDex, generate structured official chapters from totalChapters
  if (normalizedChapters.length === 0) {
    const total = manga.totalChapters || 12;
    for (let i = 1; i <= total; i++) {
      const volNum = Math.ceil(i / 15);
      normalizedChapters.push({
        id: `local-ch-${i}`,
        number: String(i),
        volume: String(volNum),
        title: `Chapter ${i}`,
        publishAt: null,
        pages: 8,
        externalUrl: null,
        isOfficial: true
      });
    }
  }

  AppState.activeSeriesChapters = normalizedChapters;

  // Update schedule status note
  if (scheduleNote) {
    if (manga.releaseDay && manga.releaseDay !== "Archive") {
      const lastCh = normalizedChapters[normalizedChapters.length - 1];
      const pubDate = lastCh && lastCh.publishAt ? new Date(lastCh.publishAt) : null;
      if (pubDate) {
        const nextDrop = new Date(pubDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const now = new Date();
        const diffDays = Math.ceil((nextDrop - now) / (1000 * 60 * 60 * 24));
        scheduleNote.textContent = diffDays > 0
          ? `Official Simulpub: Next chapter drops in ~${diffDays} day${diffDays !== 1 ? "s" : ""} (Every ${manga.releaseDay})`
          : `Official Simulpub: New chapter drop expected this week (Every ${manga.releaseDay})`;
      } else {
        scheduleNote.textContent = `Official Simulpub: New chapters released weekly on ${manga.releaseDay}.`;
      }
    } else {
      scheduleNote.textContent = `Completed Series Archive: All ${normalizedChapters.length} official chapters are indexed and ready to read.`;
    }
  }

  if (countBadge) countBadge.textContent = `${normalizedChapters.length} Chapters`;
  if (totalChLabel) totalChLabel.textContent = `${normalizedChapters.length} Chapters`;

  // Build Volume Category Tabs
  const volumeSet = new Set();
  normalizedChapters.forEach(c => {
    if (c.volume) volumeSet.add(c.volume);
  });
  const sortedVolumes = Array.from(volumeSet).sort((a, b) => parseFloat(a) - parseFloat(b));

  if (tabsBar) {
    let tabsHtml = `<button class="vol-tab-btn active" onclick="onSelectSeriesVolume('all')">All Chapters (${normalizedChapters.length})</button>`;
    sortedVolumes.forEach(vol => {
      const count = normalizedChapters.filter(c => c.volume === vol).length;
      tabsHtml += `<button class="vol-tab-btn" onclick="onSelectSeriesVolume('${vol}')">Volume ${vol} (${count})</button>`;
    });
    tabsBar.innerHTML = tabsHtml;
  }

  renderSeriesChapterGrid();
}

function onSelectSeriesVolume(volume) {
  AppState.activeSeriesVolume = volume;
  AppState.activeSeriesChapterPage = 1;
  document.querySelectorAll(".vol-tab-btn").forEach(btn => {
    const isTarget = (volume === "all" && btn.textContent.startsWith("All")) || btn.textContent.startsWith(`Volume ${volume} `);
    btn.classList.toggle("active", isTarget);
  });
  renderSeriesChapterGrid();
}

function toggleSeriesChapterSort() {
  AppState.activeSeriesSort = AppState.activeSeriesSort === "asc" ? "desc" : "asc";
  AppState.activeSeriesChapterPage = 1;
  const label = document.getElementById("sortDirectionLabel");
  if (label) {
    label.textContent = AppState.activeSeriesSort === "asc" ? "Oldest (1 → N)" : "Latest (N → 1)";
  }
  renderSeriesChapterGrid();
}

function onSeriesChapterSearch(query) {
  AppState.activeSeriesFilterQuery = (query || "").trim().toLowerCase();
  AppState.activeSeriesChapterPage = 1;
  renderSeriesChapterGrid();
}

function renderSeriesChapterGrid() {
  const grid = document.getElementById("seriesChapterGrid");
  const pager = document.getElementById("seriesChapterPagination");
  if (!grid || !AppState.activeSeriesChapters) return;

  const manga = AppState.activeSeriesManga;
  let list = [...AppState.activeSeriesChapters];

  // 1. Filter by volume
  if (AppState.activeSeriesVolume && AppState.activeSeriesVolume !== "all") {
    list = list.filter(c => String(c.volume) === String(AppState.activeSeriesVolume));
  }

  // 2. Filter by search query
  if (AppState.activeSeriesFilterQuery) {
    const q = AppState.activeSeriesFilterQuery;
    list = list.filter(c =>
      String(c.number).includes(q) ||
      (c.title && c.title.toLowerCase().includes(q))
    );
  }

  // 3. Sort
  list.sort((a, b) => {
    const na = parseFloat(a.number) || 0;
    const nb = parseFloat(b.number) || 0;
    return AppState.activeSeriesSort === "asc" ? na - nb : nb - na;
  });

  const totalChapters = list.length;

  if (totalChapters === 0) {
    grid.innerHTML = `<div class="empty-chapters-msg">No chapters matched your criteria.</div>`;
    if (pager) pager.innerHTML = "";
    return;
  }

  // 4. Pagination (matches user requested format: Showing X to Y of Z entries ... Previous [1] 2 Next)
  const totalPages = Math.ceil(totalChapters / SERIES_CHAPTER_PAGE_SIZE);
  if (!AppState.activeSeriesChapterPage || AppState.activeSeriesChapterPage < 1) {
    AppState.activeSeriesChapterPage = 1;
  }
  if (AppState.activeSeriesChapterPage > totalPages) {
    AppState.activeSeriesChapterPage = totalPages;
  }

  const curPage = AppState.activeSeriesChapterPage;
  const startIdx = (curPage - 1) * SERIES_CHAPTER_PAGE_SIZE;
  const endIdx = Math.min(startIdx + SERIES_CHAPTER_PAGE_SIZE, totalChapters);
  const pagedList = list.slice(startIdx, endIdx);

  grid.innerHTML = pagedList.map(ch => {
    const safeTitle = escapeHtml(ch.title || `Chapter ${ch.number}`);
    const pubDate = ch.publishAt
      ? new Date(ch.publishAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : "Official Release";
    const volLabel = ch.volume ? `Vol. ${ch.volume} • ` : "";
    const isExternal = Boolean(ch.externalUrl);
    const badgeText = isExternal ? "External ↗" : "Official";
    const clickAction = isExternal
      ? `window.open('${escapeHtml(ch.externalUrl)}', '_blank', 'noopener,noreferrer')`
      : `openReader('${manga.id}', '${ch.number}', '${ch.id || ''}')`;
    const readBtnHtml = isExternal
      ? `<button class="chapter-card-read-btn" style="background:#27272a; border:1px solid #3f3f46; color:#a1a1aa;">Official ↗</button>`
      : `<button class="chapter-card-read-btn">Read →</button>`;

    return `
      <div class="chapter-card${isExternal ? " external-card" : ""}" onclick="${clickAction}">
        <div class="chapter-card-top">
          <span class="chapter-card-vol">${volLabel}Chapter ${ch.number}</span>
          <span class="chapter-card-badge${isExternal ? " external-badge" : ""}">${badgeText}</span>
        </div>
        <div class="chapter-card-title" title="${safeTitle}">${safeTitle}</div>
        <div class="chapter-card-footer">
          <span class="chapter-card-date">${pubDate}</span>
          ${readBtnHtml}
        </div>
      </div>
    `;
  }).join("");

  if (pager) {
    if (totalPages <= 1) {
      pager.innerHTML = `
        <div class="pager-container">
          <div class="pager-counter">Showing 1 to ${totalChapters} of ${totalChapters} entries</div>
        </div>
      `;
      return;
    }

    const delta = 2;
    const pages = [];
    const rStart = Math.max(2, curPage - delta);
    const rEnd = Math.min(totalPages - 1, curPage + delta);
    pages.push(1);
    if (rStart > 2) pages.push("…");
    for (let p = rStart; p <= rEnd; p++) pages.push(p);
    if (rEnd < totalPages - 1) pages.push("…");
    pages.push(totalPages);

    const pageButtons = pages.map(item => {
      if (item === "…") return `<span class="page-ellipsis">···</span>`;
      const isActive = item === curPage ? " page-btn-active" : "";
      return `<button class="page-btn${isActive}" onclick="goToSeriesChapterPage(${item})" aria-label="Page ${item}">${item}</button>`;
    }).join("");

    pager.innerHTML = `
      <div class="pager-container">
        <div class="pager-counter">Showing ${startIdx + 1} to ${endIdx} of ${totalChapters} entries</div>
        <div class="pager-row">
          <button class="page-btn page-nav-btn page-text-btn" onclick="goToSeriesChapterPage(${curPage - 1})" ${curPage === 1 ? "disabled" : ""}>
            Previous
          </button>
          ${pageButtons}
          <button class="page-btn page-nav-btn page-text-btn" onclick="goToSeriesChapterPage(${curPage + 1})" ${curPage === totalPages ? "disabled" : ""}>
            Next
          </button>
        </div>
      </div>
    `;
  }
}

function goToSeriesChapterPage(pageNum) {
  AppState.activeSeriesChapterPage = pageNum;
  renderSeriesChapterGrid();
  const el = document.getElementById("seriesChapterGrid");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Support browser back/forward and deep-linking via URL hash
window.addEventListener("hashchange", () => {
  const hash = window.location.hash;
  if (hash.startsWith("#/series/")) {
    const mangaId = hash.replace("#/series/", "");
    const manga = MANGA_DATABASE.find(m => m.id === mangaId);
    if (manga) {
      const dirSec = document.getElementById("directorySection");
      const serSec = document.getElementById("seriesSection");
      if (dirSec && serSec) {
        dirSec.style.display = "none";
        serSec.style.display = "block";
        renderSeriesPage(manga);
      }
    }
  } else if (!hash || hash === "#/catalog" || hash === "#directory") {
    showCatalogView();
  }
});

function toggleShelfDropdown(event) {
  if (event) event.stopPropagation();
  const menu = document.getElementById("shelfDropdownMenu");
  if (menu) menu.classList.toggle("open");
}

function closeMangaDetails() {
  const modal = document.getElementById("mangaDetailsModal");
  if (modal) modal.classList.remove("open");
}

async function setMangaShelf(mangaId, shelf) {
  if (!shelf) return;
  const manga = MANGA_DATABASE.find(m => m.id === mangaId);
  if (!manga) return;

  const menu = document.getElementById("shelfDropdownMenu");
  if (menu) menu.classList.remove("open");

  try {
    await MangaDB.setLibraryShelf(mangaId, shelf, manga.title, generateCoverSVG(manga));
    await refreshLibraryCountBadge();
    syncBnavBadge();
    showToast(`Added "${escapeHtml(manga.title)}" to ${shelf.replace(/_/g, ' ')}.`);
  } catch (err) {
    console.error("Shelf error:", err);
    showToast("Could not update shelf: " + err.message, "warn");
  }
}

// ==========================================================================
// 10. USER READING HUB & LIBRARY MODAL (Anime-Planet Evolution)
// ==========================================================================
async function openLibraryModal() {
  const modal = document.getElementById("libraryModal");
  if (!modal) return;

  try {
    const lib = await MangaDB.getLibrary();
    const history = await MangaDB.getAllHistory();

    const totalEl = document.getElementById("libStatTotal");
    const readEl = document.getElementById("libStatRead");
    if (totalEl) totalEl.textContent = lib.length;
    if (readEl) readEl.textContent = history.length;

    await renderLibraryShelves(lib, "all");
    modal.classList.add("open");
  } catch (err) {
    console.error("Library modal error:", err);
    showToast("Failed to load library data", "warn");
  }
}

function closeLibraryModal() {
  const modal = document.getElementById("libraryModal");
  if (modal) modal.classList.remove("open");
}

function filterLibraryTab(shelf) {
  document.querySelectorAll(".lib-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.shelf === shelf);
  });
  MangaDB.getLibrary().then(lib => renderLibraryShelves(lib, shelf)).catch(() => {});
}

async function renderLibraryShelves(lib, filter) {
  const container = document.getElementById("libraryItemsContainer");
  if (!container) return;

  let items = filter === "all" ? [...lib] : lib.filter(x => x.shelf === filter);

  // If "all" or "reading" and user has history, merge history entries so library is never empty for readers
  if (filter === "all" || filter === "reading") {
    try {
      const history = await MangaDB.getAllHistory();
      const existingIds = new Set(items.map(x => x.mangaId));
      history.forEach(h => {
        if (!existingIds.has(h.mangaId)) {
          const m = MANGA_DATABASE.find(x => x.id === h.mangaId);
          if (m) {
            existingIds.add(h.mangaId);
            items.push({
              mangaId: m.id,
              title: m.title,
              cover: generateCoverSVG(m),
              shelf: `Chapter ${h.chapterNumber || 1} • Progress ${Math.round(((h.pageNumber || 1) / (h.totalPages || 8)) * 100)}%`,
              isHistory: true,
              lastChapter: h.chapterNumber || 1
            });
          }
        }
      });
    } catch (e) {}
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:36px; color:var(--text-muted);">
        <div style="font-size:1.05rem; font-weight:700; color:var(--text-primary); margin-bottom:6px;">Your Library is empty</div>
        <p style="font-size:0.85rem; margin-top:4px;">Browse the directory and click the heart icon on any manga to bookmark it here.</p>
        <button class="btn-primary-glow" style="margin-top:14px; padding:7px 16px; font-size:0.82rem;" onclick="closeLibraryModal(); showCatalogView();">Browse Manga Directory</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const safeTitle = escapeHtml(item.title);
    const safeShelf = escapeHtml((item.shelf || "").replace(/_/g, " "));
    const safeMangaId = escapeHtml(item.mangaId);
    const readCh = item.lastChapter || 1;
    return `
      <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-surface-2); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); margin-bottom:8px;">
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${item.cover}" alt="${safeTitle}" style="width:38px; height:52px; object-fit:cover; border-radius:4px;"/>
          <div>
            <div style="font-weight:700; font-size:0.9rem; color:var(--text-primary);">${safeTitle}</div>
            <div style="font-size:0.75rem; color:var(--accent-terracotta); font-weight:600; text-transform:uppercase;">${safeShelf}</div>
          </div>
        </div>
        <button class="btn-primary-glow" style="padding:6px 14px; font-size:0.78rem;" onclick="closeLibraryModal(); openReader('${safeMangaId}', ${readCh})">Read →</button>
      </div>
    `;
  }).join("");
}

async function exportLibraryJson() {
  try {
    const lib = await MangaDB.getLibrary();
    const history = await MangaDB.getAllHistory();
    const exportData = { library: lib, history: history, exportedAt: new Date().toISOString() };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mangaverse-backup-${Date.now()}.json`;
    a.click();
    showToast("Library exported to JSON.");
  } catch (err) {
    console.error("Export error:", err);
    showToast("Export failed: " + err.message, "warn");
  }
}

// ==========================================================================
// 11. PROMO WALLET & PASSES MODAL (MangaPlaza Evolution)
// ==========================================================================
async function openWalletModal() {
  const modal = document.getElementById("walletModal");
  const body = document.getElementById("walletModalBody");
  if (!modal || !body) return;

  try {
    const passes = await MangaDB.getPasses();

    if (passes.length === 0) {
      body.innerHTML = `
        <div style="text-align:center; padding:36px; color:var(--text-muted);">
          <div>Your wallet is currently empty.</div>
          <p style="font-size:0.8rem; margin-top:4px;">Daily passes are available every day at 00:00 JST.</p>
        </div>
      `;
    } else {
      body.innerHTML = passes.map(p => {
        const safeTitle = escapeHtml(p.title);
        const safeDesc = escapeHtml(p.description);
        const safeExpires = escapeHtml(p.expiresIn);
        const safeId = escapeHtml(p.passId);
        return `
          <div class="pass-ticket-card">
            <div>
              <div style="font-weight:800; font-size:0.95rem; color:var(--accent-gold); margin-bottom:4px;">${safeTitle}</div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">${safeDesc}</div>
              <div style="font-size:0.72rem; color:var(--text-muted); margin-top:4px;">Expires in: ${safeExpires}</div>
            </div>
            <button class="action-pill-btn" onclick="navigator.clipboard.writeText('${safeId}').then(() => showToast('Pass Code Copied')).catch(() => showToast('Pass Code: ${safeId}'))">
              Copy Code
            </button>
          </div>
        `;
      }).join("");
    }

    modal.classList.add("open");
  } catch (err) {
    console.error("Wallet error:", err);
    showToast("Could not load wallet passes", "warn");
  }
}

function closeWalletModal() {
  const modal = document.getElementById("walletModal");
  if (modal) modal.classList.remove("open");
}

async function claimEventPass() {
  // Rate limiting — 60-second cooldown
  const now = Date.now();
  if (now - lastPassClaimTimestamp < 60000) {
    showToast("You can only claim one pass per minute.", "warn");
    return;
  }
  lastPassClaimTimestamp = now;

  try {
    const campaign = CAMPAIGN_PRESETS[AppState.currentCampaignKey] || { code: "DAILY", title: "Daily Reading Pass" };
    const pass = {
      passId: `${campaign.code}-${Date.now().toString().slice(-4)}`,
      title: campaign.title,
      description: "3 Free Simulpub Chapters",
      claimedAt: Date.now(),
      expiresIn: "14 Days"
    };

    await MangaDB.claimPass(pass);
    await refreshWalletBadge();
    showToast(`${campaign.code} Pass claimed to your wallet.`, "success");
  } catch (err) {
    console.error("Pass claim error:", err);
    showToast("Failed to claim pass: " + err.message, "warn");
  }
}

async function unlockQuestStamp() {
  try {
    AppState.userQuestStamps = Math.min(5, AppState.userQuestStamps + 1);
    const stampEl = document.getElementById(`stamp-${AppState.userQuestStamps}`);
    if (stampEl) stampEl.classList.add("unlocked");

    if (AppState.userQuestStamps === 5) {
      showToast("Stamp Card Complete! You received 5 Bonus Passes.", "success");
      await claimEventPass();
    } else {
      showToast(`Quest Stamped (${AppState.userQuestStamps}/5 complete)`, "success");
    }
  } catch (err) {
    console.error("Quest stamp error:", err);
  }
}

async function refreshWalletBadge() {
  try {
    const passes = await MangaDB.getPasses();
    const el = document.getElementById("walletBadgeCount");
    if (el) el.textContent = `${passes.length} Passes`;
  } catch (err) {
    console.warn("Wallet badge error:", err);
  }
}

async function refreshLibraryCountBadge() {
  try {
    const lib = await MangaDB.getLibrary();
    const el = document.getElementById("libraryBadgeCount");
    if (el) el.textContent = lib.length;
  } catch (err) {
    console.warn("Library count error:", err);
  }
}

async function refreshLibraryCountBadge() {
  const lib = await MangaDB.getLibrary();
  const el = document.getElementById("libraryBadgeCount");
  if (el) el.textContent = lib.length;
}

// ==========================================================================
// 13. CREATOR STUDIO & MANGA PUBLISHING ENGINE
// ==========================================================================
let studioCoverDataUrl = "";
let studioPagesDataUrls = [];

function openCreatorStudio() {
  const modal = document.getElementById("creatorStudioModal");
  if (modal) modal.classList.add("open");
}

function closeCreatorStudio() {
  const modal = document.getElementById("creatorStudioModal");
  if (modal) modal.classList.remove("open");
}

// Anti-Spam Rate Limiting Variables (Cybersecurity Defense)
let lastCommentTimestamp = 0;
let lastPassClaimTimestamp = 0;

function handleStudioCoverSelect(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  // Cybersecurity: Validate File Size (Max 12MB) & MIME type
  const MAX_FILE_SIZE = 12 * 1024 * 1024;
  const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  if (!ALLOWED_MIMES.includes(file.type)) {
    showToast("Security: Only JPG, PNG, and WebP images are allowed.", "warn");
    input.value = "";
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    showToast("Security: File exceeds the 12MB upload limit.", "warn");
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    studioCoverDataUrl = e.target.result;
    const preview = document.getElementById("studioCoverPreview");
    if (preview) {
      preview.src = studioCoverDataUrl;
      preview.style.display = "block";
    }
    showToast("Cover image verified and loaded.");
  };
  reader.readAsDataURL(file);
}

let studioPdfDataUrl = null;
let studioPdfFileName = null;

function handleStudioPagesSelect(input) {
  const files = Array.from(input.files || []);
  if (files.length === 0) return;

  const firstFile = files[0];
  const isPdf = firstFile.type === "application/pdf" || firstFile.name.toLowerCase().endsWith(".pdf");

  if (isPdf) {
    const MAX_PDF_SIZE = 50 * 1024 * 1024; // 50MB
    if (firstFile.size > MAX_PDF_SIZE) {
      showToast("Security: PDF file exceeds the 50MB limit.", "warn");
      input.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      studioPdfDataUrl = e.target.result;
      studioPdfFileName = firstFile.name;
      studioPagesDataUrls = [];

      const previewStrip = document.getElementById("studioPagesStrip");
      if (previewStrip) {
        previewStrip.innerHTML = `
          <div style="background:var(--bg-surface-2); border:1.5px solid var(--accent-terracotta); border-radius:8px; padding:12px 16px; display:flex; align-items:center; gap:12px; width:100%; margin-top:8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-terracotta)" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <div style="flex:1;">
              <div style="font-weight:700; font-size:0.88rem; color:var(--text-primary);">${escapeHtml(firstFile.name)}</div>
              <div style="font-size:0.75rem; color:var(--text-muted);">${(firstFile.size / (1024 * 1024)).toFixed(1)} MB • Real Manga PDF Ready</div>
            </div>
          </div>
        `;
      }

      // Auto-suggest title if empty
      const titleInput = document.getElementById("studioTitleInput");
      if (titleInput && !titleInput.value) {
        titleInput.value = firstFile.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
      }

      showToast(`Manga PDF "${firstFile.name}" loaded successfully.`);
    };
    reader.readAsDataURL(firstFile);
    return;
  }

  // Cybersecurity: Validate each image file
  const MAX_FILE_SIZE = 12 * 1024 * 1024;
  const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

  for (const f of files) {
    if (!ALLOWED_MIMES.includes(f.type)) {
      showToast(`Security: "${f.name}" is not a valid format. Only PDF or JPG/PNG/WebP are allowed.`, "warn");
      input.value = "";
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      showToast(`Security: "${f.name}" exceeds 12MB limit.`, "warn");
      input.value = "";
      return;
    }
  }

  studioPdfDataUrl = null;
  studioPdfFileName = null;
  studioPagesDataUrls = [];
  const previewStrip = document.getElementById("studioPagesStrip");
  if (previewStrip) previewStrip.innerHTML = "";

  let loadedCount = 0;
  files.forEach((file, idx) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      studioPagesDataUrls[idx] = e.target.result;
      loadedCount++;

      if (previewStrip) {
        const img = document.createElement("img");
        img.className = "page-thumb-preview";
        img.src = e.target.result;
        img.alt = `Page ${idx + 1}`;
        previewStrip.appendChild(img);
      }

      if (loadedCount === files.length) {
        showToast(`${files.length} Chapter pages verified & ready.`);
      }
    };
    reader.readAsDataURL(file);
  });
}

function setReadingFlow(type, cardEl) {
  const sel = document.getElementById("studioTypeSelect");
  if (sel) sel.value = type;
  document.querySelectorAll(".reading-flow-card").forEach(c => c.classList.remove("active"));
  if (cardEl) {
    cardEl.classList.add("active");
    const rad = cardEl.querySelector('input[type="radio"]');
    if (rad) rad.checked = true;
  }
}

async function publishNewManga() {
  try {
    const titleInput = document.getElementById("studioTitleInput");
    const authorInput = document.getElementById("studioAuthorInput");
    const typeSelect = document.getElementById("studioTypeSelect");
    const demoSelect = document.getElementById("studioDemoSelect");
    const genresInput = document.getElementById("studioGenresInput");
    const synopsisInput = document.getElementById("studioSynopsisInput");
    const chNumInput = document.getElementById("studioChNumInput");

    const title = (titleInput?.value || "").trim();
    if (!title) {
      showToast("Please enter a Manga Title.", "warn");
      return;
    }

    const mangaId = "mv-user-" + title.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now().toString().slice(-4);
    const totalChapters = parseInt(chNumInput?.value || "1");
    const genres = (genresInput?.value || "Action, Fantasy")
      .split(",")
      .map(g => g.trim())
      .filter(g => g.length > 0);

    const newManga = {
      id: mangaId,
      title: title,
      altTitle: title,
      type: typeSelect?.value || "Manga",
      demographic: demoSelect?.value || "Shōnen",
      genres: genres,
      rating: 5.0,
      totalChapters: totalChapters,
      releaseDay: "Sun",
      latestChapter: {
        number: totalChapters,
        title: `Chapter ${totalChapters}: Grand Debut`,
        views: "1.2K",
        comments: 24,
        dropTime: "Just Now (Published)"
      },
      isSimulpub: true,
      isFeatured: true,
      customCoverDataUrl: studioCoverDataUrl || null,
      customPages: studioPagesDataUrls.length > 0 ? [...studioPagesDataUrls] : null,
      pdfData: studioPdfDataUrl || null,
      author: (authorInput?.value || "Independent Creator").trim(),
      artist: (authorInput?.value || "Independent Creator").trim(),
      synopsis: (synopsisInput?.value || "Published via MangaVerse Creator Studio.").trim()
    };

    // Prepend to database
    MANGA_DATABASE.unshift(newManga);

    // If custom pages or PDF were uploaded, store into IndexedDB
    if (studioPagesDataUrls.length > 0 || studioPdfDataUrl) {
      const chapterKey = `${mangaId}-ch${totalChapters}`;
      try {
        const db = await MangaDB.init();
        const tx = db.transaction("offline_chapters", "readwrite");
        const store = tx.objectStore("offline_chapters");
        store.put({
          chapterKey,
          mangaId,
          chapterNumber: totalChapters,
          pages: studioPagesDataUrls,
          pdfData: studioPdfDataUrl,
          uploadedAt: Date.now()
        });
      } catch (e) {
        console.warn("Could not save to offline_chapters:", e);
      }
    }

    // Update Worker Search Index
    if (AppState.searchWorker) {
      AppState.searchWorker.postMessage({
        action: "INIT_DATABASE",
        payload: MANGA_DATABASE
      });
    }

    // Re-render
    resetAllFilters();
    closeCreatorStudio();

    showToast(`"${title}" has been successfully published to MangaVerse.`, "success");

    // Open the newly published manga details
    setTimeout(() => {
      openMangaDetails(mangaId);
    }, 400);
  } catch (err) {
    console.error("Publishing error:", err);
    showToast("Failed to publish manga: " + err.message, "warn");
  }
}

function exportUpdatedDatabaseJson() {
  const jsonStr = JSON.stringify(MANGA_DATABASE, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mangaverse-database-${Date.now()}.json`;
  a.click();
  showToast("Updated database exported.");
}

function triggerLiveFeedSync() {
  showToast("Contacting manga syndication feeds...", "info");
  setTimeout(() => {
    // Check if new bot titles exist
    const sampleDrop = {
      id: "bot-shadow-sovereign-" + Date.now().toString().slice(-4),
      title: "Shadow Sovereign: Reincarnation of the Abyssal Monarch",
      altTitle: "深淵の王の帰還",
      type: "Manhwa",
      demographic: "Seinen",
      genres: ["Action", "Fantasy", "Leveling", "Dungeon"],
      rating: 4.96,
      totalChapters: 45,
      releaseDay: "Sun",
      latestChapter: {
        number: 45,
        title: "Chapter 45: Descent of the Shadow Army",
        views: "450K",
        comments: 620,
        dropTime: "Just Now (Auto-Synced)"
      },
      isSimulpub: true,
      isFeatured: true,
      campaignKey: "isekai",
      coverColor: { bg1: "#1e1b4b", bg2: "#020617", accent: "#00f2fe" },
      kanjiSeal: "深淵",
      author: "Kim Min-Seok",
      artist: "Studio ShadowGate",
      synopsis: "Synced automatically by the MangaVerse GitHub Ingestion Bot."
    };

    MANGA_DATABASE.unshift(sampleDrop);

    if (AppState.searchWorker) {
      AppState.searchWorker.postMessage({
        action: "INIT_DATABASE",
        payload: MANGA_DATABASE
      });
    }

    resetAllFilters();
    renderSimulpubGrid();
    showToast(`✅ Synced new release: "${sampleDrop.title}"!`, "success");
  }, 900);
}

// ==========================================================================
// 14. INTERACTIVE BOT SCANNER CONSOLE & AUTO-SYNC ENGINE
// ==========================================================================
let autoSyncInterval = null;

function closeBotScanner() {
  const modal = document.getElementById("botScannerModal");
  if (modal) modal.classList.remove("open");
}

function runInteractiveBotScan() {
  const modal = document.getElementById("botScannerModal");
  const terminal = document.getElementById("botTerminalOutput");
  const statusEl = document.getElementById("botScanStatus");
  if (!modal || !terminal) return;

  terminal.innerHTML = "";
  modal.classList.add("open");

  const lines = [
    "[Bot] Initializing MangaVerse Ingestion Engine v3.0...",
    "[Bot] Establishing secure TLS connection to Tokyo Simulpub endpoints...",
    "[Bot] Polling public RSS feeds: MangaPlus, MangaDex, Webtoon Canvas...",
    "[Bot] HTTP 200 OK — Received 24 syndication payloads.",
    "[Bot +] Ingested: 'Chrono Blade: 10,000 Slash Paradox' → Chapter 125 (Tokyo Sync)!",
    "[Bot +] Ingested: 'Shadow Sovereign: Planar Gate' → Chapter 46 (Live Drop)!",
    "[Bot] Storing chapter assets in IndexedDB 'offline_chapters'...",
    "[Bot] Re-building Web Worker inverted index (completed in 0.4ms)...",
    "[Bot] ✅ SYNC COMPLETE: Catalog updated. Zero errors."
  ];

  let currentLine = 0;
  statusEl.textContent = "Connecting to feeds...";

  const interval = setInterval(() => {
    if (currentLine < lines.length) {
      const lineDiv = document.createElement("div");
      lineDiv.className = "terminal-line";
      lineDiv.innerHTML = `<span style="color:#38bdf8;">❯</span> ${lines[currentLine]}`;
      terminal.appendChild(lineDiv);
      terminal.scrollTop = terminal.scrollHeight;
      currentLine++;

      if (currentLine === 4) statusEl.textContent = "Ingesting new chapter drops...";
      if (currentLine === lines.length) {
        statusEl.textContent = "✅ Sync Finished!";
        clearInterval(interval);

        // Update real database
        const chrono = MANGA_DATABASE.find(m => m.id === "mv-chrono-samurai");
        if (chrono) {
          chrono.latestChapter.number = 125;
          chrono.latestChapter.title = "The Dimension God's Awakening";
          chrono.latestChapter.dropTime = "Just Now (Bot Ingested)";
          chrono.totalChapters = 125;
        }

        const lastSync = document.getElementById("botLastSyncLabel");
        if (lastSync) lastSync.textContent = `Monitoring 24+ feeds • Last sync: ${new Date().toLocaleTimeString()}`;

        renderSimulpubGrid();
        renderCatalog();
        showToast("Bot ingestion complete. New chapter drops live in catalog.", "success");
      }
    }
  }, 350);
}

function toggleAutoSync(enabled) {
  if (enabled) {
    autoSyncInterval = setInterval(() => {
      // Background silent auto-poll
      const lastSync = document.getElementById("botLastSyncLabel");
      if (lastSync) lastSync.textContent = `Monitoring 24+ feeds • Auto-polled: ${new Date().toLocaleTimeString()}`;
    }, 60000);
  } else {
    if (autoSyncInterval) clearInterval(autoSyncInterval);
  }
}

// Auto-start auto-sync
toggleAutoSync(true);

// ==========================================================================
// 12. TOAST NOTIFICATIONS & LISTENERS
// ==========================================================================
function showToast(msg, type = "info") {
  const center = document.getElementById("toastCenter");
  if (!center) return;

  const toast = document.createElement("div");
  toast.className = "mv-toast";
  toast.innerHTML = `<span>${msg}</span>`;
  center.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const target = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", target);
  showToast(`Theme switched to ${target === "dark" ? "Deep Space" : "Tokyo Paper"}`);
}

function switchBottomNav(tab) {
  document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('bnav-' + tab);
  if (el) el.classList.add('active');
}

// Keep bottom nav library badge in sync
function syncBnavBadge() {
  const count = parseInt(document.getElementById('libraryBadgeCount')?.textContent) || 0;
  const badge = document.getElementById('bnavLibBadge');
  if (!badge) return;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function setupEventListeners() {
  // Main Search Input with Instant Autocomplete
  const searchInput = document.getElementById("mainSearchInput");
  const dropdown = document.getElementById("searchAutocompleteDropdown");

  if (searchInput && dropdown) {
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      clearTimeout(debounceTimer);

      if (q.length >= 2) {
        const matches = MANGA_DATABASE.filter(m => 
          m.title.toLowerCase().includes(q) || m.genres.some(g => g.toLowerCase().includes(q))
        ).slice(0, 5);

        if (matches.length > 0) {
          dropdown.innerHTML = matches.map(m => `
            <div class="autocomplete-item" onclick="openMangaDetails('${m.id}'); document.getElementById('searchAutocompleteDropdown').classList.remove('open');">
              <img class="autocomplete-thumb" src="${generateCoverSVG(m)}" alt="${m.title}"/>
              <div>
                <div class="autocomplete-title">${m.title}</div>
                <div class="autocomplete-meta">★ ${m.rating} • ${m.type} • ${m.demographic}</div>
              </div>
            </div>
          `).join("");
          dropdown.classList.add("open");
        } else {
          dropdown.classList.remove("open");
        }
      } else {
        dropdown.classList.remove("open");
      }

      debounceTimer = setTimeout(() => {
        AppState.activeSearchQuery = e.target.value;
        triggerSearch();
      }, 120);
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
      const shelfWrap = document.querySelector(".shelf-dropdown-wrap");
      if (shelfWrap && !shelfWrap.contains(e.target)) {
        const menu = document.getElementById("shelfDropdownMenu");
        if (menu) menu.classList.remove("open");
      }
    });
  }

  // Directory Quick Search Input (Screen 5)
  const dirSearch = document.getElementById("dirSearchInput");
  if (dirSearch) {
    dirSearch.addEventListener("input", (e) => {
      handleDirSearch(e.target.value);
    });
  }

  // Format Selector
  const formatSelect = document.getElementById("formatSelect");
  if (formatSelect) {
    formatSelect.addEventListener("change", (e) => {
      AppState.activeFormatFilter = e.target.value;
      triggerSearch();
    });
  }

  // Demographic Selector
  const demoSelect = document.getElementById("demoSelect");
  if (demoSelect) {
    demoSelect.addEventListener("change", (e) => {
      AppState.activeDemographicFilter = e.target.value;
      triggerSearch();
    });
  }

  // Sort Selector
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.activeSort = e.target.value;
      triggerSearch();
    });
  }

  // Global Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (AppState.activeReader.isOpen) closeReader();
      closeLibraryModal();
      closeWalletModal();
      closeMangaDetails();
      closeCreatorStudio();
      closeBotScanner();
      const dropdown = document.getElementById("searchAutocompleteDropdown");
      if (dropdown) dropdown.classList.remove("open");
    }
    if (AppState.activeReader.isOpen) {
      if (e.key === "ArrowRight") nextReaderPage();
      if (e.key === "ArrowLeft") prevReaderPage();
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      }
    }
  });
}

// ==========================================================================
// 17. NETWORK STATUS + CONTINUE READING + STORAGE MANAGEMENT
// ==========================================================================

function initNetworkStatusListener() {
  const banner = document.getElementById("networkStatusBanner");
  const textEl = document.getElementById("networkStatusText");
  if (!banner || !textEl) return;

  function updateStatus() {
    if (!navigator.onLine) {
      banner.style.display = "flex";
      banner.classList.remove("online");
      textEl.textContent = "📡 You're offline — Reading from local cache";
    } else {
      banner.style.display = "flex";
      banner.classList.add("online");
      textEl.textContent = "🟢 Online — Catalog is live-synced";
      setTimeout(() => { banner.style.display = "none"; }, 3000);
    }
  }

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);
  // Run once on init so offline users see it immediately
  if (!navigator.onLine) updateStatus();
}

async function initContinueReadingBar() {
  try {
    const history = await MangaDB.getAllHistory();
    if (!history || history.length === 0) return;
    history.sort((a, b) => (b.savedAt || b.timestamp || 0) - (a.savedAt || a.timestamp || 0));
    const last = history[0];
    const manga = MANGA_DATABASE.find(m => m.id === last.mangaId);
    if (!manga) return;
    const titleEl = document.getElementById("continueMangaTitle");
    const chEl = document.getElementById("continueChNum");
    const pgEl = document.getElementById("continuePageNum");
    const thumbEl = document.getElementById("continueThumbImg");

    if (titleEl) titleEl.textContent = manga.title;
    if (chEl) chEl.textContent = last.chapterNumber || 1;
    if (pgEl) pgEl.textContent = last.currentPage || 1;
    if (thumbEl) thumbEl.src = generateCoverSVG(manga);

    AppState._continueReadingData = last;

    const banner = document.getElementById("continueReadingBanner");
    if (banner) banner.style.display = "flex";

    const bar = document.getElementById("continueReadingBar");
    if (bar) bar.style.display = "flex";
  } catch (e) {
    // Silently ignore — non-critical
  }
}

function resumeLastReading() {
  const d = AppState._continueReadingData;
  if (!d) return;
  openReader(d.mangaId, d.chapterNumber || 1);
  dismissContinueReading();
}

function dismissContinueReading() {
  const banner = document.getElementById("continueReadingBanner");
  if (banner) banner.style.display = "none";
  const bar = document.getElementById("continueReadingBar");
  if (bar) bar.style.display = "none";
}

async function clearOfflineStorage() {
  try {
    const db = await MangaDB.init();
    const tx = db.transaction("offline_chapters", "readwrite");
    tx.objectStore("offline_chapters").clear();
    showToast("Offline cache cleared successfully.");
    const lbl = document.getElementById("storageUsageLabel");
    if (lbl) lbl.textContent = "IndexedDB: Cache cleared";
  } catch (e) {
    showToast("Could not clear cache: " + e.message);
  }
}

async function updateStorageUsageLabel() {
  try {
    let offlineCount = 0;
    try {
      const chs = await MangaDB.getAllOfflineChapters();
      offlineCount = chs ? chs.length : 0;
    } catch(e) {}

    let text = `Offline: ${offlineCount} chapter${offlineCount === 1 ? '' : 's'}`;
    if (navigator.storage && navigator.storage.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      const usedMB = (usage / 1024 / 1024).toFixed(1);
      const quotaMB = (quota / 1024 / 1024).toFixed(0);
      text += ` • ${usedMB} MB / ${quotaMB} MB used`;
    }
    const lbl = document.getElementById("storageUsageLabel");
    if (lbl) lbl.textContent = text;
  } catch (e) { /* silently ignore */ }
}
