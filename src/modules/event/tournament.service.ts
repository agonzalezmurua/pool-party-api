import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTournamentDTO } from './dto/create-tournament.dto';
import { UpdateTournamentDTO } from './dto/update-tournament.dto';
import { Pool } from './entities/pool.entity';

import { Tournament } from './entities/tournament.entity';
import { TournamentStatus } from './interfaces/tournament.status.enum';
import { MapPoolCreateOrRelationToPartial } from './mappers/pool.mappers';
import { MapCollaboratorRelationToPartial } from './mappers/tournament.mappers';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private repo: Repository<Tournament>,
  ) {}

  async findAllTournaments(): Promise<Tournament[]> {
    return this.repo.find();
  }

  async findLatestTournaments(): Promise<Tournament[]> {
    return this.repo.find();
  }

  async findUserTournaments(userId: number): Promise<Tournament[]> {
    return this.repo.find({
      where: { created_by: { id: userId } },
    });
  }

  async createTournament(
    dto: CreateTournamentDTO,
    owner: number,
  ): Promise<Tournament> {
    const entity = this.repo.create({
      name: dto.name,
      cover_url: dto.cover_url,
      status: TournamentStatus.inactive,
      created_by: { id: owner },
      pools: dto.pools.map((pool) =>
        MapPoolCreateOrRelationToPartial(pool, owner),
      ),
      collaborators: dto.collaborators.map((user) =>
        MapCollaboratorRelationToPartial(user),
      ),
    });

    await this.repo.save(entity);

    return this.repo.findOne(entity.id);
  }

  async doesUserOwnTournament(userId: number, tournamentId: number) {
    const entity = await this.repo.findOne({
      where: { created_by: { id: userId }, id: tournamentId },
    });
    return entity !== null;
  }

  async updateTournament(
    id: number,
    dto: UpdateTournamentDTO,
    owner: number,
  ): Promise<Tournament> {
    const entity = await this.repo.findOne(id);
    const merged = this.repo.merge(entity, {
      status: dto.status,
      name: dto.name,
      cover_url: dto.cover_url,
      collaborators: dto.collaborators.map((user) =>
        MapCollaboratorRelationToPartial(user),
      ),
    });

    // We dont add pools onto the merge operation since it's always additive, it does reduces the size of the array
    merged.pools = dto.pools.map(
      (pool) => MapPoolCreateOrRelationToPartial(pool, owner) as Pool,
    );

    await this.repo.save(merged);

    // Return updated entity
    return await this.repo.findOne(id);
  }

  async findTournament(id: number): Promise<Tournament> {
    return this.repo.findOne(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
