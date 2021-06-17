import { Pool } from '../entities/pool.entity';
import { PoolStatus } from '../interfaces/pool.status.enum';

/** Simplified response, without any relationship */
export class ResponsePoolSimpleDTO {
  /** Unique identifier */
  id: number;

  name: string;

  cover_url: string;

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
