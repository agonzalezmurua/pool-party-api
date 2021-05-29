import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeatmapController } from './beatmapset.controller';
import { BeatmapsetService } from './beatmapset.service';

import { Map } from './entities/map.entity';
import { Set } from './entities/set.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Set, Map])],
  providers: [BeatmapsetService],
  controllers: [BeatmapController],
})
export class BeatmapsetModule {}
