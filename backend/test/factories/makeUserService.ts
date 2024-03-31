import { UserService } from '../../src/application/services';
import { BcryptHashManager, JwtGenerator } from '../../src/infra/adapters';
import { PrismaUserRepository } from '../../src/infra/repositories';

export default function makeUserService(): UserService {
  const hash = new BcryptHashManager();
  const token = new JwtGenerator();
  const repo = new PrismaUserRepository();
  return new UserService(repo, token, hash);
}
