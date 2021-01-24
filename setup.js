import consola from "consola";
import { configureOsuServiceAuth } from "./services/osu_oauth.js";
import { configureDatabase } from "./services/database.js";

const handleError = (service) => (error) => {
  consola.error("failed to configure", service, error);
};

export default async function setup() {
  return Promise.all([
    configureOsuServiceAuth().catch(handleError("configure osu oauth")),
    configureDatabase().catch(handleError("configure database")),
  ]);
}
