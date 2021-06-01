import { GameMode } from '../interfaces/game-mode.enum';

export interface CreateMapDTO {
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
}
