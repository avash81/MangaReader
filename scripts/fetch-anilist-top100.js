const https = require('https');
const fs = require('fs');
const path = require('path');

const query = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      hasNextPage
      currentPage
    }
    media(type: MANGA, format: MANGA, sort: SCORE_DESC) {
      id
      title {
        romaji
        english
        native
      }
      countryOfOrigin
      genres
      averageScore
      chapters
      status
      format
      coverImage {
        extraLarge
        large
      }
      staff(perPage: 4) {
        edges {
          role
          node {
            name {
              full
            }
          }
        }
      }
      description
    }
  }
}
`;

function fetchPage(page, perPage = 50) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      query,
      variables: { page, perPage }
    });

    const options = {
      hostname: 'graphql.anilist.co',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'MangaVerse-Importer/1.0',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.errors) {
            reject(new Error(JSON.stringify(parsed.errors)));
          } else {
            resolve(parsed.data.Page);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('Fetching AniList Top 100 Illustrated Manga (format: MANGA)...');
  const page1 = await fetchPage(1, 50);
  console.log(`Fetched page 1: ${page1.media.length} items`);
  await new Promise(r => setTimeout(r, 1000));
  const page2 = await fetchPage(2, 50);
  console.log(`Fetched page 2: ${page2.media.length} items`);

  const allMedia = [...page1.media, ...page2.media];
  console.log(`Total retrieved: ${allMedia.length} pure manga titles`);

  fs.writeFileSync(path.join(__dirname, 'anilist-top-100-manga.json'), JSON.stringify(allMedia, null, 2));
  console.log('Saved to scripts/anilist-top-100-manga.json');
}

run().catch(err => {
  console.error('Fetch error:', err);
  process.exit(1);
});
