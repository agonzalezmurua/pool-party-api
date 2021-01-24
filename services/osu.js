import axios from "axios";
import colors from "colors/safe.js";
import consola from "consola";

export const API_VERSION = 2;
export const PATH = `/api/v${API_VERSION}`;
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
