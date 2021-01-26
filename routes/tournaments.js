import Express from "express";

import Db from "../controllers/database.js";
import { ensureAuthenticated } from "../services/oauth/jwt.js";
import parseSchema from "../middlewares/parseSchema.js";
import { ValidationError } from "../utils/errors.js";
import { statuses } from "../schemas/tournament.js";

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
  const tournaments = await Db.Tournament.find({
    created_by: req.user.id,
  })
    .populate(["created_by", { path: "pools", select: "_id name" }])
    .select("-created_by");
  res.json(tournaments);
});

router.post(
  "/",
  ensureAuthenticated,
  parseSchema(Db.Tournament, false),
  async (req, res, next) => {
    const { document } = req;
    document.created_by = req.user.id;
    const errors = document.validateSync();
    if (errors) {
      next(errors);
    }

    try {
      await document.save();
    } catch (error) {
      next(error);
      return;
    }

    res.json(document);
  }
);

router.patch("/:id", ensureAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, pools, status } = req.body;

  const tournament = await Db.Tournament.findById(id);

  if (!tournament) {
    res.status(404).json(null);
    return;
  }

  if (tournament.created_by != req.user.id) {
    res.status(403).json(null);
    return;
  }

  if ([statuses.inactive, statuses.legacy].includes(tournament.status)) {
    next(
      new ValidationError(
        "Current tournament status prevents any further modifications"
      )
    );
    return;
  }

  tournament.name = name || tournament.name;
  tournament.pools = pools || tournament.pools;
  tournament.status = status || tournament.status;

  await tournament.save();

  res.json(tournament);
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const tournament = await Db.Tournament.findById(id);

  if (!tournament) {
    res.status(404).json(null);
    return;
  }

  if (tournament.created_by != req.user.id) {
    res.status(403).json(null);
    return;
  }

  await tournament.delete();

  res.json(null);
});

export default router;
