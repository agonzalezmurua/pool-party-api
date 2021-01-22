import consola from "consola";

/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function errorHandler(err, req, res, next) {
  consola.error("Unhandled error", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.json({ error: err });
}
