import consola from "consola";
import mongoose from "mongoose";
import colors from "colors/safe";
import config from "config";
import format from "string-format";

import prefixes from "../constants/consola_prefixes";

/**
 * Creates initial configuration and connects to the database
 * @returns {Promise<void>}
 */
export async function configure() {
  const template = config.get("database.connection_string");
  const connectionString = format(template, {
    config: config.get("database"),
    env: {
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
  });
  try {
    consola.debug(
      prefixes.database,
      "Using string template",
      colors.yellow(template)
    );
    consola.debug(prefixes.database, "Attempting to connect to database");

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    consola.success(prefixes.database, "Database has connected");
  } catch (error) {
    consola.error(prefixes.database, "Database failed to connect", error);
    throw error;
  }
}

export default mongoose;
