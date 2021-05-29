import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventController } from './event.controller';
import { EventService } from './event.service';

import { Pool } from './entities/pool.entity';
import { Tournament } from './entities/tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pool, Tournament])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
