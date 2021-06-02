import { ApiProperty } from '@nestjs/swagger';
import { GameMode } from '../interfaces/game-mode.enum';

export class CreateMapDTO {
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
}
