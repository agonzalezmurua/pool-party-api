import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './modules/user/user.module';
import { BeatmapsetModule } from './modules/beatmapset/beatmapset.module';
import { EventModule } from './modules/event/event.module';
import { AuthService } from './modules/auth/auth.service';
import { AuthModule } from './modules/auth/auth.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    BeatmapsetModule,
    EventModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
