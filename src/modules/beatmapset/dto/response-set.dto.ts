import { ApiProperty } from '@nestjs/swagger';
import { Set } from '../entities/set.entity';
import { Tags } from '../interfaces/tags.enum';

import { ResponseMapSimpleDTO } from './response-map-simple.dto';

export class ResponseSetDTO {
  @ApiProperty({ description: 'Unique identifier', example: 1 })
  id: number;

  @ApiProperty({ description: 'Osu unique identifier', example: 1 })
  osu_id: number;

  @ApiProperty({ example: 'Tyler, the Creator' })
  artist: string;

  @ApiProperty({ example: 'NEW MAGIC WAND' })
  title: string;

  @ApiProperty({ example: 1 })
  osu_user_id: number;

  @ApiProperty()
  submited_date: Date;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({ enum: Tags, isArray: true })
  pool_tags: Tags[];

  @ApiProperty({ type: ResponseMapSimpleDTO, isArray: true })
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
