import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDTO } from '@src/modules/user/dto/create-user.dto';
import { User } from '@src/modules/user/entities/user.entity';
import { UserService } from '@src/modules/user/user.service';
import { AuthPayload } from './dto/auth-payload';

import { UserProviderKind } from '@src/modules/user/interfaces/user-provider.kind.enum';
import { JwtPayload } from './interfaces/jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(input: CreateUserDTO): Promise<User> {
    return await this.usersService.createOne(input);
  }

  async login(id: number, provider: UserProviderKind): Promise<AuthPayload> {
    let user: User;
    switch (provider) {
      case UserProviderKind.osu:
        user = await this.usersService.findOneByProvider(provider, id);
        break;
      default:
        break;
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    const authResponse = new AuthPayload();

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    authResponse.access_token = this.jwtService.sign(payload);
    authResponse.expires_in = 1000 * 60 * 60 * 24;
    authResponse.token_type = 'Bearer';

    return authResponse;
  }
}
