import Express from "express";
import colors from "colors/safe";
import {
  requestAuthorization as osuAuthorization,
  handleAuthentication as osuAuthentication,
} from "./oauth/providers/osu";

const path = "/oauth";

export const prefix = colors.cyan("[OAUTH]");

export async function configure(app) {
  const router = Express.Router();

  router.get("/osu", osuAuthorization);
  router.post("/osu/token", osuAuthentication);

  app.use(path, router);
}
