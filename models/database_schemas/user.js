import mongoose from "mongoose";

import Tournament from "./tournament.js";

const User = new mongoose.Schema({
  osu_id: { type: String, required: true },
  username: { type: String, required: true },
  tournaments: { type: [Tournament] },
});

export default User;
