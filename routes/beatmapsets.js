import express from "express";
import validateSchema from "../middlewares/validateSchema.js";
import DatabaseModel from "../models/database/beatmapset.js";
import OsuController from "../controllers/osu.js";
import BeatmapsetResponse from "../models/responses/beatmapset.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send([]);
});
router.get("/:id", async (req, res, next) => {
  try {
    const document = await DatabaseModel.findById(req.params.id);
    const beatmapset = await OsuController.getBeatmapsetById(document.osu_id);

    res.json(new BeatmapsetResponse(beatmapset, document));
  } catch (error) {
    next(error);
  }
});
router.post("/", validateSchema(DatabaseModel), async (req, res, next) => {
  try {
    const { document } = req;
    await document.save();
    res.json(true);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await DatabaseModel.findByIdAndRemove(req.params.id);
  } catch (error) {
    next(error);
  }
});

export default router;
