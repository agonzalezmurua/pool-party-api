import Express from "express";

import Db from "../controllers/database.js";
import { ensureAuthenticated } from "../services/oauth/jwt.js";
import parseSchema from "../middlewares/parseSchema.js";

const router = Express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {
  const pools = await Db.Pool.find({ created_by: req.user.id }).select(
    "-created_by"
  );

  res.json(pools);
});

router.get("/search", (req, res) => {});

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

export default router;
