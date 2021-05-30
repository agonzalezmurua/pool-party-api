import { UserProviderKind } from './user-provider.kind.enum';

export class IUserProvider {
  kind: UserProviderKind;
  username: string;
  provider_id: string;
}
