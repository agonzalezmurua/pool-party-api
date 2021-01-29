import { client, PATH } from "../services/osu.configure";

export default {
  beatmapset: {
    findById: (id) => client.get(`${PATH}/beatmapsets/${id}`),
  },
};
