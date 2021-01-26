import consola from "consola";
import { configure as configureOsuServiceGrant } from "./services/osu/token.js";
import { configure as configureDatabase } from "./services/database.js";
import { configure as configureOauth } from "./services/oauth.js";
import { configure as configureRoutes } from "./routes/index.js";
import trafficLogger from "./middlewares/trafficLogger.js";

const handleError = (service) => (error) => {
  consola.error("failed to", service + ":\n", error);
};

export default async function setup(app) {
  // Register trafficlogger middleware
  app.use(trafficLogger);
  await Promise.all([
    configureOauth(app).catch(handleError("configure oauth")),
    configureRoutes(app).catch(handleError("configure routes")),
    configureOsuServiceGrant().catch(handleError("configure osu token")),
    configureDatabase().catch(handleError("configure database")),
  ]);
}
