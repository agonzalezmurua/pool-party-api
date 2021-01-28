import axios from "axios";
import consola from "consola";
import colors from "colors/safe";
import { encode } from "querystring";

import User from "../../../providers/database/user";

import { BASE_URL, PATH, CLIENT_ID, CLIENT_SECRET } from "../../osu";
import { issueAuthentication } from "../jwt";

const prefix = `${colors.magenta("[OSU]")}${colors.cyan("[OAUTH]")}`;

const redirect_uri = process.env.APP_URL + process.env.OSU_OAUTH_CALLBACK_URI;
/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function requestAuthorization(req, res) {
  const parameters = {
    client_id: CLIENT_ID, // The Client ID you received when you registered
    redirect_uri: redirect_uri, // The URL in your application where users will be sent after authorization. This must match the registered Application Callback URL exactly.
    response_type: "code", // This should always be code when requesting authorization.
    scope: ["identify"].join(" "), // A space-delimited string of scopes.
  };

  const path = "/oauth/authorize";
  const url = new URL(path, BASE_URL);

  Object.entries(parameters).forEach(([name, value]) => {
    url.searchParams.append(name, value);
  });

  consola.debug("");
  res.redirect(url.toString());
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function handleAuthentication(req, res) {
  const client = axios.create({
    baseURL: BASE_URL,
  });
  const { code } = req.body;
  const payload = {
    client_id: CLIENT_ID, // The client ID of your application.
    client_secret: CLIENT_SECRET, //	The client secret of your application.
    code: code, //The code you received.
    grant_type: "authorization_code", //	This must always be authorization_code
    redirect_uri: redirect_uri, //	The URL in your application where users will be sent after authorization.
  };

  try {
    consola.debug(prefix, "sending oauth code to api");
    const {
      data: { token_type, access_token },
    } = await client.post("/oauth/token", encode(payload));

    consola.debug(prefix, "adding interceptor for further requests");
    // Add interceptor for further requests
    client.interceptors.request.use((config) => {
      config.headers = {
        common: { Authorization: `${token_type} ${access_token}` },
      };
      return config;
    });

    consola.debug(prefix, "obtaining user information");
    const {
      data: { id, username },
    } = await client.get(`${PATH}/me`);

    // Revoke current token to prevent further accidental usage
    consola.debug(prefix, "revoking osu token");
    await client.delete(`${PATH}/oauth/tokens/current`);

    consola.debug(prefix, "retrieving user from database");
    let user = await User.findOne({ osu_id: id });

    if (!user) {
      consola.debug(prefix, "user does not exist, creating");
      user = new User({ osu_id: id, username: username });
      await user.save();
    } else {
      consola.debug(prefix, "user exists");
    }

    consola.debug(prefix, "issuing authentication token");
    res.json(
      issueAuthentication({
        id: user.id,
        osu_id: user.osu_id,
      })
    );
  } catch (error) {
    consola.error(error);
    res.status(error.response.status);
    res.json(error.response.data);
  }
}
