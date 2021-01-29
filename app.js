import colors from "colors/safe";
import consola from "consola";
import Express from "express";
export const prefix = colors.cyan(`[APP]`);

import setup from "./setup";

consola.info(
  prefix,
  "Running on environment",
  `${colors.yellow(process.env.NODE_ENV)}`
);

const app = Express();
const port = process.env.APP_PORT || 3000;

setup(app)
  .then(() => {
    const server = app.listen(port);
    server.on("listening", () => {
      consola.success(
        prefix,
        "App is ready and listening to port",
        colors.yellow(port)
      );
    });
  })
  .catch((error) => {
    consola.error(prefix, "App startup failed", error);
  });
