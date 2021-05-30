import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserProvider } from '../interfaces/user-provider.interface';
import { UserProviderKind } from '../interfaces/user-provider.kind.enum';
import { User } from './user.entity';

@Entity('user_providers')
export class UserProvider implements IUserProvider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: UserProviderKind })
  kind: UserProviderKind;

  @Column()
  username: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User, (user) => user.providers)
  user: User;
}
