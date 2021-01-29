import axios from "axios";
import { encode } from "querystring";
import {
  client,
  BASE_URL,
  prefix,
  CLIENT_ID,
  CLIENT_SECRET,
} from "../osu.configure";

const oauth = axios.create({
  baseURL: `${BASE_URL}`,
});

/**
 * Does the Grant Code authentication token retrieval from the osu service
 *
 * @returns {Promise<string>}
 */
async function fetchToken() {
  return oauth
    .post(
      "/oauth/token",
      encode({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
        scope: "public",
      })
    )
    .then((response) => {
      const {
        data: { token_type, access_token },
      } = response;
      const bearerToken = `${token_type} ${access_token}`;
      return bearerToken;
    })
    .catch((error) => {
      consola.error(prefix, "Failed to fetch new bearer token", error);
      throw error;
    });
}

/**
 * Sets an interceptor for osu axios client instance that maps the
 * Authorization header to every request
 *
 * @param {string} authorization Authorization token
 * @returns {number} Interceptor's id
 */
function setAuthorizationHeaderInterceptor(authorization) {
  return client.interceptors.request.use(function (config) {
    config.headers = {
      common: {
        Authorization: authorization,
      },
    };
    return config;
  });
}

/**
 * Sets a respone interceptor that evaluates when the given token has expired
 * and retrieves a new interceptor / token
 *
 * @param {number} previousRequestInterceptor Request interceptor's id
 */
function setExpiredTokenInterceptor(previousRequestInterceptor) {
  let requestInterceptor = previousRequestInterceptor;
  const responseInterceptor = client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        consola.debug(prefix, "Request's headers: ", error.request.headers);
        consola.debug(
          prefix,
          "Request errored with status",
          error.response.status
        );
        consola.debug(prefix, "Discarding original request interceptor");

        client.interceptors.request.eject(requestInterceptor);

        consola.debug(prefix, "Attempting to get new bearer token");

        return fetchToken().then((authorization) => {
          // Ovewrite interceptor with new one
          requestInterceptor = setAuthorizationHeaderInterceptor(authorization);
          error.config.headers.Authorization = authorization;

          consola.debug(prefix, "retrying request");
          return client.request(error.config);
        });
      }
    }
  );
  consola.debug(prefix, "Expired token interceptor registered");
  return responseInterceptor;
}

export async function configure() {
  consola.debug(prefix, "Starting internal client token configuration");
  const authorization = await fetchToken();
  consola.debug(prefix, "Bearer token fetched");

  const preRequestInterceptor = setAuthorizationHeaderInterceptor(
    authorization
  );

  consola.success(prefix, "Oauth succesfully configured");
  setExpiredTokenInterceptor(preRequestInterceptor);
}
