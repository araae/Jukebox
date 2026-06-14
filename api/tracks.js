import express from "express";
import { getTracks, getTrack } from "#db/queries/tracks";

const router = express.Router();

// load a track by id and attach it to req
router.param("id", async (req, res, next, id) => {
  const track = await getTrack(id);
  if (!track) {
    const err = new Error("Track not found");
    err.status = 404;
    return next(err);
  }
  req.track = track;
  next();
});

// get all tracks
router.get("/", async (req, res, next) => {
  try {
    const tracks = await getTracks();
    res.json(tracks);
  } catch (err) {
    next(err);
  }
});

// get a single track by id
router.get("/:id", (req, res) => {
  res.json(req.track);
});

export default router;