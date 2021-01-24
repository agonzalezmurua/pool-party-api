import mongoose from "mongoose";

import Tournament from "./tournament";

export const User = new mongoose.Schema({
  osu_id: { type: String, required: true },
  tournaments: { type: [Tournament] },
});

export default User;
