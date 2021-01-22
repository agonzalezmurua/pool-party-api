import express from "express";

import validateSchema from "../middlewares/validateSchema.js";
import DatabaseController from "../controllers/database.js";
import OsuController from "../controllers/osu.js";

import BeatmapsetResponse from "../models/responses/beatmapset.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send([]);
});
router.get("/:id", async (req, res, next) => {
  try {
    const document = await DatabaseController.beatmapset.findById(
      req.params.id
    );
    const beatmapset = await OsuController.beatmapset.findById(document.osu_id);

    res.json(new BeatmapsetResponse(beatmapset, document));
  } catch (error) {
    next(error);
  }
});
router.post(
  "/",
  validateSchema(DatabaseController.beatmapset),
  async (req, res, next) => {
    try {
      const { document } = req;
      const beatmapset = await OsuController.beatmapset.findById(
        document.osu_id
      );
      await document.save();
      res.json(new BeatmapsetResponse(beatmapset, document));
    } catch (error) {
      next(error);
    }
  }
);
router.delete("/:id", async (req, res, next) => {
  try {
    await DatabaseController.beatmapset.findByIdAndRemove(req.params.id);
  } catch (error) {
    next(error);
  }
});

export default router;
