import mongoose from "mongoose";

import { UserModelName } from "./user.js";
import { PoolModelName } from "./pool.js";

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Types.ObjectId,
    ref: UserModelName,
    required: true,
  },
  pools: {
    type: [{ type: mongoose.Types.ObjectId, ref: PoolModelName }],
    validate: [(value) => value.length >= 1, "{PATH} needs at least 1 entry"],
  },
});

export const TournamentModelName = "Tournament";

export default TournamentSchema;
