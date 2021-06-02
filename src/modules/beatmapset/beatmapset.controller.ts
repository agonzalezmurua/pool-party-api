import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BeatmapsetService } from './beatmapset.service';

import { OsuService } from '../osu/osu.service';
import { BeatmapSet } from '../osu/interfaces/Beatmap-set.type';
import { CreateSetDTO } from './dto/create-set.dto';

@ApiTags('beatmapset')
@Controller('beatmapset')
export class BeatmapController {
  constructor(
    private readonly beatmapService: BeatmapsetService,
    private readonly osuService: OsuService,
  ) {}

  private transformBeatmapsetToSet(beatmapset: BeatmapSet): CreateSetDTO {
    return {
      artist: beatmapset.artist,
      cover_url: beatmapset.covers['cover@2x'],
      submitted_date: new Date(String(beatmapset.submitted_date)),
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
      osu_user_id: beatmapset.user_id,
    };
  }

  @Get()
  async searchSets() {
    return this.beatmapService.findAllSets();
  }

  @Get('/latest')
  async searchLatestSets() {
    return this.beatmapService.findAllSets();
  }

  @ApiResponse({ status: HttpStatus.OK, type: CreateSetDTO })
  @Get('/preview/:osu_id')
  async previewSet(@Param('osu_id') id: number): Promise<CreateSetDTO> {
    const beatmapset = await this.osuService.getBeatmapset(id);

    return this.transformBeatmapsetToSet(beatmapset);
  }

  @Get('/:id')
  async findById(@Param('id') id: number) {
    return this.beatmapService.findOneSet(id);
  }

  @Post('/import/:osu_id')
  async importOne(@Param('osu_id') id: number) {
    const beatmapset = await this.osuService.getBeatmapset(id);

    return this.beatmapService.createOne(
      this.transformBeatmapsetToSet(beatmapset),
    );
  }

  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    return this.beatmapService.deleteOneSet(id);
  }
}
