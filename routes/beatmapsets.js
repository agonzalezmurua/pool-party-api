import express from "express";

import Beatmapset from "../mongoose.schemas/beatmapset";
import Osu from "../providers/osu";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = express.Router();

export function MapBeatmapsetToDocument(set) {
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
    submitted_date: set.submitted_date,
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
  const {
    search = "",
    status = "ranked",
    diff_min = 0,
    diff_max = 10,
    dur_min = 0,
    submitted_date = "2007-08-16T00:00:00.000Z",
    dur_max = 3600,
  } = req.query;

  const beatmapsets = await Beatmapset.find({
    status: status,
    "beatmaps.difficulty_rating": {
      $gte: Number(diff_min),
      $lte: Number(diff_max),
    },
    "beatmaps.total_length": {
      $gte: Number(dur_min),
      $lte: Number(dur_max),
    },
    submitted_date: {
      $gte: new Date(submitted_date),
    },
  })
    .fuzzySearch(search)
    .sort({ confidenceScore: -1 })
    .select("-confidenceScore")
    .limit(50)
    .exec();

  res.json(beatmapsets);
});

router.get("/latest", async (req, res) => {
  const beatmaps = await Beatmapset.find()
    .sort({ created_at: -1 })
    .populate({ path: "beatmaps", select: "version" })
    .limit(50)
    .exec();

  res.send(beatmaps);
});

router.get("/preview", async (req, res) => {
  const { beatmapID } = req.query;
  const beatmapsets = await Osu.beatmapset.findById(beatmapID);
  if (!beatmapsets) {
    res.status(404);
    res.send(null);
    return;
  }
  const formattedmap = MapBeatmapsetToDocument(beatmapsets);
  res.json(formattedmap);
});

router.get("/:id", async (req, res) => {
  const document = await Beatmapset.findById(req.params.id)
    .populate({ path: "used_in", select: "name _id" })
    .exec();
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

  await document.save({ validateBeforeSave: true });

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
