import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { User } from './entities/user.entity';
import { UserProvider } from './entities/user-provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProvider])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
