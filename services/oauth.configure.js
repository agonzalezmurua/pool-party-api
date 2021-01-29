import Express from "express";
import colors from "colors/safe";
import {
  requestAuthorization as osuAuthorization,
  handleAuthentication as osuAuthentication,
} from "./oauth/providers/osu";

export const prefix = colors.cyan("[OAUTH]");

/**
 * Configures a router with 'oauth' prefix that handles
 * app's authentication
 *
 * @param {import('express').Application} app
 */
export async function configure(app) {
  const router = Express.Router();

  router.get("/osu", osuAuthorization);
  router.post("/osu/token", osuAuthentication);

  app.use("/oauth", router);
}
