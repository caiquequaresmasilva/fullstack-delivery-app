import { verify } from 'jsonwebtoken';
import { TokenValidator } from './TokenValidator';
import { UnauthorizedError } from '../errors';

export class JwtValidator implements TokenValidator{
  validate(token: string): TokenPayload{
    try {
      return verify(token, process.env.TOKEN_SECRET!!) as TokenPayload;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}
