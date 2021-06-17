import { ApiProperty } from '@nestjs/swagger';
import { Map } from '../../beatmapset/entities/map.entity';
import { Pool } from '../entities/pool.entity';

import { PoolStatus } from '../interfaces/pool.status.enum';

export class UpdatePoolDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty()
  status: PoolStatus;

  @ApiProperty({
    type: Number,
    isArray: true,
    description: "A list of beatmaps id's",
  })
  beatmaps: number[];
}
