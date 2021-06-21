import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { encode } from 'querystring';

/**
 * Does the Grant Code authentication token retrieval from the osu service
 *
 * @returns {Promise<string>}
 */
async function fetchToken() {
  const response = await axios.post(
    'https://osu.ppy.sh/oauth/token',
    encode({
      client_id: process.env.OSU_CLIENT_ID,
      client_secret: process.env.OSU_CLIENT_SECRET,
      grant_type: 'client_credentials',
      scope: 'public',
    }),
  );

  const {
    data: { token_type, access_token },
  } = response;
  const bearerToken = `${token_type} ${access_token}`;

  return bearerToken;
}

/**
 * Sets an interceptor for osu axios client instance that maps the
 * Authorization header to every request
 *
 * @param {string} authorization Authorization token
 * @returns {number} Interceptor's id
 */
export function setAuthorizationHeaderInterceptor(client, authorization) {
  return client.interceptors.request.use(function (config) {
    config.headers = {
      common: {
        Authorization: authorization,
      },
    };
    return config;
  });
}

export function handleExpiredToken(client: AxiosInstance) {
  let requestInterceptor;

  return [
    (response) => response,
    async (error) => {
      if (error.response.status === 401) {
        if (requestInterceptor) {
          client.interceptors.request.eject(requestInterceptor);
        }

        try {
          const authorization = await fetchToken();

          // Ovewrite interceptor with new one
          requestInterceptor = setAuthorizationHeaderInterceptor(
            client,
            authorization,
          );
          error.config.headers.Authorization = authorization;

          return client.request(error.config);
        } catch (e) {
          return error;
        }
      }

      return error;
    },
  ];
}
