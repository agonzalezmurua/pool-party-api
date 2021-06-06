import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { BeatmapsetService } from './beatmapset.service';

import { OsuService } from '../osu/osu.service';
import { CreateSetDTO } from './dto/create-set.dto';
import { ResponseSetDTO } from './dto/response-set.dto';

@ApiTags('beatmapset')
@Controller('beatmapset')
export class BeatmapController {
  constructor(
    private readonly beatmapService: BeatmapsetService,
    private readonly osuService: OsuService,
  ) {}

  @ApiResponse({ status: HttpStatus.OK, type: ResponseSetDTO, isArray: true })
  @Get()
  async searchSets(): Promise<ResponseSetDTO[]> {
    const entities = await this.beatmapService.findAllSets();
    return entities.map(ResponseSetDTO.fromEntity);
  }

  @ApiResponse({ status: HttpStatus.OK, type: ResponseSetDTO, isArray: true })
  @Get('/latest')
  async searchLatestSets(): Promise<ResponseSetDTO[]> {
    const entities = await this.beatmapService.findAllSets();
    return entities.map(ResponseSetDTO.fromEntity);
  }

  @ApiResponse({ status: HttpStatus.OK, type: CreateSetDTO })
  @Get('/preview/:osu_id')
  async previewSet(@Param('osu_id') id: number): Promise<CreateSetDTO> {
    const entity = await this.osuService.getBeatmapset(id);

    return CreateSetDTO.fromEntity(entity);
  }

  @ApiResponse({ status: HttpStatus.OK, type: ResponseSetDTO })
  @Get('/:id')
  async findById(@Param('id') id: number): Promise<ResponseSetDTO> {
    const entity = await this.beatmapService.findOneSet(id);

    if (!entity) {
      throw new NotFoundException();
    }
    return ResponseSetDTO.fromEntity(entity);
  }

  @ApiResponse({ status: HttpStatus.CREATED, type: ResponseSetDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
  @Post('/import/:osu_id')
  async importOne(@Param('osu_id') id: number): Promise<CreateSetDTO> {
    const entity = await this.osuService.getBeatmapset(id);

    return CreateSetDTO.fromEntity(entity);
  }

  // TODO: validate that only admin or moderator can delete
  @ApiResponse({ status: HttpStatus.OK })
  @Delete('/:id')
  async deleteOne(@Param('id') id: number) {
    return this.beatmapService.deleteOneSet(id);
  }
}
