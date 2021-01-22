import { client, PATH } from "../services/osu.js";

export default {
  async getBeatmapsetById(id) {
    return (await client.get(`${PATH}/beatmapsets/${id}`)).data;
  },
};
