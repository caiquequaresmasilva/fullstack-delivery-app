import { User } from '../../domain';

export interface UserRepository {
  create(data: User): Promise<Id<string>>;
  findByEmail(email: string): Promise<User | null>;
  getUsers(): Promise<UserWithoutPassword[]>;
  delete(id: string): Promise<void>;
}
