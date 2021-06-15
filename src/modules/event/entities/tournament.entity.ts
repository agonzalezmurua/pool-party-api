import { User } from '../../../modules/user/entities/user.entity';
import { Pool } from './pool.entity';

import { ITournament } from '../interfaces/tournament.interface';
import { TournamentStatus } from '../interfaces/tournament.status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tournaments')
export class Tournament implements ITournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cover_url: string;

  @ManyToMany(() => Pool, {
    eager: true,
    cascade: ['insert', 'recover', 'update'],
  })
  @JoinTable()
  pools: Pool[];

  @Column({ enum: TournamentStatus })
  status: TournamentStatus;

  @OneToOne(() => User)
  created_by: User;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  last_updated: Date;
}
