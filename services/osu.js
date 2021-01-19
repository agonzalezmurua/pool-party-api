const axios = require("axios").default;

const BASE_URL = "https://osu.ppy.sh";
const API_VERSION = 2;

const PATH = `/api/v${API_VERSION}`;
const osu = axios.create({
  baseURL: BASE_URL,
});

module.exports = {
  BASE_URL: BASE_URL,
  client: osu,
  /**
   * Get a specific beatmap based on ID
   * @param {number} id Beatmapset identifier
   */
  getBeatmapsets(id) {
    return osu.get(`${PATH}/beatmapsets/${id}`);
  },
};
