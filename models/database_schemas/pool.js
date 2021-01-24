import mongoose from "mongoose";

import BeatmapsetSchema from "./beatmapset";

const Pool = new mongoose.Schema({
  beatmapsets: { type: [BeatmapsetSchema] },
});

export default Pool;
