import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSetDTO } from './dto/create-set.dto';

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

  findOneSet(id: number): Promise<Set> {
    return this.setRepository.findOne(id);
  }

  deleteOneSet(id: number) {
    return this.mapRepository.delete(id);
  }

  async findMapsByIds(ids: number[]): Promise<Map[]> {
    return this.mapRepository.findByIds(ids);
  }

  async createOne(payload: CreateSetDTO): Promise<Set> {
    const maps: Map[] = payload.maps.map((map) =>
      this.mapRepository.create({
        accuracy: map.accuracy,
        approach_rate: map.approach_rate,
        bpm: map.bpm,
        circle_size: map.circle_size,
        drain_rate: map.drain_rate,
        mode: map.mode,
        osu_id: map.osu_id,
        status: map.status,
        total_length: map.total_length,
        version: map.version,
      }),
    );

    const set = this.setRepository.create({
      artist: payload.artist,
      cover_url: payload.cover_url,
      osu_id: payload.osu_id,
      pool_tags: payload.pool_tags,
      status: payload.status,
      title: payload.title,
      osu_user_id: payload.osu_user_id,
      submited_date: payload.submitted_date,
      maps: maps,
    });

    return this.setRepository.save(set);
  }
}
