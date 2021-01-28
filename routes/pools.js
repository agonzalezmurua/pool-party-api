import Express from "express";

import * as Db from "../providers/database";
import { ensureAuthenticated } from "../services/oauth/jwt";
import parseSchema from "../middlewares/parseSchema";

const router = Express.Router();

router.get("/", (req, res) => {
  res.status(501).json(null);
});

router.get("/latest", async (req, res) => {
  const pools = await Db.Pool.find()
    .sort({ created_at: -1 })
    .populate(["created_by", { path: "pools", select: "_id name" }])
    .limit(50);
  res.send(pools);
});

router.get("/mine", ensureAuthenticated, async (req, res) => {
  const pools = await Db.Pool.find({ created_by: req.user.id })
    .populate([
      { path: "beatmapsets", select: "-reference" },
      { path: "used_in", select: "_id name" },
    ])
    .select("-created_by");

  res.json(pools);
});

router.post(
  "/",
  ensureAuthenticated,
  parseSchema(Db.Pool, false),
  async (req, res, next) => {
    const { document, user } = req;
    document.created_by = await Db.Users.findById(user.id);

    try {
      await document.save();
    } catch (error) {
      next(error);
      return;
    }

    res.json(document);
  }
);

router.patch("/:id", ensureAuthenticated, async (req, res) => {
  const { name, beatmapsets } = req.body;
  const pool = await Db.Pool.findById(req.params.id);

  if (!pool) {
    res.status(404).json(null);
  }

  if (name) {
    pool.name = name;
  }

  if (Array.isArray(beatmapsets)) {
    pool.beatmapsets = beatmapsets;
  }

  pool.name = name || pool.name;
  pool.beatmapsets = Array.isArray(beatmapsets)
    ? beatmapsets
    : pool.beatmapsets;

  await pool.save();

  res.json(pool);
});

router.delete("/:id", ensureAuthenticated, async (req, res, next) => {
  const pool = await Db.Pool.findById(req.params.id);

  if (!pool) {
    res.status(404).json(null);
    return;
  }

  if (pool.created_by._id != req.user.id) {
    res.status(403).json(null);
    return;
  }

  if (pool.tournaments.length > 0) {
    next(
      new Error(
        "Cannot delete a pool is being or has been used in a tournament"
      )
    );
    return;
  }

  await pool.delete();

  res.json(null);
});

export default router;
