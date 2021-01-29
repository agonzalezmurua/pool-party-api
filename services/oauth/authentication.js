import jwt from "jsonwebtoken";

const SECRET = process.env.APP_AUTH_SECRET;
const ALGORITHM = "HS256";
const EXPIRATION = 60 * 60 * 24 * 2; // 2 days

/**
 * Signs a given object and creates a Json Web Token
 * @param {Object} payload
 */
function sign(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: EXPIRATION,
    algorithm: ALGORITHM,
  });
}
/**
 * Attemps to verify JWT signature
 * @param {string} token
 */
export function verifyJwt(token) {
  return jwt.verify(token, SECRET);
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
    expires_in: EXPIRATION,
    access_token: sign(payload),
  };
};
