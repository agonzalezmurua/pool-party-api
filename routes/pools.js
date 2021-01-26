import Express from "express";
import { ensureAuthenticated } from "../services/oauth/jwt.js";

const router = Express.Router();

router.get("/", ensureAuthenticated, async (req, res) => {});

router.get("/search", (req, res) => {});

router.post("/", ensureAuthenticated, (req, res) => {
  res.json("Succesfully identified");
});

export default router;
