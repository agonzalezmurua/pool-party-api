import mongoose from "mongoose";
import mongoose_fuzzy_searching from "mongoose-fuzzy-searching";

import Pool from "./pool";

export const statuses = {
  active: "active",
  inactive: "inactive",
  legacy: "legacy",
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
      minlength: 1,
      validate: [
        {
          validator: function (value) {
            return Array.isArray(value) && value.length >= 1;
          },
          message: "needs at least 1 entry",
        },
        {
          validator: async function (pools) {
            const docs = await Db.Pools.find({
              _id: {
                $in: [...pools],
              },
            });
            return pools.length === docs.length;
          },
          message: "one or more do(es) not exist",
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

//#region  Middlewares
TournamentSchema.post("save", async function (tournament) {
  if (tournament.isModified("pools")) {
    await Pool.updateMany(
      {
        _id: {
          $in: [...tournament.pools],
        },
      },
      {
        $pull: { used_in: tournament._id },
      }
    );
    // Update all references
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

TournamentSchema.post("remove", async function (tournament) {
  // Remove tournament reference from pools
  await Pool.updateMany(
    {
      _id: {
        $in: [...tournament.pools],
      },
    },
    {
      $pull: { used_in: tournament._id },
    }
  );
});
//#endregion

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

export default mongoose.model("Tournament", TournamentSchema);
