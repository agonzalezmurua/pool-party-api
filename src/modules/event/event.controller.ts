import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventService } from './event.service';

import { ResponseTournamentDTO } from './dto/response-tournament.dto';
import { ResponsePoolDTO } from './dto/response-pool.dto';
import { CreatePoolDTO } from './dto/create-pool.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private eventService: EventService) {}

  // TODO: Add query
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/tournaments')
  async searchTournaments(): Promise<ResponseTournamentDTO[]> {
    const entities = await this.eventService.findAllTournaments();
    return entities.map(ResponseTournamentDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/tournaments/latest')
  async getLatestTournaments(): Promise<ResponseTournamentDTO[]> {
    const entities = await this.eventService.findAllTournaments();
    return entities.map(ResponseTournamentDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/tournaments/mine')
  async getUserTournaments(
    @Req() request: Express.Request,
  ): Promise<ResponseTournamentDTO[]> {
    const entities = await this.eventService.findUserTournaments(
      request.user.id,
    );
    return entities.map(ResponseTournamentDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
  })
  @Get('/tournaments/:id')
  async findTournament(
    @Param('id') id: number,
  ): Promise<ResponseTournamentDTO> {
    const entity = await this.eventService.findTournament(id);
    return ResponseTournamentDTO.fromEntity(entity);
  }

  // TODO: Creation flow
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('/tournaments)
  // async createTournament(@Req() request: Express.Request): Promise<ResponseTournamentDTO> {
  //   return this.eventService.createTournament();
  // }

  // TODO: Update flow
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post(/tournaments/:id)
  // async updateTournament(@Req() request: Express.Request) {
  //   return this.eventService.createTournament();
  // }

  // TODO: Add query
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
    isArray: true,
  })
  @Get('/pools')
  async searchPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.eventService.findAllPools();
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
    isArray: true,
  })
  @Get('/pools/latest')
  async getLatestPools(): Promise<ResponsePoolDTO[]> {
    const entities = await this.eventService.findAllPools();
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
  @Get('/pools/mine')
  async getUserPools(
    @Req() request: Express.Request,
  ): Promise<ResponsePoolDTO[]> {
    const entities = await this.eventService.findUserPools(request.user.id);
    return entities.map(ResponsePoolDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponsePoolDTO,
  })
  @Get('/pools/:id')
  async findPool(@Param('id') id: number): Promise<ResponsePoolDTO> {
    const entity = await this.eventService.findPool(id);
    return ResponsePoolDTO.fromEntity(entity);
  }

  // TODO: Creation flow
  @ApiResponse({ status: HttpStatus.OK, type: ResponsePoolDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/pools')
  async createPool(
    @Body() create: CreatePoolDTO,
    @Req() request: Express.Request,
  ) {
    const entity = await this.eventService.createPool(create, request.user);

    return ResponsePoolDTO.fromEntity(entity);
  }

  // TODO: Update flow
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @Post('/pools/:id)
  // async updatePool(@Req() request: Express.Request) {
  //   return this.eventService.createTournament();
  // }
}
