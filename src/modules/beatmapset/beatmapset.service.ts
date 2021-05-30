import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Map } from './entities/map.entity';
import { Set } from './entities/set.entity';

@Injectable()
export class BeatmapsetService {
  constructor(
    @InjectRepository(Set)
    private setRepository: Repository<Set>,
    @InjectRepository(Map)
    private mapRepository: Repository<Map>,
  ) {}

  findAllSets(): Promise<Set[]> {
    return this.setRepository.find();
  }

  findAllMaps(): Promise<Map[]> {
    return this.mapRepository.find();
  }
}
