import db from "#db/client";

// insert a new track and return it
export async function createTrack(name, duration_ms) {
  const { rows: [track] } = await db.query(
    `INSERT INTO tracks (name, duration_ms) VALUES ($1, $2) RETURNING *`,
    [name, duration_ms]
  );
  return track;
}

// get all tracks
export async function getTracks() {
  const { rows } = await db.query(`SELECT * FROM tracks`);
  return rows;
}

// get a single track by id
export async function getTrack(id) {
  const { rows: [track] } = await db.query(
    `SELECT * FROM tracks WHERE id = $1`,
    [id]
  );
  return track;
}