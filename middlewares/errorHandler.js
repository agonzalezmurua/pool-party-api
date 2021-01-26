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

  switch (err.name) {
    case "UnauthenticatedError":
      res.status(401);
    case "UnauthorizedError":
      res.status(403);
      break;
    default:
      res.status(500);
      break;
  }

  res.json({
    error: {
      message: err.message || "NO.MESSAGE",
      name: err.name,
    },
  });
}
