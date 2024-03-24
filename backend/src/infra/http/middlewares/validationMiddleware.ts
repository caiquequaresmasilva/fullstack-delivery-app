import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../../schemas';
import { HttpStatus } from '../../enums';

export async function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { email, password, role, name } = req.body;
  const { error } = userSchema.validate({ role, email, password, name });
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
  } else {
    next();
  }
}
