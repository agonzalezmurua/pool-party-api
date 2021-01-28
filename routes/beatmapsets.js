import express from "express";

import Beatmapset from "../providers/database/beatmapset";
import Osu from "../providers/osu";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = express.Router();

function MapBeatmapsetToDocument(set) {
  return {
    osu_id: set.id,
    artist: set.artist,
    title: set.title,
    creator_id: set.user_id,
    creator: set.creator,
    favourite_count: set.favourite_count,
    play_count: set.play_count,
    status: set.status,
    covers: set.covers,
    tags: set.tags.split(" "),
    beatmaps: set.beatmaps.map((beatmap) => ({
      difficulty_rating: beatmap.difficulty_rating,
      id: beatmap.id,
      mode: beatmap.mode,
      total_length: beatmap.total_length,
      version: beatmap.version,
      accuracy: beatmap.accuracy,
      beatmapset_id: beatmap.beatmapset_id,
      bpm: beatmap.bpm,
      drain: beatmap.drain,
      hit_length: beatmap.hit_length,
      mode_int: beatmap.mode_int,
      passcount: beatmap.passcount,
      playcount: beatmap.playcount,
      status: beatmap.status,
      url: beatmap.url,
    })),
  };
}

router.get("/", async (req, res) => {
  const { search = "" } = req.query;

  const beatmapsets = await Beatmapset.fuzzySearch(search);

  res.json(beatmapsets);
});

router.get("/latest", async (req, res) => {
  const beatmaps = await Beatmapset.find()
    .sort({ created_at: -1 })
    .select("-reference.beatmaps")
    .limit(50);

  res.send(beatmaps);
});

router.get("/:id", async (req, res) => {
  const document = await Beatmapset.findById(req.params.id);

  if (!document) {
    res.status(404);
    res.send(document);
    return;
  }

  res.json(document);
});

router.post("/", ensureAuthenticated, async (req, res) => {
  const {
    body: { osu_id },
  } = req;

  if (await Beatmapset.exists({ osu_id: osu_id })) {
    res.status(409);
    throw new Error("APP.MAP.ALREADY.EXIST");
  }

  const set = await Osu.beatmapset.findById(osu_id);

  if (!set) {
    res.status(400);
    throw new Error("OSU.MAP.DOES.NOT.EXIST");
  }

  const document = new Beatmapset(MapBeatmapsetToDocument(set));
  document.added_by = req.user.id;

  await document.validate();
  await document.save();

  res.json(document);
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  await Beatmapset.findByIdAndRemove(req.params.id);
  res.json();
});

router.patch("/:id/sync", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const bs = await Beatmapset.findById(id).select("osu_id");

  if (!bs) {
    res.status(404);
    res.json();
    return;
  }

  const set = await Osu.beatmapset.findById(bs.osu_id);

  const beatmapset = await Beatmapset.findByIdAndUpdate(
    id,
    MapBeatmapsetToDocument(set),
    { new: true }
  );

  res.json(beatmapset);
});

export default router;
