import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tournament } from './entities/tournament.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  findAllTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  findLatestTournaments(): Promise<Tournament[]> {
    return this.tournamentRepository.find();
  }

  findUserTournaments(userId: number): Promise<Tournament[]> {
    return this.tournamentRepository.find({
      where: { created_by: { id: userId } },
    });
  }

  // TODO: Create!!
  // createTournament(): Promise<Tournament> {

  // }

  // TODO: Update
  // updateTournament(): Promise<Tournament> {

  // }

  findTournament(id: number): Promise<Tournament> {
    return this.tournamentRepository.findOne(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.tournamentRepository.delete(id);
  }
}
