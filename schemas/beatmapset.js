import mongoose from "mongoose";

const BeatmapsetSchema = new mongoose.Schema(
  {
    reference: {
      type: Object,
      required: true,
    },
    added_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
    is_tournament: { type: Boolean, required: false, default: false },
    tags: { type: [{ type: String }], required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default BeatmapsetSchema;
