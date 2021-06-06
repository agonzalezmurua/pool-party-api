import { User as UserEntity } from '../modules/user/entities/user.entity';

declare global {
  namespace Express {
    class User extends UserEntity {}
  }
}
