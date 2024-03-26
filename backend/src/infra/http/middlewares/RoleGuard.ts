import { NextFunction, Request, Response } from 'express';
import { TokenValidator } from '../../adapters';
import { ForbiddenError } from '../../errors';

export default class RoleGuard {
  constructor(
    private readonly role: Role,
    private readonly token: TokenValidator,
  ) {}
  public handle(req: Request, res: Response, next: NextFunction) {
    const bearerToken = req.headers.authorization || '';
    const token = bearerToken.split(' ')[1] || '';
    try {
      const { role } = this.token.validate(token);
      if (role !== this.role) {
        return next(new ForbiddenError())
      }
      return next()
    } catch (error) {
      return next(error)
    }
  }
}
