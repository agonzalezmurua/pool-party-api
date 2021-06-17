import { BeatmapSet } from '../../../modules/osu/interfaces/Beatmap-set.type';

import { Tags } from '../interfaces/tags.enum';
import { CreateMapDTO } from './create-map.dto';

export class CreateSetDTO {
  osu_id: number;

  artist: string;

  title: string;

  status: string;

  cover_url: string;

  pool_tags: Tags[];

  maps: CreateMapDTO[];

  osu_user_id: number;

  submitted_date: Date;

  static fromOsu(entity: BeatmapSet): CreateSetDTO {
    return {
      artist: entity.artist,
      cover_url: entity.covers['cover@2x'],
      submitted_date: new Date(String(entity.submitted_date)),
      maps:
        entity.beatmaps?.map((beatmap) => ({
          accuracy: beatmap.accuracy,
          approach_rate: beatmap.ar,
          bpm: beatmap.bpm,
          circle_size: beatmap.cs,
          drain_rate: beatmap.drain,
          osu_id: beatmap.id,
          status: beatmap.status,
          total_length: beatmap.total_length,
          version: beatmap.version,
          mode: beatmap.mode,
        })) || [],
      osu_id: entity.id,
      pool_tags: [],
      status: entity.status,
      title: entity.title,
      osu_user_id: entity.user_id,
    };
  }
}
