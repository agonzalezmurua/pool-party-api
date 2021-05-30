import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeatmapsetService } from './beatmapset.service';

@ApiTags('beatmap')
@Controller('beatmap')
export class BeatmapController {
  constructor(private readonly appService: BeatmapsetService) {}
}
