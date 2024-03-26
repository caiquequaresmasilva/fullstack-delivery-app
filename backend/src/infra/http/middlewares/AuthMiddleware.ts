import { NextFunction, Request, Response } from 'express';
import { TokenValidator } from '../../adapters';

export interface RequestWithUser extends Request {
  user: UserWithoutPassword;
}
export class AuthMiddleware {
  constructor(private readonly token: TokenValidator) {}
  async handle(req: RequestWithUser, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization || '';
    const token = bearerToken.split(' ')[1] || '';

    try {
      const { role, email, id, name } = this.token.validate(token);
      req.user = { name, email, id, role };
      return next();
    } catch (error) {
      return next(error);
    }
  }
}
