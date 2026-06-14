-- drop tables if they exist to reset cleanly
DROP TABLE IF EXISTS playlists_tracks;
DROP TABLE IF EXISTS tracks;
DROP TABLE IF EXISTS playlists;

-- create playlists table
CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL
);

-- create tracks table
CREATE TABLE tracks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  duration_ms INTEGER NOT NULL
);

-- create junction table that links playlists and tracks
-- cascade delete
-- unique constraint that a track can only appear in a playlist once
CREATE TABLE playlists_tracks (
  id SERIAL PRIMARY KEY,
  playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
  track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  UNIQUE (playlist_id, track_id)
);