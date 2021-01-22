import { client, PATH } from "../services/osu.js";

export default {
  beatmapset: {
    async findById(id) {
      return (await client.get(`${PATH}/beatmapsets/${id}`)).data;
    },
  },
};
