const axios = require("axios").default;

const BASE_URL = "https://osu.ppy.sh";
const API_VERSION = 2;

const URL = `${BASE_URL}/api/v${API_VERSION}`;

module.exports = {
  URL: URL,
  BASE_URL: BASE_URL,
  /**
   * Get a specific beatmap based on ID
   * @param {number} id Beatmapset identifier
   */
  getBeatmapsets(id) {
    return axios.get(`${URL}/beatmapsets/${id}`);
  },
};
