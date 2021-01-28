import Express from "express";

import Tournament, { statuses } from "../providers/database/tournament";
import { ensureAuthenticated } from "../services/oauth/jwt";
import parseSchema from "../middlewares/parseSchema";

const router = Express.Router();

router.get("/", async (req, res) => {
  const { query = "" } = req.query;

  const tournaments = await Tournament.fuzzySearch({ query })
    .sort({
      confidenceScore: -1,
    })
    .populate("created_by")
    .select(["-confidenceScore"])
    .limit(50);

  res.json(tournaments);
});

router.get("/latest", async (req, res) => {
  const tournaments = await Tournament.find()
    .sort({ created_at: -1 })
    .populate(["created_by", { path: "pools", select: "_id name" }])
    .limit(50);
  res.send(tournaments);
});

router.get("/mine", ensureAuthenticated, async (req, res) => {
  const tournaments = await Tournament.find({
    created_by: req.user.id,
  })
    .populate([{ path: "pools", select: "_id name" }])
    .select("-created_by");
  res.json(tournaments);
});

router.post(
  "/",
  ensureAuthenticated,
  parseSchema(Tournament, false),
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
  const { name, pools = [], status } = req.body;

  const exists = await Tournament.exists({
    _id: id,
    created_by: req.user.id,
    status: statuses.active,
  });

  if (exists === false) {
    res.status(403).json(null);
    return;
  }

  const tournament = await Tournament.findByIdAndUpdate(
    id,
    { name, pools, status },
    { new: true, runValidators: true }
  );

  res.json(tournament);
});

router.delete("/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;

  const tournament = await Tournament.findById(id);

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
