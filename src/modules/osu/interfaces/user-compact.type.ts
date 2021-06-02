import { Timestamp } from './timestamp.type';

// Note: this is actually not the full UserCompact object, this is only used for reference
export type UserCompact = {
  /** 	url of user's avatar */
  avatar_url: string;
  /** two-letter code representing user's country */
  country_code: string;
  /** Identifier of the default Group the user belongs to. */
  default_group: string;
  /** unique identifier for user */
  id: number;
  /** has this account been active in the last x months? */
  is_active: boolean;
  /** is this a bot account? */
  is_bot: boolean;
  /** is the user currently online? (either on lazer or the new website) */
  is_online: boolean;
  /** does this user have supporter? */
  is_supporter: boolean;
  /** last access time. null if the user hides online presence */
  last_visit: Timestamp;
  /** whether or not the user allows PM from other than friends */
  pm_friends_only: boolean;
  /** colour of username/profile highlight, hex code (e.g. #333333) */
  profile_colour: string;
  /** user's display name */
  username: string;
};
