import { BeatmapCompact } from './beatmap-compact.type';
import { Timestamp } from './timestamp.type';

export type Beatmap = BeatmapCompact & {
  accuracy: number;
  ar: number;
  beatmapset_id: number;
  bpm: number;
  convert: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at?: Timestamp;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: Timestamp;
  mode_int: number;
  passcount: number;
  playcount: number;
  /* See Rank status for list of possible values. */
  ranked: number;
  url: string;
};
