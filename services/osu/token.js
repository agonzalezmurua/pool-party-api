import axios from "axios";
import { encode } from "querystring";
import { client, BASE_URL, prefix, CLIENT_ID, CLIENT_SECRET } from "../osu.js";

const oauth = axios.create({
  baseURL: `${BASE_URL}`,
});

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

function setExpiredTokenInterceptor(previousRequestInterceptor) {
  //creo el interceptor
  const interceptor = client.interceptors.response.use(
    // si ta bn, ps ta muy bn
    (response) => response,
    //sino, wuaj
    (error) => {
      if (error.response.status === 401) {
        consola.debug(prefix, "Response headers: ", error.request.headers);
        consola.debug(
          prefix,
          "Request errored with status",
          error.response.status
        );
        //mando a la xuxa el interceptor por q ya hizo la pega
        consola.debug(prefix, "Discarding original request interceptor");
        client.interceptors.request.eject(previousRequestInterceptor);
        //pido el token nuevo
        consola.debug(prefix, "Attempting to get new bearer token");
        return fetchToken().then((authorization) => {
          previousRequestInterceptor = setAuthorizationHeaderInterceptor(
            authorization
          );
          error.config.headers.Authorization = authorization;
          return client.request(error.config);
        });
      }
    }
  );
  consola.debug(prefix, "expired token interceptor registered");
  return interceptor;
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
