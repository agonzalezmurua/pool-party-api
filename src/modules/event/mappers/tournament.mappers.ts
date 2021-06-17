import { DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export function MapCollaboratorRelationToPartial(
  id: number,
): DeepPartial<User> {
  return {
    id: id,
  };
}
