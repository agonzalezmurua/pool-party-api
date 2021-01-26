import mongoose from "mongoose";

import BeatmapsetSchema from "./beatmapset.js";
import UserSchema from "./user.js";

const PoolSchema = new mongoose.Schema({
  created_by: { type: UserSchema, required: true },
  beatmapsets: { type: [BeatmapsetSchema] },
});

export default PoolSchema;
