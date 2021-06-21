import { IPool } from '../interfaces/pool.interface';

import { Map } from '../../../modules/beatmapset/entities/map.entity';
import { User } from '../../../modules/user/entities/user.entity';

import { PoolStatus } from '../interfaces/pool.status.enum';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournament } from './tournament.entity';

@Entity('pools')
export class Pool implements IPool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cover_url: string;

  @ManyToMany(() => Map, { eager: true })
  @JoinTable()
  beatmaps: Map[];

  @Column()
  status: PoolStatus;

  @ManyToMany(() => Tournament)
  @JoinTable()
  used_in: Tournament[];

  @ManyToOne(() => User, (user) => user.pools, { eager: true })
  created_by: User;
}
