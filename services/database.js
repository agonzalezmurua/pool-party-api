import consola from "consola";
import mongoose from "mongoose";

export async function configureDatabase() {
  const connectionString = `mongodb://${process.env.MONGO_CONNECTION_DOMAIN}/${process.env.MONGO_DATABASE_NAME}`;
  try {
    consola.debug("Using string connection", connectionString);
    consola.debug("Attempting to connect to database");

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    consola.success("Database has connected");
  } catch (error) {
    consola.error("Database failed to connect", error);
    throw error;
  }
}

export default mongoose;
