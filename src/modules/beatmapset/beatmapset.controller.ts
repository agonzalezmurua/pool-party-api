import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeatmapsetService } from './beatmapset.service';
import { CreateSetDTO } from './dto/create-set.dto';

@ApiTags('beatmap')
@Controller('beatmap')
export class BeatmapController {
  constructor(private readonly beatmapService: BeatmapsetService) {}

  @Get()
  searchSets() {
    return this.beatmapService.findAllSets();
  }

  @Get('/latest')
  searchLatestSets() {
    return this.beatmapService.findAllSets();
  }

  @Get('/preview')
  previewSet() {
    return this.osuService.preview();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.beatmapService.findOneSet(id);
  }

  @Post('/')
  createOne(@Body payload: CreateSetDTO) {
    return this.beatmapService.createOne(payload);
  }

  @Delete('/:id')
  deleteOne(@Param('id') id: number) {
    return this.beatmapService.delete(id);
  }
}
