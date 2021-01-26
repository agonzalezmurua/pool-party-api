import mongoose from "mongoose";

import PoolSchema from "./pool.js";
import UserSchema from "./user.js";

const TournamentSchema = new mongoose.Schema({
  created_by: { type: UserSchema, required: true },
  pools: [PoolSchema],
});

export default TournamentSchema;
