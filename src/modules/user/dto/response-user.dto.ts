import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class ResponseUserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  avatar_url: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty()
  country_code: string;

  static fromEntity(entity: User): ResponseUserDTO {
    return {
      active: entity.active,
      avatar_url: entity.avatar_url,
      country_code: entity.country_code,
      cover_url: entity.cover_url,
      id: entity.id,
      username: entity.username,
    };
  }
}
