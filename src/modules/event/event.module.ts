import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeatmapsetModule } from '../beatmapset/beatmapset.module';

import { Pool } from './entities/pool.entity';
import { Tournament } from './entities/tournament.entity';

import { TournamentController } from './tournament.controller';
import { TournamentService } from './tournament.service';

import { PoolController } from './pool.controller';
import { PoolService } from './pool.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, Tournament]), BeatmapsetModule],
  controllers: [TournamentController, PoolController],
  providers: [TournamentService, PoolService],
})
export class EventModule {}
