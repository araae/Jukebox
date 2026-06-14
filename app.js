import express from "express";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

const app = express();

// parse incoming json bodies
app.use(express.json());

// mount routers
app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// catch all errors and send them as json
// use postgresql error codes to send appropriate status codes
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status ?? (err.code === "22P02" ? 400 : 500);
  res.status(status).json({ error: err.message });
});

export default app;