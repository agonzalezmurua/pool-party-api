import { IsNotEmpty, IsNumber, IsUrl, MaxLength } from 'class-validator';

export class CreateTournamentDTO {
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @MaxLength(1024)
  @IsNotEmpty()
  @IsUrl()
  cover_url: string;

  /** Array of user id's or new pools */
  @IsNumber({}, { each: true })
  pools?: number[] = [];

  /** Array of user id's */
  @IsNumber({}, { each: true })
  collaborators?: number[] = [];
}
