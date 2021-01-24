import { client, PATH } from "../services/osu.js";

export default {
  beatmapset: {
    findById: (id) => client.get(`${PATH}/beatmapsets/${id}`),
  },
};
