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



export default router;
