import { User } from '../entities/user.entity';

export class ResponseUserDTO {
  id: number;

  username: string;

  active: boolean;

  avatar_url: string;

  cover_url: string;

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
