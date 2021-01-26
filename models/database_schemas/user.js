import mongoose from "mongoose";

export const roles = {
  admin: "admin",
  user: "user",
  moderator: "moderator",
};

const UserSchema = new mongoose.Schema({
  osu_id: { type: String, required: true },
  username: { type: String, required: true },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.user],
    default: roles.user,
  },
});

export const UserModelName = "User";

export default UserSchema;
