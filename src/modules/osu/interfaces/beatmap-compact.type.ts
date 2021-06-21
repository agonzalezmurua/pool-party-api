import { BeatmapSetCompact } from './beatmap-set-compact.type';
import { BeatmapSet } from './Beatmap-set.type';
import { Failtimes } from './failtimes.types';
import { GameMode } from './gamemode.type';

export type BeatmapCompact = {
  difficulty_rating: number;
  id: number;
  mode: GameMode;
  status: string;
  total_length: number;
  version: string;

  /* Beatmapset for Beatmap object, BeatmapsetCompact for BeatmapCompact object. null if the beatmap doesn't have associated beatmapset (e.g. deleted). */
  beatmapset?: BeatmapSet | BeatmapSetCompact | null;
  checksum?: string;
  failtimes?: Failtimes;
  max_combo?: number;
};
