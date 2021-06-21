import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OsuService } from './osu.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          baseURL:
            config.get<string>('osu.url') + config.get<string>('osu.api_path'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [OsuService],
  exports: [OsuService],
})
export class OsuModule {}
