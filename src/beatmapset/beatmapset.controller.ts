import { Controller } from '@nestjs/common';
import { BeatmapsetService } from './beatmapset.service';

@Controller()
export class BeatmapController {
  constructor(private readonly appService: BeatmapsetService) {}
}
