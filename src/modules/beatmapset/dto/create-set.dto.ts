import { ApiProperty } from '@nestjs/swagger';
import { BeatmapSet } from '@src/modules/osu/interfaces/Beatmap-set.type';

import { Tags } from '../interfaces/tags.enum';
import { CreateMapDTO } from './create-map.dto';

export class CreateSetDTO {
  @ApiProperty()
  osu_id: number;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty()
  pool_tags: Tags[];

  @ApiProperty()
  maps: CreateMapDTO[];

  @ApiProperty()
  osu_user_id: number;

  @ApiProperty()
  submitted_date: Date;

  static fromEntity(entity: BeatmapSet): CreateSetDTO {
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
