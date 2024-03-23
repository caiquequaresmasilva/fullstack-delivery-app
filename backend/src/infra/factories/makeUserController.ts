import UserService from '../../application/services/UserService';
import { BcryptHashManager, JwtGenerator } from '../adapters';
import { UserController } from '../http/controllers';
import { PrismaUserRepository } from '../repositories';

export default function makeUserController(): UserController {
  const service = new UserService(
    new PrismaUserRepository(),
    new JwtGenerator(),
    new BcryptHashManager(),
  );
  return new UserController(service);
}
