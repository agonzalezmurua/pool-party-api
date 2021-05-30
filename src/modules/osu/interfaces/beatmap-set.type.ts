import { Timestamp } from 'typeorm';
import { BeatmapSetCompact } from './beatmap-set-compact.type';

export type BeatmapSet = BeatmapSetCompact & {
  availability: {
    download_disabled: boolean;
    more_information?: string;
  };
  bpm: number;
  can_be_hyped: boolean;
  /** Username of the mapper at the time of beatmapset creation. */
  creator: string;
  discussion_enabled: boolean;
  discussion_locked: boolean;
  hype: {
    current: number;
    required: number;
  };
  is_scoreable: boolean;
  last_updated: Timestamp;
  legacy_thread_url: string;
  nominations: {
    current: number;
    required: number;
  };
  /** See Rank status for list of possible values. */
  ranked: number;
  ranked_date: Timestamp;
  source: string;
  storyboard: boolean;
  submitted_date?: Timestamp;
  tags: string;
};
