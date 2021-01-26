import express from "express";

import Db from "../controllers/database.js";
import Osu from "../controllers/osu.js";

import parseSchema from "../middlewares/parseSchema.js";
import ensureAuthenticated from "../middlewares/ensureAuthenticated.js";

const router = express.Router();

router.get("/latest", async (req, res) => {
  const beatmaps = await Db.Beatmapset.find()
    .sort({ created_at: -1 })
    .select("-reference.beatmaps")
    .limit(50);

  res.send(beatmaps);
});

router.get("/:id", async (req, res, next) => {
  try {
    const document = await Db.Beatmapset.findById(req.params.id);

    if (!document) {
      res.status(404);
      res.send(document);
      return;
    }

    res.json(document);
  } catch (error) {
    next(error);
  }
});

router.get("/search", (req, res) => {
  res.status(501).json(null);
});

router.post(
  "/",
  ensureAuthenticated,
  parseSchema(Db.Beatmapset, false),
  async (req, res, next) => {
    try {
      const {
        document,
        body: { osu_id },
      } = req;

      if (await Db.Beatmapset.findOne({ osu_id })) {
        res.status(409);
        throw new Error("APP.MAP.ALREADY.EXIST");
      }

      const beatmapset = await Osu.beatmapset.findById(osu_id);

      if (!beatmapset) {
        res.status(400);
        throw new Error("OSU.MAP.DOES.NOT.EXIST");
      }

      document.added_by = req.user.id;
      document.reference = {
        id: beatmapset.id,
        artist: beatmapset.artist,
        title: beatmapset.title,
        user_id: beatmapset.user_id,
        creator: beatmapset.creator,
        card: beatmapset.card,
        favourite_count: beatmapset.favourite_count,
        play_count: beatmapset.play_count,
        status: beatmapset.status,
        beatmaps: beatmapset.beatmaps.map((b) => ({
          difficulty_rating: b.difficulty_rating,
          id: b.id,
          mode: b.mode,
          total_length: b.total_length,
          version: b.version,
          accuracy: b.accuracy,
          beatmapset_id: b.beatmapset_id,
          bpm: b.bpm,
          drain: b.drain,
          hit_length: b.hit_length,
          mode_int: b.mode_int,
          passcount: b.passcount,
          playcount: b.playcount,
          status: b.status,
          url: b.url,
        })),
      };

      await document.save();

      res.json(document);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", ensureAuthenticated, async (req, res, next) => {
  try {
    await Db.Beatmapset.findByIdAndRemove(req.params.id);
  } catch (error) {
    next(error);
  }
});

export default router;
