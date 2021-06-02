import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { IMap } from '../interfaces/map.interface';
import { GameMode } from '../interfaces/game-mode.enum';
import { ISet } from '../interfaces/set.interface';
import { Set } from './set.entity';

@Entity('maps')
export class Map implements IMap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  osu_id: number;

  @Column()
  mode: GameMode;

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

  @Column('decimal', {
    transformer: {
      to: (value: number) => String(value),
      from: (value: string) => Number(value),
    },
  })
  bpm: number;

  @ManyToOne(() => Set, (set) => set.maps)
  set: ISet;
}
