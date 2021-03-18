import Express from "express";

import Pool from "../mongoose.schemas/pool";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const router = Express.Router();

router.get("/", async (req, res) => {
  const { search = "" } = req;

  const pools = await Pool.fuzzySearch(search)
    .sort({ confidenceScore: -1, created_at: -1 })
    .populate("created_by")
    .select("-confidenceScore")
    .limit(50)
    .exec();

  res.json(pools);
});

router.get("/latest", async (req, res) => {
  const pools = await Pool.find()
    .sort({ created_at: -1 })
    .populate(["created_by", { path: "beatmapsets.reference", select: "covers.cover" }])
    .limit(50)
    .exec();

  res.send(pools);
});

router.get("/mine", ensureAuthenticated, async (req, res) => {
  const pools = await Pool.find({ created_by: req.user.id })
    .populate([
      { path: "beatmapsets.reference" },
      { path: "used_in", select: "_id name" },
    ])
    .exec();

  res.json(pools);
});

router.post("/", ensureAuthenticated, async (req, res, next) => {
  const document = new Pool(req.body);
  document.created_by = req.user.id;

  await document.save({ validateBeforeSave: true });

  res.json(document);
});

router.get("/:id", ensureAuthenticated, async(req, res) => {
  const document = await Pool.findById(req.params.id)
  .populate({path: "beatmapsets.reference", select:"_id covers.cover status is_tournament title artist user_id creator beatmaps.version"})
  .exec();
  if (!document){
    res.status(404);
    res.send(document);
    return;
  }
  res.json(document);
});


router.patch("/:id", ensureAuthenticated, async (req, res) => {
  const { name, beatmapsets } = req.body;
  const pool = await Pool.findById(req.params.id);

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

  await pool.save({ validateBeforeSave: true });

  res.json(pool);
});

router.delete("/:id", ensureAuthenticated, async (req, res, next) => {
  const pool = await Pool.findById(req.params.id);

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
