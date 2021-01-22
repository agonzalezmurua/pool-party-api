import axios from "axios";

export const API_VERSION = 2;
export const PATH = `/api/v${API_VERSION}`;

export const BASE_URL = "https://osu.ppy.sh";

export const client = axios.create({
  baseURL: BASE_URL,
});
