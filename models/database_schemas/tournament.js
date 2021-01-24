import mongoose from "mongoose";

import Pool from "./pool";

export const Tournament = new mongoose.Schema({
  created_by: { type: User, required: true },
  pools: [Pool],
});

export default Tournament;
