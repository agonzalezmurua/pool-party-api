import Express from "express";

import Tournament, { statuses } from "../mongoose.schemas/tournament";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Express.Router();

router.get("/", async (req, res) => {
  const { query = "" } = req.query;

  const tournaments = await Tournament.fuzzySearch({ query })
    .sort({
      confidenceScore: -1,
      created_at: -1,
    })
    .populate("created_by")
    .select(["-confidenceScore"])
    .limit(50)
    .exec();

  res.json(tournaments);
});

router.get("/latest", async (req, res) => {
  const tournaments = await Tournament.find()
    .sort({ created_at: -1 })
    .populate(["created_by", { path: "pools", select: "_id name" }])
    .limit(50)
    .exec();

  res.send(tournaments);
});

router.get("/mine", ensureAuthenticated, async (req, res) => {
  const tournaments = await Tournament.find({
    created_by: req.user.id,
  })
    .populate([{ path: "pools", select: "_id name" }])
    .select("-created_by")
    .exec();
  res.json(tournaments);
});

router.post("/", ensureAuthenticated, async (req, res) => {
  const document = new Tournament(req.body);
  document.created_by = req.user.id;

  await document.save({ validateBeforeSave: true });

  res.json(document);
});

router.patch("/:id", ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { name, pools, status } = req.body;

  const tournament = await Tournament.findOne({
    _id: id,
    created_by: req.user.id,
    status: statuses.active,
  });

  if (!tournament) {
    res.status(403).json(null);
    return;
  }

  tournament.pools = Array.isArray(pools) ? pools : tournament.pools;
  tournament.name = name || tournament.name;
  tournament.status = status || tournament.status;

  tournament.save({ validateBeforeSave: true });

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
