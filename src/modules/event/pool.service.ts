import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Map } from '../beatmapset/entities/map.entity';
import { User } from '../user/entities/user.entity';

import { CreatePoolDTO } from './dto/create-pool.dto';
import { UpdatePoolDTO } from './dto/update-pool.dto';
import { Pool } from './entities/pool.entity';
import { PoolStatus } from './interfaces/pool.status.enum';

@Injectable()
export class PoolService {
  constructor(
    @InjectRepository(Pool)
    private repo: Repository<Pool>,
  ) {}

  async findAllPools(): Promise<Pool[]> {
    return this.repo.find();
  }

  async findLatestPools(): Promise<Pool[]> {
    return this.repo.find();
  }

  async findUserPools(userId: number): Promise<Pool[]> {
    return this.repo.find({
      where: { created_by: { id: userId } },
    });
  }

  async createPool(
    payload: CreatePoolDTO,
    maps: Map[],
    user: User,
  ): Promise<Pool> {
    let status: PoolStatus;

    if (payload.beatmaps.length === 0) {
      status = PoolStatus.draft;
    } else {
      status = PoolStatus.public;
    }

    const entity = this.repo.create({
      cover_url: payload.cover_url,
      created_by: user,
      name: payload.name,
      used_in: [],
      status: status,
      beatmaps: maps,
    });

    return this.repo.save(entity);
  }
  async doesUserOwnPool(userId: number, poolId: number): Promise<boolean> {
    const entity = await this.repo.findOne({
      where: { id: poolId, created_by: { id: userId } },
    });
    return entity !== null;
  }

  // TODO: Update
  async updatePool(id: number, pool: UpdatePoolDTO): Promise<Pool> {
    const entity = await this.repo.findOne(id);

    entity.beatmaps = pool.beatmaps.map((id) => ({ id } as Map));
    entity.cover_url = pool.cover_url;
    entity.name = pool.name;
    entity.status = pool.status;

    await this.repo.save(entity);

    return this.repo.findOne(id);
  }

  findPool(id: number): Promise<Pool> {
    return this.repo.findOne(id);
  }

  async deletePool(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
