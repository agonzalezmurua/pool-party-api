import { encode } from "querystring";
import axios from "axios";
import { BASE_URL, client } from "./osu.js";
import consola from "consola";

const oauth = axios.create({
  baseURL: `${BASE_URL}`,
});

function getBearerToken() {
  return oauth
    .post(
      "/oauth/token",
      encode({
        client_id: process.env.OSU_API_CLIENT_ID,
        client_secret: process.env.OSU_API_SECRET,
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
      consola.error("Failed to fetch new bearer token", error);
      Promise.reject(error);
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

function handleExpiredToken(preRequestInterceptor) {
  //creo el interceptor
  const interceptor = client.interceptors.response.use(
    // si ta bn, ps ta muy bn
    (response) => response,
    //sino, wuaj
    (error) => {
      consola.debug("Response headers: ", error.request.headers);
      consola.debug("Request errored with status", error.response.status);
      if (error.response.status === 401) {
        //mando a la xuxa el interceptor por q ya hizo la pega
        consola.debug("Discarding original request interceptor");
        client.interceptors.request.eject(preRequestInterceptor);
        //pido el token nuevo
        consola.debug("Attempting to get new bearer token");
        return getBearerToken().then((authorization) => {
          preRequestInterceptor = setAuthorizationHeaderInterceptor(
            authorization
          );
          error.config.headers.Authorization = authorization;
          return client.request(error.config);
        });
      }
    }
  );
  return interceptor;
}

export async function configureOauth() {
  consola.debug("Starting oauth configuration");
  const authorization = await getBearerToken();
  consola.debug("Bearer token fetched");
  const preRequestInterceptor = setAuthorizationHeaderInterceptor(
    authorization
  );

  consola.success("Oauth succesfully configured");
  handleExpiredToken(preRequestInterceptor);
}
