const querystring = require("querystring");
const axios = require("axios").default;
const OsuService = require("./osu");
const consola = require("consola");

const oauth = axios.create({
  baseURL: `${OsuService.BASE_URL}`,
});

function getBearerToken() {
  return oauth
    .post(
      "/oauth/token",
      querystring.encode({
        client_id: process.env.OSU_API_CLIENT_ID,
        client_secret: process.env.OSU_API_SECRET,
        grant_type: "client_credentials",
        scope: "public",
      })
    )
    .then((response) => {
      consola.debug("bearer token response status", response.status);
      const {
        data: { token_type, access_token },
      } = response;
      const bearerToken = `${token_type} ${access_token}`;
      return bearerToken;
    })
    .catch((error) => {
      consola.error("failed to fetch new bearer token", error);
      Promise.reject(error);
    });
}

function setAuthorizationHeaderInterceptor(authorization) {
  return OsuService.client.interceptors.request.use(function (config) {
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
  const interceptor = OsuService.client.interceptors.response.use(
    // si ta bn, ps ta muy bn
    (response) => response,
    //sino, wuaj
    (error) => {
      consola.debug("response headers: ", error.request.headers);
      consola.debug("request errored with status", error.response.status);
      if (error.response.status === 401) {
        //mando a la xuxa el interceptor por q ya hizo la pega
        consola.debug("discarding original request interceptor");
        OsuService.client.interceptors.request.eject(preRequestInterceptor);
        //pido el token nuevo
        consola.debug("attempting to get new bearer token");
        return getBearerToken()
        .then((authorization) => {
          preRequestInterceptor = setAuthorizationHeaderInterceptor(authorization)
          error.config.headers.Authorization = authorization
          return OsuService.client.request(error.config)
        });
      }
    }
  );
  return interceptor;
}

module.exports = {
  oauthSetup: async function () {
    const authorization = await getBearerToken();

    const preRequestInterceptor = setAuthorizationHeaderInterceptor(
      authorization
    );
    handleExpiredToken(preRequestInterceptor);
  },
};