import mongoose from "mongoose";
import { UserModelName } from "./user.js";

const BeatmapsetSchema = new mongoose.Schema({
  reference: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  added_by: {
    type: mongoose.Types.ObjectId,
    ref: UserModelName,
    required: true,
  },
  is_tournament: { type: Boolean, required: false, default: false },
  tags: { type: [{ type: String }], required: false },
});

export const BeatmapsetModelName = "Beatmapset";

export default BeatmapsetSchema;
