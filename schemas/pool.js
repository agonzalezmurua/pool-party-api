import mongoose from "mongoose";

const PoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    is_draft: { type: Boolean, default: true },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beatmapsets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beatmapset" }],
    },
    used_in: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Tournament",
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default PoolSchema;
