import { IPool } from '@src/modules/event/interfaces/pool.interface';
import { GameMode } from '@src/modules/osu/interfaces/gamemode.type';

export interface IMap {
  osu_id: number;
  mode: GameMode;
  status: string;
  total_length: number;
  version: string;
  accuracy: number;
  approach_rate: number;
  circle_size: number;
  drain_rate: number;
  bpm: number;
  used_in: IPool[];
}
