import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';

import { User } from './entities/user.entity';
import { UserProviderKind } from './interfaces/user-provider.kind.enum';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Get('/:provider_kind/:id')
  async findOneByProvider(
    @Param('provider_kind') kind: UserProviderKind,
    @Param('id') id: number,
  ): Promise<User> {
    return this.usersService.findOneByProvider(kind, id);
  }
}
