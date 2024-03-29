import { JwtValidator } from '../adapters';
import { AuthMiddleware } from '../http/middlewares';

export default function makeAuthMiddleware(): AuthMiddleware {
  return new AuthMiddleware(new JwtValidator());
}
