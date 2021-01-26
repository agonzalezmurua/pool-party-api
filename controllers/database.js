import mongoose from "mongoose";

import BeatmapsetSchema from "../schemas/beatmapset.js";

import UserSchema from "../schemas/user.js";

import TournamentSchema from "../schemas/tournament.js";

import PoolSchema from "../schemas/pool.js";

export default {
  Beatmapset: mongoose.model("Beatmapset", BeatmapsetSchema),
  User: mongoose.model("User", UserSchema),
  Tournament: mongoose.model("Tournament", TournamentSchema),
  Pool: mongoose.model("Pool", PoolSchema),
};
