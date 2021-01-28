import consola from "consola";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { configure as configureOsuServiceGrant } from "./services/osu/token";
import { configure as configureDatabase } from "./services/database";
import { configure as configureOauth } from "./services/oauth";
import { configure as configureRoutes } from "./routes/index";
import trafficLogger from "./middlewares/trafficLogger";

const handleError = (service) => (error) => {
  consola.error("failed to", service + ":\n", error);
};

export default async function setup(app) {
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
