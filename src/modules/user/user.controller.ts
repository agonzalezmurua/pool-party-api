import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from './entities/user.entity';
import { UserProviderKind } from './interfaces/user-provider.kind.enum';
import { UserService } from './user.service';

import { ResponseUserDTO } from './dto/response-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiResponse({ status: HttpStatus.OK, type: ResponseUserDTO })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, type: NotFoundException })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<ResponseUserDTO> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }

    return ResponseUserDTO.fromEntity(user);
  }

  @Get('/:provider_kind/:id')
  async findOneByProvider(
    @Param('provider_kind') kind: UserProviderKind,
    @Param('id') id: number,
  ): Promise<User> {
    return this.usersService.findOneByProvider(kind, id);
  }
}
