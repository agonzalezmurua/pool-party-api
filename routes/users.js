import Express from "express";
import * as Db from "../providers/database";

const router = Express.Router();

router.get("/", async (req, res) => {
  const { search } = req.query;
  const users = await Db.User.fuzzySearch(search);
  res.json(users);
});

export default router;
