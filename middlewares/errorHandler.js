/**
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json({
    error: {
      message: err.message || "NO.MESSAGE",
      name: err.name,
    },
  });
}
