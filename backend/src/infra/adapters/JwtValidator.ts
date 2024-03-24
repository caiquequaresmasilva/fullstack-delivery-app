import { TokenExpiredError, verify } from 'jsonwebtoken';
import { TokenValidator } from './TokenValidator';
import { ExpiredTokenError, UnauthorizedError } from '../errors';

export class JwtValidator implements TokenValidator {
  validate(token: string): TokenPayload {
    try {
      return verify(token, process.env.TOKEN_SECRET!!) as TokenPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ExpiredTokenError();
      }
      throw new UnauthorizedError();
    }
  }
}
