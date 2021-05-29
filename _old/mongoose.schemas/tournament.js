import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";
import { ValidationError } from "../utils/errors";
import _ from "lodash";

import Pool from "./pool";

export const statuses = {
  active: "active", // Tournaments that are being organized
  inactive: "inactive", // Tournaments that have ended
  legacy: "legacy", // Tornaments that have been added on a batch operation
};

const TournamentSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: statuses.active,
      enum: [statuses.active, statuses.inactive, statuses.legacy],
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    created_by: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pools: {
      type: [{ type: mongoose.Types.ObjectId, ref: "Pool" }],
      validate: [
        {
          validator: (pools) => Array.isArray(pools),
          message: "must be an array",
        },
        {
          validator: function (value) {
            return Array.isArray(value) && value.length >= 1;
          },
          message: "needs at least 1 entry",
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
TournamentSchema.virtual("pool_amount").get(function () {
  return this.pools.length;
});
TournamentSchema.pre("save", async function () {
  // Validate on new entries that any pool that is being added / updated does exist
  if (this.isNew && !(await Pool.exists({ _id: { $in: [...this.pools] } }))) {
    throw new ValidationError(
      "one or more of the specified pools do not exist"
    );
  }

  // Update pool references for already existing records
  if (this.isNew === false) {
    const tournament = await TournamentModel.findById(this._id);

    if (tournament.status !== statuses.active) {
      throw new ValidationError(
        "tournaments that are not active cannot be modified"
      );
    }

    if (this.isModified("pools")) {
      const addedPools = _.difference(this.pools, tournament.pools);
      const removedPools = _.difference(tournament.pools, this.pools);

      // Remove reference to pools that are being removed
      if (removedPools.length >= 1) {
        await Pool.updateMany(
          {
            _id: {
              $in: [...removedPools],
            },
          },
          {
            $pull: { used_in: tournament._id },
          }
        );
      }

      // Add new references to existing pools
      if (addedPools.length >= 1) {
        await Pool.updateMany(
          {
            _id: {
              $in: [...addedPools],
            },
          },
          {
            $push: { used_in: tournament._id },
          }
        );
      }
    }
  }
});

TournamentSchema.post("save", async function (tournament) {
  // Add pool references after saving
  if (tournament.isNew === true) {
    await Pool.updateMany(
      {
        _id: {
          $in: [...tournament.pools],
        },
      },
      {
        $push: { used_in: tournament._id },
      }
    );
  }
});

TournamentSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    {
      name: "name",
    },
    {
      name: "status",
      prefixOnly: true,
    },
  ],
});

const TournamentModel = mongoose.model("Tournament", TournamentSchema);

export default TournamentModel;
