import { NextFunction, Response } from 'express';
import { RequestWithUser } from './AuthMiddleware';
import { ForbiddenError } from '../../errors';

export async function statusMiddleware(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { status } = req.body;
  const { role } = req.user;
  if(role === 'seller' && status === "Delivered"){
    return next(new ForbiddenError())
  }
  if(role === 'customer' && status !== "Delivered"){
    return next(new ForbiddenError())
  }
  next()
}
