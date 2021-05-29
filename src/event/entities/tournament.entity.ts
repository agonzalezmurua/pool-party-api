import { User } from 'src/user/entities/user.entity';
import { Pool } from './pool.entity';

import { ITournament } from '../interfaces/tournament.interface';
import { TournamentStatus } from '../interfaces/tournament.status.enum';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournaments')
export class Tournament implements ITournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cover_url: string;

  @ManyToMany(() => Pool)
  @JoinTable()
  pools: Pool[];

  @Column({ enum: TournamentStatus })
  status: TournamentStatus;

  @OneToOne(() => User)
  created_by: User;
}
