import Express from "express";

import User from "../mongoose.schemas/user";
import Osu from "../providers/osu";
import {MapBeatmapsetToDocument} from './beatmapsets'

const router = Express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const users = await User.fuzzySearch(search)
    .select(["-confidenceScore"])
    .exec();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const document = await User.findById(req.params.id)
  .exec();
  if (!document) {
    res.status(404);
    res.send(document);
    return
  }
  res.json(document);
})

router.get("/:id/beatmaps", async (req, res) => {
  const document = await User.findById(req.params.id).exec();

  const types = [
    'graveyard',
    'loved',
    'ranked_and_approved',
    'unranked',
  ]
  
  // N request turns into 4 osu requests, careful with API usage limits
  // TODO: Consider caching the request response to prevent abuse
  const [
    graveyard,
    loved,
    ranked_and_approved,
    unranked,
  ] = await Promise.all(types.map((type) => Osu.beatmapset.findByUserId(document.osu_id, type)));

  const beatmaps = [];

  beatmaps.push(...graveyard, ...loved, ...ranked_and_approved, ...unranked)

  res.json(beatmaps.map((beatmap) => MapBeatmapsetToDocument(beatmap)));
})

export default router;