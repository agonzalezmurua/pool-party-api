import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ISet } from '../interfaces/set.interface';
import { Tags } from '../interfaces/tags.enum';

import { Map } from './map.entity';

@Entity('sets')
export class Set implements ISet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  osu_id: string;

  @Column()
  artist: string;

  @Column()
  title: string;

  @Column()
  user_id: string;

  @Column()
  submited_date: Date;

  @Column()
  status: string;

  @Column()
  cover_url: string;

  @Column('text', { array: true })
  pool_tags: Tags[];

  @OneToMany(() => Map, (map) => map.id)
  maps: Map[];
}
