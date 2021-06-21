import { IMap } from './map.interface';

export interface ISet {
  osu_id: number;
  artist: string;
  title: string;
  osu_user_id: number;
  submited_date: Date;
  status: string;
  cover_url: string;
  pool_tags: string[];
  maps: IMap[];
}
