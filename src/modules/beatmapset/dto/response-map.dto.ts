import { ApiProperty } from '@nestjs/swagger';
import { ResponsePoolSimpleDTO } from '@src/modules/event/dto/response-pool-simple.dto';
import { Map } from '../entities/map.entity';

import { GameMode } from '../interfaces/game-mode.enum';

export class ResponseMapDTO {
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

  @ApiProperty({ type: ResponsePoolSimpleDTO, isArray: true })
  used_in: ResponsePoolSimpleDTO[];

  static fromEntity(entity: Map): ResponseMapDTO {
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
      used_in: entity.used_in,
      version: entity.version,
    };
  }
}
