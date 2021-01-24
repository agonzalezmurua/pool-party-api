import consola from "consola";
import mongoose from "mongoose";
import colors from "colors/safe.js";

const prefix = colors.green(`[DBM]`);

export async function configureDatabase() {
  const connectionString = `mongodb://${process.env.MONGO_CONNECTION_DOMAIN}/${process.env.MONGO_DATABASE_NAME}`;
  try {
    consola.debug(prefix, "Using string connection", connectionString);
    consola.debug(prefix, "Attempting to connect to database");

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    consola.success(prefix, "Database has connected");
  } catch (error) {
    consola.error(prefix, "Database failed to connect", error);
    throw error;
  }
}

export default mongoose;
