import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { BeatmapsetService } from './beatmapset.service';

import { OsuService } from '../osu/osu.service';
import { PreviewSetDTO } from './dto/preview-set.dto';
import { ResponseSetDTO } from './dto/response-set.dto';
import { QueryFailedError } from 'typeorm';

@ApiTags('beatmapset')
@Controller('beatmapset')
export class BeatmapController {
  constructor(
    private readonly beatmapService: BeatmapsetService,
    private readonly osuService: OsuService,
  ) {}

  @Get()
  async searchSets(): Promise<ResponseSetDTO[]> {
    const entities = await this.beatmapService.findAllSets();
    return entities.map(ResponseSetDTO.fromEntity);
  }

  @Get('/latest')
  async searchLatestSets(): Promise<ResponseSetDTO[]> {
    const entities = await this.beatmapService.findAllSets();
    return entities.map(ResponseSetDTO.fromEntity);
  }

  @ApiNotFoundResponse()
  @Get('/preview/:osu_id')
  async previewSet(@Param('osu_id') id: number): Promise<PreviewSetDTO> {
    const entity = await this.osuService.getBeatmapset(id);

    if (entity === undefined) {
      throw new NotFoundException();
    }

    return PreviewSetDTO.fromOsu(entity);
  }

  @ApiNotFoundResponse()
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<ResponseSetDTO> {
    const entity = await this.beatmapService.findOneSet(id);

    if (entity === undefined) {
      throw new NotFoundException();
    }

    return ResponseSetDTO.fromEntity(entity);
  }

  @ApiBadRequestResponse()
  @Post('/import/:osu_id')
  async importOne(@Param('osu_id') id: number): Promise<ResponseSetDTO> {
    try {
      const beatmapset = await this.osuService.getBeatmapset(id);

      const dto = PreviewSetDTO.fromOsu(beatmapset);

      const entity = await this.beatmapService.createOne(dto);

      return ResponseSetDTO.fromEntity(entity);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException();
      }
    }
  }

  // TODO: validate that only admin or moderator can delete
  @Delete('/:id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.beatmapService.deleteOneSet(id);
  }
}
