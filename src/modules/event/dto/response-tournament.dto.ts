import { ApiProperty } from '@nestjs/swagger';

import { ResponseUserDTO } from '@src/modules/user/dto/response-user.dto';
import { Tournament } from '../entities/tournament.entity';

import { TournamentStatus } from '../interfaces/tournament.status.enum';
import { ResponsePoolSimpleDTO } from './response-pool-simple.dto';

export class ResponseTournamentDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({ type: ResponsePoolSimpleDTO, isArray: true })
  pools: Array<ResponsePoolSimpleDTO>;

  @ApiProperty({ enum: TournamentStatus })
  status: TournamentStatus;

  @ApiProperty({ type: ResponseUserDTO })
  created_by: ResponseUserDTO;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  last_updated: Date;

  static fromEntity(e: Tournament): ResponseTournamentDTO {
    return {
      cover_url: e.cover_url,
      created_at: e.created_at,
      created_by: ResponseUserDTO.fromEntity(e.created_by),
      id: e.id,
      last_updated: e.last_updated,
      name: e.name,
      pools: e.pools.map(ResponsePoolSimpleDTO.fromEntity),
      status: e.status,
    };
  }
}
