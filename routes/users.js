import Express from "express";

import User from "../mongoose.schemas/user";

const router = Express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const users = await User.fuzzySearch(search)
    .select(["-confidenceScore"])
    .exec();
  res.json(users);
});

export default router;
