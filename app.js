import colors from "colors/safe.js";
import consola from "consola";
import Express from "express";

import setup from "./setup.js";

export const prefix = colors.cyan(`[APP]`);
consola.info(prefix, "running on environment", `"${process.env.NODE_ENV}"`);
const app = Express();
const port = process.env.APP_PORT || 3000;

consola.debug(
  prefix,
  "Allowing the following origin (CORS)",
  process.env.APP_ALLOWED_ORIGIN
);

setup(app)
  .then(() => {
    const server = app.listen(port);
    server.on("listening", () => {
      consola.success("app is ready and listening to port", port);
    });
  })
  .catch((error) => {
    consola.error("App startup failed", error);
  });
