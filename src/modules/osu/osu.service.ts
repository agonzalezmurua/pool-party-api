import { HttpService, Injectable } from '@nestjs/common';
import { BeatmapSet } from './interfaces/Beatmap-set.type';

@Injectable()
export class OsuService {
  constructor(private http: HttpService) {}

  findOne(id: number) {
    return this.http.get<BeatmapSet>(`/beatmap/${id}`);
  }
}
