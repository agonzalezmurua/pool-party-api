import consola from "consola";
import colors from "colors/safe.js";
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function (req, res, next) {
  const method = colors.cyan(req.method);
  const protocol = colors.yellow(req.protocol);
  const path = req.path;

  consola.info(`[${method} ${protocol}] - ${path}`);
  next();
}
