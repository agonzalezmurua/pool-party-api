import { configureOauth } from "./services/oauth.js";
import { configureDatabase } from "./services/database.js";

export default async function setup() {
  return Promise.all([configureOauth(), configureDatabase()]);
}
