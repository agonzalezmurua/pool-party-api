import mongoose from "mongoose";

import { BeatmapsetModelName } from "./beatmapset.js";
import { UserModelName } from "./user.js";

const PoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserModelName,
    required: true,
  },
  beatmapsets: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: BeatmapsetModelName }],
  },
  last_updated: { type: Date, default: new Date() },
  created_at: { type: Date, default: new Date() },
});

export const PoolModelName = "Pool";

export default PoolSchema;
