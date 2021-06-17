import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { TournamentStatus } from '../interfaces/tournament.status.enum';
import { CreatePoolDTO } from './create-pool.dto';

export class UpdateTournamentDTO {
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
        {
          $ref: getSchemaPath(CreatePoolDTO),
          example: {
            beatmaps: [1],
            cover_url:
              'https://icountryschool.cl/wp-content/uploads/2020/08/placeholder.png',
            name: 'TEST',
          },
        },
      ],
    },
  })
  pools: Array<number | CreatePoolDTO>;

  @ApiProperty({ enum: TournamentStatus })
  status: TournamentStatus;
}
