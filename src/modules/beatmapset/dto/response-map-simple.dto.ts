import { Map } from '../entities/map.entity';
import { GameMode } from '../interfaces/game-mode.enum';

/** Simplified entity, without any relationship */
export class ResponseMapSimpleDTO {
  id: number;

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

  static fromEntity(entity: Map): ResponseMapSimpleDTO {
    return {
      accuracy: entity.accuracy,
      approach_rate: entity.approach_rate,
      bpm: entity.bpm,
      circle_size: entity.circle_size,
      drain_rate: entity.drain_rate,
      id: entity.id,
      mode: entity.mode,
      osu_id: entity.osu_id,
      status: entity.status,
      total_length: entity.total_length,
      version: entity.version,
    };
  }
}
