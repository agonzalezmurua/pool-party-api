import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserProviderKind } from '../user/interfaces/user-provider.kind.enum';

import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth-payload';
import { OsuAuthGuard } from './guards/osu-auth.guard';

@ApiTags('Authentication')
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
    @Req() req: Express.Request,
  ): Promise<AuthPayload> {
    const { provider_id } = req.user.providers.find(
      (p) => p.kind === UserProviderKind.osu,
    );
    return await this.authService.login(
      Number(provider_id),
      UserProviderKind.osu,
    );
  }
}
