import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TournamentService } from './tournament.service';

import { ResponseTournamentDTO } from './dto/response-tournament.dto';
import { CreateTournamentDTO } from './dto/create-tournament.dto';
import { UpdateTournamentDTO } from './dto/update-tournament.dto';

@ApiTags('Tournaments')
@Controller('events/tournaments')
export class TournamentController {
  constructor(private tournamentService: TournamentService) {}

  // TODO: Add query
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/')
  async searchTournaments(): Promise<ResponseTournamentDTO[]> {
    const entities = await this.tournamentService.findAllTournaments();
    return entities.map(ResponseTournamentDTO.fromEntity);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseTournamentDTO,
    isArray: true,
  })
  @Get('/latest')
  async getLatestTournaments(): Promise<ResponseTournamentDTO[]> {
    const entities = await this.tournamentService.findAllTournaments();
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
    const entities = await this.tournamentService.findUserTournaments(
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
    const entity = await this.tournamentService.findTournament(id);
    return ResponseTournamentDTO.fromEntity(entity);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createTournament(
    @Body() payload: CreateTournamentDTO,
    @Req() request: Express.Request,
  ): Promise<ResponseTournamentDTO> {
    const entity = await this.tournamentService.createTournament(
      payload,
      request.user.id,
    );

    return ResponseTournamentDTO.fromEntity(entity);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTournament(
    @Param('id') id: number,
    @Req() request: Express.Request,
  ): Promise<void> {
    if (
      (await this.tournamentService.doesUserOwnTournament(
        request.user.id,
        id,
      )) === false
    ) {
      throw new NotFoundException();
    }

    await this.tournamentService.deleteTournament(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateTournament(
    @Param('id') id: number,
    @Body() dto: UpdateTournamentDTO,
    @Req() request: Express.Request,
  ): Promise<ResponseTournamentDTO> {
    if (
      (await this.tournamentService.doesUserOwnTournament(
        request.user.id,
        id,
      )) === false
    ) {
      throw new NotFoundException();
    }

    const entity = await this.tournamentService.updateTournament(
      id,
      dto,
      request.user.id,
    );

    return ResponseTournamentDTO.fromEntity(entity);
  }
}
