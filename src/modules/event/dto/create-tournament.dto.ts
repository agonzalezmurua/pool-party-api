import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { CreatePoolDTO } from './create-pool.dto';

export class CreateTournamentDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({
    description:
      'Either a ID of an existing Pool, or can create a Pool directly',
    type: 'array',
    items: {
      oneOf: [
        { type: 'number', example: 1 },
        { $ref: getSchemaPath(CreatePoolDTO) },
      ],
    },
  })
  pools: Array<number | CreatePoolDTO>;
}
