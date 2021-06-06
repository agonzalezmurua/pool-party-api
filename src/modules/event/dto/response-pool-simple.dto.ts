import { ApiProperty } from '@nestjs/swagger';
import { Pool } from '../entities/pool.entity';
import { PoolStatus } from '../interfaces/pool.status.enum';

/** Simplified response, without any relationship */
export class ResponsePoolSimpleDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cover_url: string;

  @ApiProperty({ enum: PoolStatus })
  status: PoolStatus;

  static fromEntity(entity: Pool): ResponsePoolSimpleDTO {
    return {
      cover_url: entity.cover_url,
      id: entity.id,
      name: entity.name,
      status: entity.status,
    };
  }
}
