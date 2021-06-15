import { GameMode } from '../../../modules/osu/interfaces/gamemode.type';
import { ISet } from './set.interface';

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
  set: ISet;
}
