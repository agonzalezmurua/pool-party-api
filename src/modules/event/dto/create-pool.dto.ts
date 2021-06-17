import { IsArray, IsNotEmpty, IsUrl } from 'class-validator';

export class CreatePoolDTO {
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly beatmaps: number[];

  @IsUrl()
  readonly cover_url: string;
}
