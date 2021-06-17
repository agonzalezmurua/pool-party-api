import { DeepPartial } from 'typeorm';

import { CreatePoolDTO } from '../dto/create-pool.dto';
import { Pool } from '../entities/pool.entity';
import { PoolStatus } from '../interfaces/pool.status.enum';

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

export function MapPoolRelationToPartial(id: number): DeepPartial<Pool> {
  return {
    id: id,
  };
}

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
