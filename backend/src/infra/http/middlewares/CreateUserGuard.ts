import { NextFunction, Request, Response } from 'express';
import { TokenValidator } from '../../adapters';
import { ForbiddenError } from '../../errors';
import { Roles } from '../../enums';

export default class CreateUserGuard {
  constructor(private readonly token: TokenValidator) {}

  async handle(req: Request, res: Response, next: NextFunction) {
    const { role } = req.body;
    const bearerToken = req.headers.authorization || '';
    const token = bearerToken.split(' ')[1] || '';

    if (role === Roles.ADMIN) {
      return next(new ForbiddenError());
    }

    if (role === Roles.SELLER) {
      try {
        const { role: requestRole } = this.token.validate(token);
        if (requestRole !== Roles.ADMIN) {
          return next(new ForbiddenError())
        }
        return next()
      } catch (error) {
        return next(error)
      }
    }
    next()
  }
}
