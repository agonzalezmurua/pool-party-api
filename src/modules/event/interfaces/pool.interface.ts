import { IMap } from '@src/modules/beatmapset/interfaces/map.interface';
import { IUser } from '@src/modules/user/interfaces/user.interface';
import { ITournament } from './tournament.interface';

import { PoolStatus } from './pool.status.enum';

export interface IPool {
  name: string;
  cover_url: string;
  beatmaps: IMap[];
  status: PoolStatus;
  used_in: ITournament[];
  created_by: IUser;
}