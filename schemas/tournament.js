import mongoose from "mongoose";

import Db from "../controllers/database.js";

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
          validator: function (value) {
            value.length >= 1;
          },
          message: "needs at least 1 entry",
        },
        {
          validator: async function (pools) {
            const docs = await Db.Pool.find({
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

TournamentSchema.post("save", async function (tournament) {
  // If modifying values, remove all references
  if (tournament.isModified("pools")) {
    await Db.Pool.updateMany(
      {
        _id: {
          $in: [...tournament.pools],
        },
      },
      {
        $pull: { used_in: tournament._id },
      }
    );
  }

  // Update all references
  await Db.Pool.updateMany(
    {
      _id: {
        $in: [...tournament.pools],
      },
    },
    {
      $push: { used_in: tournament._id },
    }
  );
});

TournamentSchema.post("remove", async function (tournament) {
  // Remove tournament reference from pools
  await Db.Pool.updateMany(
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

export default TournamentSchema;
