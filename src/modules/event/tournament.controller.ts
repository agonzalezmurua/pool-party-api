import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TournamentService } from './tournament.service';

import { ResponseTournamentDTO } from './dto/response-tournament.dto';

@ApiTags('Tournaments')
@Controller('events/tournaments')
export class TournamentController {
  constructor(private eventService: TournamentService) {}

  // TODO: Add query
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/')
  async searchTournaments(): Promise<ResponseTournamentDTO[]> {
    const entities = await this.eventService.findAllTournaments();
    return entities.map(ResponseTournamentDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/latest')
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
  @Get('/mine')
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
  @Get('/:id')
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
}
