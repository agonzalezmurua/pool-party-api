import { Tags } from '../interfaces/tags.enum';
import { CreateMapDTO } from './create-map.dto';

export interface CreateSetDTO {
  osu_id: number;

  artist: string;

  title: string;

  status: string;

  cover_url: string;

  pool_tags: Tags[];

  maps: CreateMapDTO[];

  osu_user_id: number;
}
