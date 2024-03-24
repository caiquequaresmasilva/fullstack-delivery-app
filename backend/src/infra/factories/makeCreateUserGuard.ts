import { JwtValidator } from '../adapters';
import { CreateUserGuard } from '../http/middlewares';

export default function makeCreateUserGuard(): CreateUserGuard {
  return new CreateUserGuard(new JwtValidator());
}
