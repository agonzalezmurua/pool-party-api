import { DeepPartial } from 'typeorm';

import { CreatePoolDTO } from '../dto/create-pool.dto';
import { Pool } from '../entities/pool.entity';
import { PoolStatus } from '../interfaces/pool.status.enum';

/**
 * Converts a Create Pool DTO into a Partial Pool entity
 * @param pool DTO object
 * @param owner ID of the user
 * @returns Partial Entity
 */
export function MapCreatePoolToPartial(
  pool: CreatePoolDTO,
  owner: number,
): DeepPartial<Pool> {
  return {
    beatmaps: pool.beatmaps,
    cover_url: pool.cover_url,
    name: pool.name,
    status: PoolStatus.public,
    created_by: { id: owner },
    used_in: [],
  } as DeepPartial<Pool>;
}

/**
 * Converts a Pool ID into a Partial Pool Entity
 * @param id Pool ID
 * @returns Partial Pool Entity
 */
export function MapPoolRelationToPartial(id: number): DeepPartial<Pool> {
  return {
    id: id,
  };
}

/**
 * Converts either a Pool ID or Create Pool DTO into a Partial Pool Entity
 * @param id Pool ID
 * @returns Partial Pool Entity
 */
export function MapPoolCreateOrRelationToPartial(
  pool: number | CreatePoolDTO,
  owner?: number,
) {
  if (typeof pool === 'number') {
    return MapPoolRelationToPartial(pool);
  } else if (typeof pool === 'number' && typeof owner === 'number') {
    return MapCreatePoolToPartial(pool, owner);
  }

  throw new Error('Mapper.MalformedParameters');
}
