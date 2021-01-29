import axios from "axios";
import colors from "colors/safe";
import consola from "consola";
import config from "config";

import prefixes from "../constants/consola_prefixes";

export const CLIENT_SECRET = process.env.OSU_API_SECRET;

import configureToken from "./osu/token";

export const client = axios.create({
  baseURL: config.get("osu.base_url"),
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const method = colors.white.bold(error.request.method);
    const path = colors.white(error.request.path);
    const status = colors.white.bold(error.response.status);
    consola.debug(prefixes.osu, `${method} ${status} - ${path}:`, error);
    Promise.reject(error);
  }
);

export async function configure() {
  await configureToken();
}
