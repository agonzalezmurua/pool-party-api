import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";
import { ValidationError } from "../utils/errors";
import BeatmapModel from "./beatmapset";
import _ from "lodash";
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
      type: [
        {
          reference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Beatmapset",
            required: true,
          },
          modifiers: {
            type: [String],
            default: () => ["no_mod"]
          },
          difficulty: {
            type: String,
            required: true,
            default: function() {
              return "unknown"
            }
          },
        },
      ],
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
  } else {
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

PoolSchema.pre("save", async function () {
  // Update beatmapsets references for already existing records
  if (this.isNew === false) {
    const pool = await PoolModel.findById(this._id);

    if (this.isModified("beatmapsets")) {
      const addedBeatmaps = _.difference(this.beatmapsets, pool.beatmapsets);
      const removedBeatmaps = _.difference(pool.beatmapsets, this.beatmapsets);

      // Remove reference to pools that are being removed
      if (removedBeatmaps.length >= 1) {
        await Beatmapset.updateMany(
          {
            _id: {
              $in: [...removedBeatmaps],
            },
          },
          {
            $pull: { used_in: pool._id },
          }
        );
      }

      // Add new references to existing pools
      if (addedBeatmaps.length >= 1) {
        await Beatmapset.updateMany(
          {
            _id: {
              $in: [...addedBeatmaps],
            },
          },
          {
            $push: { used_in: pool._id },
          }
        );
      }
    }
  }
});

PoolSchema.post("save", async function (pool) {
  // Add pool references after saving
  if (pool.isNew === true) {
    await Beatmapset.updateMany(
      {
        _id: {
          $in: [...pool.beatmapsets],
        },
      },
      {
        $push: { used_in: pool._id },
      }
    );
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
