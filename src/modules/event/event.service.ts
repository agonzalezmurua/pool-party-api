import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Map } from '../beatmapset/entities/map.entity';
import { User } from '../user/entities/user.entity';
import { CreatePoolDTO } from './dto/create-pool.dto';

import { Pool } from './entities/pool.entity';
import { Tournament } from './entities/tournament.entity';
import { PoolStatus } from './interfaces/pool.status.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Pool)
    private poolRepository: Repository<Pool>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  findAllTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  findAllPools(): Promise<Pool[]> {
    return this.poolRepository.find();
  }

  findLatestTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  findLatestPools(): Promise<Pool[]> {
    return this.poolRepository.find();
  }

  findUserTournaments(userId: number): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: { created_by: { id: userId } },
    });
  }

  findUserPools(userId: number): Promise<Pool[]> {
    return this.poolRepository.find({
      where: { created_by: { id: userId } },
    });
  }

  // TODO: Create!!
  // createTournament(): Promise<Tournament> {

  // }

  createPool(payload: CreatePoolDTO, maps: Map[], user: User): Promise<Pool> {
    let status: PoolStatus;

    if (payload.beatmaps.length === 0) {
      status = PoolStatus.draft;
    } else {
      status = PoolStatus.public;
    }

    const entity = this.poolRepository.create({
      cover_url: payload.cover_url,
      created_by: user,
      name: payload.name,
      used_in: [],
      status: status,
      beatmaps: maps,
    });

    console.log(entity);

    return this.poolRepository.save(entity);
  }

  // TODO: Update
  // updateTournament(): Promise<Tournament> {

  // }

  // TODO: Update
  // updatePool(): Promise<Pool> {

  // }

  findTournament(id: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(id);
  }

  findPool(id: number): Promise<Pool> {
    return this.poolRepository.findOne(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.tournamentRepository.delete(id);
  }

  async deletePool(id: number): Promise<void> {
    await this.poolRepository.delete(id);
  }
}
