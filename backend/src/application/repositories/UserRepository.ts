import { User } from '../../domain';

export interface UserRepository {
  create(data: User): Promise<Id>;
  findByEmail(email: string): Promise<User | null>
}
