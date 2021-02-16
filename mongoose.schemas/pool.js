import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";
import { ValidationError } from "../utils/errors";

import Beatmapset from "./beatmapset";

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
    toJSON: {
      virtuals: true,
    },
  }
);
PoolSchema.virtual("beatmap_amount").get(function () {
  if (this.beatmapsets) {
    return this.beatmapsets.length;
  }
  else{
    return 0;
  }
});
PoolSchema.pre("save", async function () {
  if (
    (this.isNew || this.isModified("beatmaps")) &&
    this.beatmapsets.length >= 1 &&
    !(await Beatmapset.exists({ _id: { $in: [...this.beatmapsets] } }))
  ) {
    throw new ValidationError("Some beatmaps do not exist");
  }
});

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

const PoolModel = mongoose.model("Pool", PoolSchema);

export default PoolModel;
