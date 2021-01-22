import Express from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler.js";
import beatmapsets from "./beatmapsets.js";
import trafficLogger from "../middlewares/trafficLogger.js";

export default function routes() {
  const router = Express.Router();
  router.use(trafficLogger);

  router.use("/beatmapsets", beatmapsets);

  router.use(errorHandlerMiddleware);
  return router;
}
