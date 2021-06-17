import { DeepPartial } from 'typeorm';
import { User } from '../../user/entities/user.entity';

/**
 * Convers a User ID into a Partial User Entity
 * @param id User ID
 * @returns Partial User Entity
 */
export function MapCollaboratorRelationToPartial(
  id: number,
): DeepPartial<User> {
  return {
    id: id,
  };
}
