export default class BeatmapsetResponse {
  constructor(OsuBeatmapset, BeatmapsetDocument) {
    const {
      id,
      artist,
      title,
      user_id,
      creator,
      card,
      favourite_count,
      play_count,
      status,
      beatmaps,
    } = OsuBeatmapset;

    const { is_tournament, pool_tags, tournament_id } = BeatmapsetDocument;

    this.id = id;
    this.artist = artist;
    this.title = title;
    this.user_id = user_id;
    this.creator = creator;
    this.card = card;
    this.favourite_count = favourite_count;
    this.play_count = play_count;
    this.status = status;
    this.beatmaps = beatmaps.map(
      ({
        difficulty_rating,
        id,
        mode,
        total_length,
        version,
        accuracy,
        beatmapset_id,
        bpm,
        drain,
        hit_length,
        mode_int,
        passcount,
        playcount,
        status,
        url,
      }) => {
        return {
          difficulty_rating,
          id,
          mode,
          total_length,
          version,
          accuracy,
          beatmapset_id,
          bpm,
          drain,
          hit_length,
          mode_int,
          passcount,
          playcount,
          status,
          url,
        };
      }
    );

    this.is_tournament = is_tournament;
    this.tournament_id = tournament_id;
    this.pool_tags = pool_tags;
  }
}
