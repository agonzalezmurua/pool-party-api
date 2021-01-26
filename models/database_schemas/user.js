import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  osu_id: { type: String, required: true },
  username: { type: String, required: true },
});

export default UserSchema;
