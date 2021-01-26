import mongoose from "mongoose";

import BeatmapsetSchema from "../models/database_schemas/beatmapset.js";
import UserSchema from "../models/database_schemas/user.js";
import TournamentSchema from "../models/database_schemas/tournament.js";
import PoolSchema from "../models/database_schemas/pool.js";

export default {
  Beatmapset: mongoose.model("Beatmapset", BeatmapsetSchema),
  User: mongoose.model("User", UserSchema),
  Tournament: mongoose.model("Tournament", TournamentSchema),
  Pool: mongoose.model("Pool", PoolSchema),
};
