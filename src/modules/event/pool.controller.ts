import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
    isArray: true,
  })
  @Get('/')
  async searchPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findAllPools();
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
    isArray: true,
  })
  @Get('/latest')
  async getLatestPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findAllPools();
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/mine')
  async getUserPools(
    @Req() request: Express.Request,
  ): Promise<ResponsePoolDTO[]> {
    const entities = await this.poolService.findUserPools(request.user.id);
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
  })
  @Get('/:id')
  async findPool(@Param('id') id: number): Promise<ResponsePoolDTO> {
    const entity = await this.poolService.findPool(id);
    return ResponsePoolDTO.fromEntity(entity);
  }

  @ApiResponse({ status: HttpStatus.OK, type: ResponsePoolDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST })
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
      // TODO: add some kind of i18n or way to handle error messages by not hard coding
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
