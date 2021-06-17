import { IsEnum } from 'class-validator';

import { CreatePoolDTO } from './create-pool.dto';

import { PoolStatus } from '../interfaces/pool.status.enum';

export class UpdatePoolDTO extends CreatePoolDTO {
  @IsEnum(PoolStatus)
  readonly status: PoolStatus;
}
