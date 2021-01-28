import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

export const statuses = {
  draft: "draft",
  public: "public",
};

const PoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      default: statuses.draft,
      enum: [statuses.draft, statuses.public],
    },
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

PoolSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "name",
      prefixOnly: true,
    },
    {
      name: "status",
      prefixOnly: true,
    },
  ],
});

export default mongoose.model("Pool", PoolSchema);
