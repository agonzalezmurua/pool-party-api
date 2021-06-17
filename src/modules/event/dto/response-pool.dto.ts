import { ResponseMapSimpleDTO } from '../../../modules/beatmapset/dto/response-map-simple.dto';
import { ResponseUserDTO } from '../../../modules/user/dto/response-user.dto';
import { Pool } from '../entities/pool.entity';

import { PoolStatus } from '../interfaces/pool.status.enum';
import { ResponseTournamentSimpleDTO } from './response-tournament-simple.dto';

export class ResponsePoolDTO {
  id: number;

  name: string;

  cover_url: string;

  beatmaps: ResponseMapSimpleDTO[];

  status: PoolStatus;

  used_in: ResponseTournamentSimpleDTO[];

  created_by: ResponseUserDTO;

  static fromEntity(entity: Pool): ResponsePoolDTO {
    return {
      beatmaps: entity.beatmaps?.map(ResponseMapSimpleDTO.fromEntity),
      created_by: ResponseUserDTO.fromEntity(entity.created_by),
      used_in: entity.used_in?.map(ResponseTournamentSimpleDTO.fromEntity),
      cover_url: entity.cover_url,
      id: entity.id,
      name: entity.name,
      status: entity.status,
    };
  }
}
