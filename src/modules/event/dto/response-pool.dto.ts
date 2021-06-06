import { ApiProperty } from '@nestjs/swagger';
import { ResponseMapSimpleDTO } from '@src/modules/beatmapset/dto/response-map-simple.dto';
import { ResponseUserDTO } from '@src/modules/user/dto/response-user.dto';
import { Pool } from '../entities/pool.entity';

import { PoolStatus } from '../interfaces/pool.status.enum';
import { ResponseTournamentSimpleDTO } from './response-tournament-simple.dto';

export class ResponsePoolDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({ type: ResponseMapSimpleDTO, isArray: true })
  beatmaps: ResponseMapSimpleDTO[];

  @ApiProperty({ enum: PoolStatus })
  status: PoolStatus;

  @ApiProperty({ type: ResponseTournamentSimpleDTO, isArray: true })
  used_in: ResponseTournamentSimpleDTO[];

  @ApiProperty({ type: ResponseUserDTO })
  created_by: ResponseUserDTO;

  static fromEntity(entity: Pool): ResponsePoolDTO {
    return {
      beatmaps: entity.beatmaps.map(ResponseMapSimpleDTO.fromEntity),
      created_by: ResponseUserDTO.fromEntity(entity.created_by),
      used_in: entity.used_in.map(ResponseTournamentSimpleDTO.fromEntity),
      cover_url: entity.cover_url,
      id: entity.id,
      name: entity.name,
      status: entity.status,
    };
  }
}
