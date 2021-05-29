import { IUser } from 'src/user/interfaces/user.interface';
import { IPool } from './pool.interface';
import { TournamentStatus } from './tournament.status.enum';

export interface ITournament {
  name: string;
  cover_url: string;
  pools: IPool[];
  status: TournamentStatus;
  created_by: IUser;
}
