import { IsEnum } from 'class-validator';
import { TournamentStatus } from '../interfaces/tournament.status.enum';

import { CreateTournamentDTO } from './create-tournament.dto';

export class UpdateTournamentDTO extends CreateTournamentDTO {
  @IsEnum(TournamentStatus)
  status: TournamentStatus;
}
