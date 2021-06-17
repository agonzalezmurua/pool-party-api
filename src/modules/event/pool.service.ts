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

  async createPool(dto: CreatePoolDTO, user: User): Promise<Pool> {
    let status: PoolStatus;

    if (dto.beatmaps.length === 0) {
      status = PoolStatus.draft;
    } else {
      status = PoolStatus.public;
    }

    const entity = this.repo.create({
      beatmaps: dto.beatmaps.map((b) => ({ id: b })),
      cover_url: dto.cover_url,
      name: dto.name,
      created_by: user,
      used_in: [],
      status: status,
    });

    return this.repo.save(entity);
  }
  async doesUserOwnPool(userId: number, poolId: number): Promise<boolean> {
    const entity = await this.repo.findOne({
      where: { id: poolId, created_by: { id: userId } },
    });
    return entity !== null;
  }

  async updatePool(poolId: number, dto: UpdatePoolDTO): Promise<Pool> {
    const entity = await this.repo.findOne(poolId);

    const merged = this.repo.merge(entity, {
      beatmaps: dto.beatmaps.map((b) => ({ id: b } as Map)),
      cover_url: dto.cover_url,
      name: dto.name,
      status: dto.status,
    });

    return this.repo.save(merged);
  }

  findPool(id: number): Promise<Pool> {
    return this.repo.findOne(id);
  }

  async deletePool(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
