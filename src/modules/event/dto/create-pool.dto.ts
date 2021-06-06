import { ApiProperty } from '@nestjs/swagger';

export class CreatePoolDTO {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number, isArray: true })
  beatmaps: number[];

  @ApiProperty()
  cover_url: string;
}
