import { client, PATH } from "../services/osu";

export default {
  beatmapset: {
    findById: (id) => client.get(`${PATH}/beatmapsets/${id}`),
  },
};
