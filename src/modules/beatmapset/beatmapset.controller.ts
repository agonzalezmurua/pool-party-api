import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BeatmapsetService } from './beatmapset.service';

import { OsuService } from '../osu/osu.service';

@ApiTags('beatmapset')
@Controller('beatmapset')
export class BeatmapController {
  constructor(
    private readonly beatmapService: BeatmapsetService,
    private readonly osuService: OsuService,
  ) {}

  @Get()
  async searchSets() {
    return this.beatmapService.findAllSets();
  }

  @Get('/latest')
  async searchLatestSets() {
    return this.beatmapService.findAllSets();
  }

  // TODO: do this
  // @Get('/preview')
  // async previewSet() {
  //   return this.osuService.preview();
  // }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.beatmapService.findOneSet(id);
  }

  @Post('/import/:osu_id')
  async importOne(@Param('osu_id') id: number) {
    const { data: beatmapset } = await await this.osuService
      .findOne(id)
      .toPromise();

    return this.beatmapService.createOne({
      artist: beatmapset.artist,
      cover_url: beatmapset.covers['cover@2x'],
      maps:
        beatmapset.beatmaps?.map((beatmap) => ({
          accuracy: beatmap.accuracy,
          approach_rate: beatmap.ar,
          bpm: beatmap.bpm,
          circle_size: beatmap.cs,
          drain_rate: beatmap.drain,
          osu_id: beatmap.id,
          status: beatmap.status,
          total_length: beatmap.total_length,
          version: beatmap.version,
          mode: beatmap.mode,
        })) || [],
      osu_id: beatmapset.id,
      pool_tags: [],
      status: beatmapset.status,
      title: beatmapset.title,
      // TODO: Grab user from session
      osu_user_id: beatmapset.user_id,
    });
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    return this.beatmapService.deleteOneSet(id);
  }
}
