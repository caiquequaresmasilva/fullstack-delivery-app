import { JwtValidator } from '../adapters';
import { RoleGuard } from '../http/middlewares';

export default function makeRoleGuard(role: Role): RoleGuard {
  return new RoleGuard(role, new JwtValidator());
}
