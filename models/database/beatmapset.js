import mongoose from "mongoose";

export const BeatmapsetSchema = new mongoose.Schema({
  osu_id: { type: String, required: true },
  is_tournament: { type: Boolean, required: false, default: false },
  pool_tags: { type: Array, required: false, default: [] },
});

export default mongoose.model("Beatmapset", BeatmapsetSchema);
