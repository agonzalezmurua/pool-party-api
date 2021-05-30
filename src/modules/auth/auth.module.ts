import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../user/user.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { OsuStrategy } from './strategies/osu.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    HttpModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.APP_AUTH_SECRET,
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [AuthService, OsuStrategy, JwtStrategy],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
