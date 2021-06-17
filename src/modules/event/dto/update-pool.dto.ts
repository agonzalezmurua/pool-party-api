import { PoolStatus } from '../interfaces/pool.status.enum';

export class UpdatePoolDTO {
  name: string;

  cover_url: string;

  status: PoolStatus;

  /** A list of beatmaps id's */
  beatmaps: number[];
}
