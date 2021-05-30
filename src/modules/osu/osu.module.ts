import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { OsuService } from './osu.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        baseURL:
          config.get<string>('osu.url') + config.get<string>('osu.api_path'),
      }),
    }),
  ],
  providers: [OsuService],
  exports: [OsuService],
})
export class OsuModule {}
