import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BeatmapsetService } from '../beatmapset/beatmapset.service';

import { CreatePoolDTO } from './dto/create-pool.dto';
import { ResponsePoolDTO } from './dto/response-pool.dto';
import { UpdatePoolDTO } from './dto/update-pool.dto';
import { PoolStatus } from './interfaces/pool.status.enum';

import { PoolService } from './pool.service';

@ApiTags('Pools')
@Controller('events/pools')
export class PoolController {
  constructor(
    private poolService: PoolService,
    private beatmapsetService: BeatmapsetService,
  ) {}

  //#region Pools
  // TODO: Add query
  @ApiOkResponse({ type: [ResponsePoolDTO] })
  @Get('/')
  async searchPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findAllPools();
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiOkResponse({ type: [ResponsePoolDTO] })
  @Get('/latest')
  async getLatestPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findAllPools();
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiOkResponse({ type: [ResponsePoolDTO] })
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/mine')
  async getUserPools(
    @Req() request: Express.Request,
  ): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findUserPools(request.user.id);
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiOkResponse({ type: ResponsePoolDTO })
  @Get('/:id')
  async findPool(@Param('id') id: number): Promise<ResponsePoolDTO> {
    const entity = await this.poolService.findPool(id);
    return ResponsePoolDTO.fromEntity(entity);
  }

  @ApiOkResponse({ type: ResponsePoolDTO })
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createPool(
    @Body() payload: CreatePoolDTO,
    @Req() request: Express.Request,
  ) {
    if (
      (await this.beatmapsetService.doesAllMapsExist(payload.beatmaps)) ===
      false
    ) {
      throw new BadRequestException('Not all maps exist');
    }

    const entity = await this.poolService.createPool(payload, request.user);

    return ResponsePoolDTO.fromEntity(entity);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updatePool(
    @Param('id') poolId: number,
    @Body() dto: UpdatePoolDTO,
    @Req() request: Express.Request,
  ): Promise<ResponsePoolDTO> {
    if (
      (await this.poolService.doesUserOwnPool(request.user.id, poolId)) ===
      false
    ) {
      throw new UnauthorizedException();
    }

    if (
      (await this.beatmapsetService.doesAllMapsExist(dto.beatmaps)) === false
    ) {
      // TODO: add some kind of i18n or way to handle error messages by not hard coding
      throw new BadRequestException('Not all maps exist');
    }

    const entity = await this.poolService.updatePool(poolId, dto);

    return ResponsePoolDTO.fromEntity(entity);
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePool(
    @Param('id') id: number,
    @Req() request: Express.Request,
  ): Promise<void> {
    const entity = await this.poolService.findPool(id);

    if (entity.created_by.id !== request.user.id) {
      throw new UnauthorizedException();
    }

    if (
      [PoolStatus.public].includes(entity.status) ||
      entity.used_in.length >= 1
    ) {
      throw new BadRequestException();
    }

    return this.poolService.deletePool(id);
  }
  //#endregion Pools
}
