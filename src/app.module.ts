import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Map } from './beatmapset/entities/map.entity';
import { Set } from './beatmapset/entities/set.entity';
import { User } from './user/entities/user.entity';

import { UsersModule } from './user/user.module';
import { BeatmapsetModule } from './beatmapset/beatmapset.module';
import { EventModule } from './event/event.module';
import { Pool } from './event/entities/pool.entity';
import { Tournament } from './event/entities/tournament.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    BeatmapsetModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
