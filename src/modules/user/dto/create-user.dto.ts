import { IUserProvider } from '../interfaces/user-provider.interface';

export class CreateUserDTO {
  user: {
    username: string;
    avatar_url: string;
    cover_url: string;
    country_code: string;
  };
  provider: IUserProvider;
}
