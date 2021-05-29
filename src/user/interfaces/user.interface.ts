import { Roles } from './user-roles.enum';
import { IUserProvider } from './user-provider.interface';

export interface IUser {
  username: string;

  active: boolean;

  avatar_url: string;

  cover_url: string;

  country_code: string;

  role: Roles;

  providers: IUserProvider[];
}
