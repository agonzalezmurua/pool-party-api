import { ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { CreatePoolDTO } from './create-pool.dto';

export class CreateTournamentDTO {
  name: string;

  cover_url: string;

  /** Array of user id's or new pools */
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        { type: 'number', example: 1 },
        { $ref: getSchemaPath(CreatePoolDTO) },
      ],
    },
  })
  pools: Array<number | CreatePoolDTO>;

  /** Array of user id's */
  collaborators: number[] = [];
}
