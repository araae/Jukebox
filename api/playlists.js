import express from "express";
import {
  getPlaylists,
  getPlaylist,
  createPlaylist,
  getPlaylistTracks,
} from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { getTrack } from "#db/queries/tracks";

const router = express.Router();

// load a playlist by id and attach it to req
router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylist(id);
  if (!playlist) {
    const err = new Error("Playlist not found");
    err.status = 404;
    return next(err);
  }
  req.playlist = playlist;
  next();
});

// get all playlists
router.get("/", async (req, res, next) => {
  try {
    const playlists = await getPlaylists();
    res.json(playlists);
  } catch (err) {
    next(err);
  }
});

// create a new empty playlist
router.post("/", async (req, res, next) => {
  try {
    // send 400 if body or required fields are missing
    const name = req.body?.name;
    const description = req.body?.description;
    if (!name || !description) {
      const err = new Error("name and description are required");
      err.status = 400;
      return next(err);
    }
    const playlist = await createPlaylist(name, description);
    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
});

// get a single playlist by id
router.get("/:id", (req, res) => {
  res.json(req.playlist);
});

// get all tracks in a playlist
router.get("/:id/tracks", async (req, res, next) => {
  try {
    const tracks = await getPlaylistTracks(req.playlist.id);
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

// add a track to a playlist
router.post("/:id/tracks", async (req, res, next) => {
  try {
    // send 400 if body or trackId is missing
    const trackId = req.body?.trackId;
    if (trackId === undefined || trackId === null) {
      const err = new Error("trackId is required");
      err.status = 400;
      return next(err);
    }
    // send 400 if trackId is not a number
    if (isNaN(Number(trackId))) {
      const err = new Error("trackId must be a number");
      err.status = 400;
      return next(err);
    }
    // send 400 if track does not exist
    const track = await getTrack(Number(trackId));
    if (!track) {
      const err = new Error("Track not found");
      err.status = 400;
      return next(err);
    }
    const playlistTrack = await createPlaylistTrack(
      req.playlist.id,
      Number(trackId),
    );
    res.status(201).json(playlistTrack);
  } catch (err) {
    // send 400 if track is already in playlist (unique constraint violation)
    if (err.code === "23505") {
      err.status = 400;
      err.message = "Track is already in this playlist";
    }
    next(err);
  }
});

export default router;
