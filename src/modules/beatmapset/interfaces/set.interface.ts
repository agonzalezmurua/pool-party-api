import { IMap } from './map.interface';

export interface ISet {
  osu_id: string;
  artist: string;
  title: string;
  user_id: string;
  submited_date: Date;
  status: string;
  cover_url: string;
  pool_tags: string[];
  maps: IMap[];
}
