import { Mode } from 'fs';
import { IPool } from '@src/modules/event/interfaces/pool.interface';

export interface IMap {
  osu_id: string;
  mode: Mode;
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
