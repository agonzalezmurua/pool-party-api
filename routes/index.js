import Express from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler.js";

import beatmapsets from "./beatmapsets.js";
import pools from "./pools.js";

export async function configure(app) {
  const router = Express.Router();

  router.use("/beatmapsets", beatmapsets);
  router.use("/pools", pools);

  router.use(errorHandlerMiddleware);

  app.use(router);
}
