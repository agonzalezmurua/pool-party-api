import mongoose from "mongoose";

import BeatmapsetSchema, {
  BeatmapsetModelName,
} from "../models/database_schemas/beatmapset.js";

import UserSchema, { UserModelName } from "../models/database_schemas/user.js";

import TournamentSchema, {
  TournamentModelName,
} from "../models/database_schemas/tournament.js";

import PoolSchema, { PoolModelName } from "../models/database_schemas/pool.js";

export default {
  Beatmapset: mongoose.model(BeatmapsetModelName, BeatmapsetSchema),
  User: mongoose.model(UserModelName, UserSchema),
  Tournament: mongoose.model(TournamentModelName, TournamentSchema),
  Pool: mongoose.model(PoolModelName, PoolSchema),
};
