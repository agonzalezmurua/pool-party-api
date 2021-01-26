import jwt from "jsonwebtoken";

const secret = process.env.APP_AUTH_SECRET;
const algorithm = "HS256";
const expiration = 60 * 60 * 24 * 7; // 2 days

function sign(payload) {
  return jwt.sign(payload, secret, {
    expiresIn: expiration,
    algorithm: algorithm,
  });
}

class UnauthenticatedError extends Error {
  constructor() {
    super();
    this.name = "UnauthenticatedError";
    this.message = "Failed to authenticate user";
  }
}

class UnauthorizedError extends Error {
  constructor() {
    super();
    this.name = "UnauthorizedError";
    this.message = "Failed to idenfity user's identity";
  }
}

/**
 * Emmits a signed token with the corresponding user information
 * @param {Object} payload Authentication payload
 * @param {String} payload.id
 * @param {String} payload.osu_id
 */
export const issueAuthentication = (payload) => {
  return {
    token_type: "Bearer",
    expires_in: expiration,
    access_token: sign(payload),
  };
};

/**
 * Ensures that the given authorization header contains a valid
 * access token
 *
 * And populates the request object with `req.user` if there is any valid session
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const ensureAuthenticated = (req, res, next) => {
  const authorization = req.header("authorization");

  if (!authorization) {
    next(new UnauthenticatedError());
  }

  const [token_type, access_token] = authorization.split(" ");

  if (token_type !== "Bearer") {
    next(new UnauthorizedError());
    return;
  }

  let payload;

  try {
    payload = jwt.verify(access_token, secret);
  } catch (err) {
    next(new UnauthorizedError());
    return;
  }

  // TODO: validate user role for advanced permissions
  req.user = payload;

  next();
};
