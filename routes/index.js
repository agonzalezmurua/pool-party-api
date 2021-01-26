import Express from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler.js";

import beatmapsets from "./beatmapsets.js";

export async function configure(app) {
  const router = Express.Router();

  router.use("/beatmapsets", beatmapsets);

  router.use(errorHandlerMiddleware);

  app.use(router);
}
