import { Set } from '../entities/set.entity';
import { Tags } from '../interfaces/tags.enum';

import { ResponseMapSimpleDTO } from './response-map-simple.dto';

export class ResponseSetDTO {
  id: number;

  osu_id: number;

  artist: string;

  title: string;

  osu_user_id: number;

  submited_date: Date;

  status: string;

  cover_url: string;

  pool_tags: Tags[];

  maps: Array<ResponseMapSimpleDTO>;

  static fromEntity(entity: Set): ResponseSetDTO {
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
      maps: entity.maps.map(ResponseMapSimpleDTO.fromEntity),
    };
  }
}
