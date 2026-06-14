import db from "#db/client";

// insert a new playlist and return it
export async function createPlaylist(name, description) {
  const { rows: [playlist] } = await db.query(
    `INSERT INTO playlists (name, description) VALUES ($1, $2) RETURNING *`,
    [name, description]
  );
  return playlist;
}

// get all playlists
export async function getPlaylists() {
  const { rows } = await db.query(`SELECT * FROM playlists`);
  return rows;
}

// get a single playlist by id
export async function getPlaylist(id) {
  const { rows: [playlist] } = await db.query(
    `SELECT * FROM playlists WHERE id = $1`,
    [id]
  );
  return playlist;
}

// get all tracks in a playlist using a join
export async function getPlaylistTracks(id) {
  const { rows } = await db.query(
    `SELECT tracks.* FROM tracks
     JOIN playlists_tracks ON tracks.id = playlists_tracks.track_id
     WHERE playlists_tracks.playlist_id = $1`,
    [id]
  );
  return rows;
}