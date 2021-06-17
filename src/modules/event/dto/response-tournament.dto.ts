import { ResponseUserDTO } from '../../../modules/user/dto/response-user.dto';
import { Tournament } from '../entities/tournament.entity';

import { TournamentStatus } from '../interfaces/tournament.status.enum';
import { ResponsePoolSimpleDTO } from './response-pool-simple.dto';

export class ResponseTournamentDTO {
  id: number;

  name: string;

  cover_url: string;

  pools: Array<ResponsePoolSimpleDTO>;

  status: TournamentStatus;

  created_by: ResponseUserDTO;

  created_at: Date;

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
