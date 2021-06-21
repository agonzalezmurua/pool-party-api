import { Tournament } from '../entities/tournament.entity';

import { TournamentStatus } from '../interfaces/tournament.status.enum';

export class ResponseTournamentSimpleDTO {
  id: number;

  name: string;

  cover_url: string;

  status: TournamentStatus;

  created_at: Date;

  last_updated: Date;

  static fromEntity(e: Tournament): ResponseTournamentSimpleDTO {
    return {
      cover_url: e.cover_url,
      created_at: e.created_at,
      id: e.id,
      last_updated: e.last_updated,
      name: e.name,
      status: e.status,
    };
  }
}
