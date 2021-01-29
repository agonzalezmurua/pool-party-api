import Express from "express";
import errorHandlerMiddleware from "../middlewares/errorHandler";

import beatmapsets from "../routes/beatmapsets";
import pools from "../routes/pools";
import tournaments from "../routes/tournaments";
import users from "../routes/users";

export async function configure(app) {
  const router = Express.Router();

  router.use("/beatmapsets", beatmapsets);
  router.use("/pools", pools);
  router.use("/tournaments", tournaments);
  router.use("/users", users);

  router.use(errorHandlerMiddleware);

  app.use(router);
}
