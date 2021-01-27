import consola from "consola";
import colors from "colors/safe.js";

/**
 * Logger that tracks every request
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function (req, res, next) {
  res.on("finish", function () {
    const method = colors.cyan(req.method);
    const protocol = colors.yellow(req.protocol);
    const path = req.path;
    const code = colors.yellow(this.statusCode);
    consola.info(`${method} ${protocol} ${code} - ${path}`);
  });
  next();
}
