import Express from "express";

import Db from "../controllers/database.js";
import { ensureAuthenticated } from "../services/oauth/jwt.js";
import parseSchema from "../middlewares/parseSchema.js";

const router = Express.Router();

router.get("/latest", async (req, res) => {
  const tournaments = await Db.Tournament.find()
    .sort({ created_at: -1 })
    .populate(["created_by", { path: "pools", select: "_id name" }])
    .limit(50);
  res.send(tournaments);
});

router.get("/search", (req, res) => {
  res.status(501).json(null);
});

router.get("/", ensureAuthenticated, async (req, res) => {
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
    document.created_by = await Db.User.findById(user.id);

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
