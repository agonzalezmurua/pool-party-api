import express from "express";

import validateSchema from "../middlewares/validateSchema.js";
import Db from "../controllers/database.js";
import Osu from "../controllers/osu.js";

import BeatmapsetResponse from "../models/responses/beatmapset.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send([]);
});

router.get("/:id", async (req, res, next) => {
  try {
    const osu_id = req.params.id;
    const document = await Db.beatmapset.findOne({
      osu_id: osu_id,
    });

    if (!document) {
      res.status(404);
      throw new Error();
    }

    const beatmapset = await Osu.beatmapset.findById(osu_id);

    if (!beatmapset) {
      res.status(404);
      throw new Error();
    }
    res.json(new BeatmapsetResponse(beatmapset, document));
  } catch (error) {
    next(error);
  }
});

router.post("/", validateSchema(Db.beatmapset), async (req, res, next) => {
  try {
    const { document } = req;
    const { osu_id } = document;

    if (await Db.beatmapset.findOne({ osu_id })) {
      res.status(409);
      throw new Error("APP.MAP.ALREADY.EXIST");
    }

    const beatmapset = await Osu.beatmapset.findById(osu_id);

    if (!beatmapset) {
      res.status(400);
      throw new Error("OSU.MAP.DOES.NOT.EXIST");
    }

    await document.save();

    res.json(new BeatmapsetResponse(beatmapset, document));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Db.beatmapset.findByIdAndRemove(req.params.id);
  } catch (error) {
    next(error);
  }
});

export default router;
