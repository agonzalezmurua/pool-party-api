import mongoose from "mongoose";

const BeatmapsetSchema = new mongoose.Schema({
  osu_id: {
    type: Number,
    required: true,
  },
  is_tournament: { type: Boolean, required: false, default: false },
  pool_tags: { type: Array, required: false, default: [] },
});

export default BeatmapsetSchema;
