import { GameMode } from './gamemode.type';
import { ProfilePage } from './profile-page.type';
import { Timestamp } from './timestamp.type';
import { UserCompact } from './user-compact.type';

export type User = UserCompact & {
  cover_url: string;
  discord: string;
  has_supported: boolean;
  interests: string;
  join_date: Timestamp;
  kudosu: {
    available: number;
    total: number;
  };
  location: string;
  max_blocks: number;
  max_friends: number;
  occupation: string;
  playmode: GameMode;
  playstyle: string;
  post_count: number;
  profile_order: ProfilePage[];
  title: string;
  title_url: string;
  twitter: string;
  website: string;
};
