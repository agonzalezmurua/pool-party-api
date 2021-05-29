import config from "config";
import { client } from "../services/osu.configure";

export default {
  beatmapset: {
    findById: (id) =>
      client.get(`${config.get("osu.api.path")}/beatmapsets/${id}`),
    findByUserId: (userId, type) =>
      client.get(`${config.get("osu.api.path")}/users/${userId}/beatmapsets/${type}`),
  },
};
