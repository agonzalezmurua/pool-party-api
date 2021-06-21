import { HttpService, Injectable } from '@nestjs/common';

import { handleExpiredToken } from './http.interceptors';

import { BeatmapSet } from './interfaces/Beatmap-set.type';
import { GameMode } from './interfaces/gamemode.type';
import { User } from './interfaces/user.type';

@Injectable()
export class OsuService {
  constructor(private http: HttpService) {
    const [onresolved, onerror] = handleExpiredToken(this.http.axiosRef);

    this.http.axiosRef.interceptors.response.use(onresolved, onerror);
  }

  public async getBeatmapset(id: number): Promise<BeatmapSet> {
    return (await this.http.get<BeatmapSet>(`/beatmapsets/${id}`).toPromise())
      .data;
  }

  public async getUser(id: number, mode?: GameMode): Promise<User> {
    return (await this.http.get<User>(`/users/${id}/${mode}`).toPromise()).data;
  }
}
