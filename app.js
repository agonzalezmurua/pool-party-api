import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
import consola from "consola";
import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes/index.js";
import setup from "./setup.js";

consola.info("running on environment", `"${process.env.NODE_ENV}"`);
const app = Express();
const port = process.env.APP_PORT || 3000;

consola.debug(
  "Allowing the following origin (CORS)",
  process.env.APP_ALLOWED_ORIGIN
);

app.use(
  cors({
    origin: process.env.APP_ALLOWED_ORIGIN,
  })
);
app.use(bodyParser.json());

app.use(routes());

setup()
  .then(() => {
    const server = app.listen(port);
    server.on("listening", () => {
      consola.success("app is ready and listening to port", port);
    });
  })
  .catch(() => {
    consola.error("App startup failed");
  });
