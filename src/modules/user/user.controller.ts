import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UserProviderKind } from './interfaces/user-provider.kind.enum';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<User> {
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
