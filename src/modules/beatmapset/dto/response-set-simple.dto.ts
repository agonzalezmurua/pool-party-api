import { Set } from '../entities/set.entity';

import { Tags } from '../interfaces/tags.enum';

export class ResponseSetSimpleDTO {
  /** Unique identifier */
  id: number;

  /** Osu unique identifier */
  osu_id: number;

  artist: string;

  title: string;

  osu_user_id: number;

  submited_date: Date;

  status: string;

  cover_url: string;

  pool_tags: Tags[];

  static fromEntity(entity: Set): ResponseSetSimpleDTO {
    return {
      artist: entity.artist,
      cover_url: entity.cover_url,
      id: entity.id,
      osu_id: entity.osu_id,
      osu_user_id: entity.osu_user_id,
      pool_tags: entity.pool_tags,
      status: entity.status,
      submited_date: entity.submited_date,
      title: entity.title,
    };
  }
}
