const querystring = require("querystring");
const axios = require("axios").default;
const OsuService = require("./osu");

function getBearerToken() {
  return axios.post(
    `${OsuService.BASE_URL}/oauth/token`,
    querystring.encode({
      client_id: process.env.OSU_API_CLIENT_ID,
      client_secret: process.env.OSU_API_SECRET,
      grant_type: "client_credentials",
      scope: "public",
    })
  );
}

function setAuthorizationHeader(authorization) {
  axios.interceptors.request.use(function (config) {
    config.headers = {
      common: {
        Authorization: authorization,
      },
    };
    return config;
  });
}

module.exports = {
  oauthSetup: async function () {
    const {
      data: { token_type, expires_in, access_token },
    } = await getBearerToken();

    setAuthorizationHeader(`${token_type} ${access_token}`);
  },
};
