import mongoose from "mongoose";

import BeatmapsetSchema from "../models/database/beatmapset.js";

export default {
  beatmapset: mongoose.model("Beatmapset", BeatmapsetSchema),
};
