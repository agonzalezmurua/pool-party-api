import { ApiProperty } from '@nestjs/swagger';
import { Map } from '../entities/map.entity';
import { GameMode } from '../interfaces/game-mode.enum';

/** Simplified entity, without any relationship */
export class ResponseMapSimpleDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  osu_id: number;

  @ApiProperty()
  mode: GameMode;

  @ApiProperty()
  status: string;

  @ApiProperty()
  total_length: number;

  @ApiProperty()
  version: string;

  @ApiProperty()
  accuracy: number;

  @ApiProperty()
  approach_rate: number;

  @ApiProperty()
  circle_size: number;

  @ApiProperty()
  drain_rate: number;

  @ApiProperty()
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
