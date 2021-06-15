import { ApiProperty } from '@nestjs/swagger';

import { PoolStatus } from '../interfaces/pool.status.enum';

export class UpdatePoolDTO {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: Number,
    isArray: true,
    description: "A list of beatmaps id's",
  })
  beatmaps: number[];

  @ApiProperty()
  cover_url: string;

  @ApiProperty()
  status: PoolStatus;
}
