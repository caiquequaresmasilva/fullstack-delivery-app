import { NextFunction, Request, Response } from 'express';
import { orderSchema } from '../../schemas';
import { HttpStatus } from '../../enums';

export async function orderValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { sellerId, products, deliveryAddress, deliveryNumber, totalPrice } =
    req.body;
  const { error } = orderSchema.validate({
    sellerId,
    products,
    deliveryAddress,
    deliveryNumber,
    totalPrice,
  });
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
  } else {
    next();
  }
}
