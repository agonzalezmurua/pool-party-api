import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pool } from './entities/pool.entity';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Pool)
    private poolRepository: Repository<Pool>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}
}
