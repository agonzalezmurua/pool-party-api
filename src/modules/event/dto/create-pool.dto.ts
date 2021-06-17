import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreatePoolDTO {
  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  readonly name: string;

  /** A list of beatmaps id's */
  @IsNumber({}, { each: true })
  readonly beatmaps: number[];

  @MaxLength(1024)
  @IsNotEmpty()
  @IsUrl()
  readonly cover_url: string;
}
