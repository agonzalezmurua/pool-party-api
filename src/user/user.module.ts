import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './user.controller';
import { UsersService } from './user.service';

import { User } from './entities/user.entity';
import { UserProvider } from './entities/user-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProvider])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
