import consola from "consola";
import colors from "colors/safe";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { prefix } from "./app";
import { configure as configureOsuServiceGrant } from "./services/osu/token";
import { configure as configureDatabase } from "./services/database.configure";
import { configure as configureOauth } from "./services/oauth.configure";
import { configure as configureRoutes } from "./routes/_configure";
import trafficLogger from "./middlewares/trafficLogger";

const handleError = (service) => (error) => {
  consola.error("failed to", service + ":\n", error);
};

/**
 * Initializes main configuratio of the app
 * @param {import('express').Application} app
 */
export default async function setup(app) {
  consola.debug(
    prefix,
    "Allowing the following origin (CORS)",
    colors.yellow(process.env.APP_ALLOWED_ORIGIN)
  );

  app.use(
    cors({
      origin: process.env.APP_ALLOWED_ORIGIN,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(trafficLogger);

  await Promise.all([
    configureOauth(app).catch(handleError("configure oauth")),
    configureRoutes(app).catch(handleError("configure routes")),
    configureOsuServiceGrant().catch(handleError("configure osu token")),
    configureDatabase().catch(handleError("configure database")),
  ]);
}
