import { User } from '../../../modules/user/entities/user.entity';

export type JwtPayload = Pick<User, 'id' | 'username'>;
