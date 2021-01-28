import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

export const roles = {
  admin: "admin",
  user: "user",
  moderator: "moderator",
};

const UserSchema = new mongoose.Schema(
  {
    osu_id: { type: String, required: true },
    username: { type: String, required: true },
    role: {
      type: String,
      enum: [roles.admin, roles.moderator, roles.user],
      default: roles.user,
      select: false,
    },
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);

UserSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "username",
    },
  ],
});

export default mongoose.model("User", UserSchema);
