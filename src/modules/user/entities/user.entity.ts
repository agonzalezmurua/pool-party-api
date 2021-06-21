import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { IUser } from '../interfaces/user.interface';
import { Roles } from '../interfaces/user-roles.enum';
import { UserProvider } from './user-provider.entity';
import { Pool } from '../../../modules/event/entities/pool.entity';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  avatar_url: string;

  @Column()
  role: Roles;

  @Column()
  cover_url: string;

  @Column()
  country_code: string;

  @OneToMany(() => UserProvider, (provider) => provider.user, {
    eager: true,
    cascade: true,
  })
  providers: UserProvider[];

  @OneToMany(() => Pool, (pool) => pool.created_by)
  pools: Pool[];
}
