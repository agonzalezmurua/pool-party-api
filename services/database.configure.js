import consola from "consola";
import mongoose from "mongoose";
import colors from "colors/safe";
import config from "config";

const prefix = colors.green(`[DBM]`);

/**
 * Creates initial configuration and connects to the database
 * @returns {Promise<void>}
 */
export async function configure() {
  const connectionUri = `mongodb://${config.get(
    "database.domain"
  )}/${config.get("database.name")}`;
  try {
    consola.debug(
      prefix,
      "Using string connection",
      colors.yellow(connectionUri)
    );
    consola.debug(prefix, "Attempting to connect to database");

    await mongoose.connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    consola.success(prefix, "Database has connected");
  } catch (error) {
    consola.error(prefix, "Database failed to connect", error);
    throw error;
  }
}

export default mongoose;
