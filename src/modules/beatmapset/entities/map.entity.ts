import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IMap } from '../interfaces/map.interface';
import { GameMode } from '../interfaces/game-mode.enum';
import { Set } from './set.entity';
import { Pool } from '../../../modules/event/entities/pool.entity';
import { DecimalTransformer } from '../../../utils/transformers/decimal';

@Entity('maps')
export class Map implements IMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  osu_id: number;

  @Column({ enum: GameMode })
  mode: GameMode;

  @Column()
  status: string;

  @Column()
  total_length: number;

  @Column()
  version: string;

  @Column('decimal', {
    transformer: DecimalTransformer,
  })
  accuracy: number;

  @Column('decimal', {
    transformer: DecimalTransformer,
  })
  approach_rate: number;

  @Column('decimal', {
    transformer: DecimalTransformer,
  })
  circle_size: number;

  @Column('decimal', {
    transformer: DecimalTransformer,
  })
  drain_rate: number;

  @Column('decimal', {
    transformer: DecimalTransformer,
  })
  bpm: number;

  @ManyToOne(() => Set, (set) => set.maps)
  set: Set;

  @ManyToMany(() => Pool)
  @JoinTable()
  used_in: Pool[];
}
