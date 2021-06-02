import { ApiProperty } from '@nestjs/swagger';

import { Tags } from '../interfaces/tags.enum';
import { CreateMapDTO } from './create-map.dto';

export class CreateSetDTO {
  @ApiProperty()
  osu_id: number;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty()
  pool_tags: Tags[];

  @ApiProperty()
  maps: CreateMapDTO[];

  @ApiProperty()
  osu_user_id: number;

  @ApiProperty()
  submitted_date: Date;
}
