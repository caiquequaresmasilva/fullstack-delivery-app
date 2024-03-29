import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../../errors';
import { RequestWithUser } from './AuthMiddleware';

export default function roleGuard(role: Role) {
  return (req: RequestWithUser, _res: Response, next: NextFunction) => {
    const { role: requestRole } = req.user;
    if (requestRole === role) {
      return next();
    }
    next(new ForbiddenError());
  };
}
