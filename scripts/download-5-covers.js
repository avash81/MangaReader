const fs = require('fs');
const path = require('path');

const titles = [
  { id: 'mv-e896c48c', search: 'Chainsaw Man' },
  { id: 'mv-59f47645', search: 'Tokyo Ghoul' },
  { id: 'mv-6114f59f', search: 'Mushoku Tensei' },
  { id: 'mv-4ec3e6b3', search: 'Horimiya' },
  { id: 'mv-37f5cce0', search: 'Kaguya-sama wa Kokurasetai' }
];

async function run() {
  for (const item of titles) {
    try {
      const query = `query ($search: String) { Media(search: $search, type: MANGA) { coverImage { extraLarge large } } }`;
      const res = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables: { search: item.search } })
      });
      const data = await res.json();
      const imgUrl = data.data?.Media?.coverImage?.extraLarge || data.data?.Media?.coverImage?.large;
      console.log(item.search, '->', imgUrl);
      if (imgUrl) {
        const imgRes = await fetch(imgUrl);
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        const dest = path.join('E:/Manga/mangas/covers', item.id + '.jpg');
        fs.writeFileSync(dest, buffer);
        console.log('Saved', dest, 'size:', buffer.length);
      }
    } catch (e) {
      console.error('Error for', item.search, e.message);
    }
    await new Promise(r => setTimeout(r, 400));
  }
}
run();
