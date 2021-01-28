import axios from "axios";
import colors from "colors/safe";
import consola from "consola";

export const CLIENT_ID = process.env.OSU_API_CLIENT_ID;
export const CLIENT_SECRET = process.env.OSU_API_SECRET;
export const PATH = "/api/v2";
export const prefix = colors.magenta(`[OSU]`);
export const BASE_URL = "https://osu.ppy.sh";

export const client = axios.create({
  baseURL: BASE_URL,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const method = colors.white.bold(error.request.method);
    const path = colors.white(error.request.path);
    const status = colors.white.bold(error.response.status);
    consola.debug(prefix, `${method} ${status} - ${path}:`, error);
    Promise.reject(error);
  }
);
