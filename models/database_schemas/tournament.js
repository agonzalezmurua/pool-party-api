import mongoose from "mongoose";

import Pool from "./pool.js";
import User from "./user.js";

const Tournament = new mongoose.Schema({
  pools: [Pool],
});

export default Tournament;
