import mongoose from "mongoose";

import BeatmapsetSchema from "../models/database_schemas/beatmapset.js";

export default {
  beatmapset: mongoose.model("Beatmapset", BeatmapsetSchema),
};
