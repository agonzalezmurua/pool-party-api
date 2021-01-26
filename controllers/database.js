import mongoose from "mongoose";

import BeatmapsetSchema from "../models/database_schemas/beatmapset.js";
import UserSchema from "../models/database_schemas/user.js";

export default {
  Beatmapset: mongoose.model("Beatmapset", BeatmapsetSchema),
  User: mongoose.model("User", UserSchema),
};
