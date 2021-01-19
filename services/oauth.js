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

function refreshToken(){
  //creo el interceptor
  const interceptor = axios.interceptors.response.use(
    // si ta bn, ps ta muy bn
    response => response,
    //sino, wuaj
    error => {
      if(error.response.status === 401 && error.response.message == "token expired"){
        return Promise.reject(error);
      }
      //mando a la xuxa el interceptor por q ya hizo la pega
      axios.interceptors.response.eject(interceptor),
    //pido el token nuevo  
    getBearerToken()
    .then(response => {
      error.response.config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
      return axios(error.response.config);
    })
    .finally(refreshToken)
    },
  )
}

module.exports = {
  oauthSetup: async function () {
    const {
      data: { token_type, expires_in, access_token },
    } = await getBearerToken();

    setAuthorizationHeader(`${token_type} ${access_token}`);
    refreshToken();
  },
};