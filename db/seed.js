// connect to the database
// run the seed function
// disconnect from the database
// log that the database was seeded

import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // loop 20 times:
  // create a playlist with a numbered name and placeholder
  // create a track with a numbered name and a duration based on the loop

  // loop 15 times:
  // calculate a playlist id based on the loop number
  // link that playlist to the matching track id

  for (let i = 1; i <= 20; i++) {
    await createPlaylist("Playlist " + i, "playlist description");
    await createTrack("Track " + i, i * 50000);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
}
