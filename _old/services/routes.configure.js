import Express from "express";

import beatmapsets from "../routes/beatmapsets";
import pools from "../routes/pools";
import tournaments from "../routes/tournaments";
import users from "../routes/users";
import errorHandler from "../middlewares/errorHandler";

/**
 * Configures api routes
 * @param {import('express').Application} app
 */
export async function configure(app) {
  const router = Express.Router();

  router.use("/beatmapsets", beatmapsets);
  router.use("/pools", pools);
  router.use("/tournaments", tournaments);
  router.use("/users", users);

  router.use(errorHandler);

  app.use(router);
}
