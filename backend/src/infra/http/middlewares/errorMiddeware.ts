import { NextFunction, Request, Response } from 'express';
import { HttpStatus } from '../../enums';

export default function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
) {
  const { name, message } = err;
  const status = HttpStatus[name as keyof typeof HttpStatus];
  res
    .status(status || HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ error: message || HttpStatus[500] });
}
