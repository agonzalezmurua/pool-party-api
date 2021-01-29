import Express from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler";

import beatmapsets from "./beatmapsets";
import pools from "./pools";
import tournaments from "./tournaments";
import users from "./users";

export async function configure(app) {
  const router = Express.Router();

  router.use("/beatmapsets", beatmapsets);
  router.use("/pools", pools);
  router.use("/tournaments", tournaments);
  router.use("/users", users);

  router.use(errorHandlerMiddleware);

  app.use(router);
}
