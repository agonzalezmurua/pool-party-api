import mongoose from "mongoose";

export const BeatmapsetSchema = new mongoose.Schema({
  osu_id: { type: String, required: true },
  mapper_id: { type: String, required: true },
});

export default mongoose.model("Beatmapset", BeatmapsetSchema);
