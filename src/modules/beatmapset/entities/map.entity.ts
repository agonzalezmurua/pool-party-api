import { Pool } from '@src/modules/event/entities/pool.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IMap } from '../interfaces/map.interface';
import { Mode } from '../interfaces/mode.enum';

@Entity('maps')
export class Map implements IMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  osu_id: string;

  @Column()
  mode: Mode;

  @Column()
  status: string;

  @Column()
  total_length: number;

  @Column()
  version: string;

  @Column()
  accuracy: number;

  @Column()
  approach_rate: number;

  @Column()
  circle_size: number;

  @Column()
  drain_rate: number;

  @Column()
  bpm: number;

  @ManyToMany(() => Pool)
  @JoinTable()
  used_in: Pool[];
}
