import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth-payload';
import { OsuAuthGuard } from './guards/osu-auth.guard';

import { UserProviderKind } from '@src/modules/user/interfaces/user-provider.kind.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(OsuAuthGuard)
  @Get('osu')
  @ApiResponse({ status: HttpStatus.TEMPORARY_REDIRECT })
  async osuLogin(): Promise<void> {
    // initiates the Osu OAuth2 login flow
    // does not actually need to do anything here
  }

  @UseGuards(OsuAuthGuard)
  @Get('osu/callback')
  @ApiResponse({ status: HttpStatus.OK, type: AuthPayload })
  async osuLoginCallback(
    @Query('code') code: string, // Injected for swagger clarity, unused directly but required to work
    @Req() req,
  ): Promise<AuthPayload> {
    return await this.authService.login(req.user.osu_id, UserProviderKind.osu);
  }
}
