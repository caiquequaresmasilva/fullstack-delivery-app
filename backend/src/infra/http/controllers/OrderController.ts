import { NextFunction, Response } from 'express';
import { OrderService } from '../../../application/services';
import { RequestWithUser } from '../middlewares';
import { HttpStatus } from '../../enums';

export default class OrderController {
  constructor(private readonly service: OrderService) {}

  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    const { id: customerId } = req.user;
    const { sellerId, deliveryAddress, deliveryNumber, totalPrice, products } =
      req.body;
    try {
      const response = await this.service.create({
        customerId,
        sellerId,
        deliveryAddress,
        deliveryNumber,
        totalPrice,
        products,
      });
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOrders(req: RequestWithUser, res: Response, next: NextFunction) {
    const { role, id: userId } = req.user;
    try {
      const response = await this.service.getOrders({
        userField: `${role}Id`,
        userId,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req: RequestWithUser, res: Response, next: NextFunction) {
    const { role, id: userId } = req.user;
    const { id: orderId } = req.params;
    try {
      const response = await this.service.getOrder({
        orderId: Number(orderId),
        userField: `${role}Id`,
        userId,
      });
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: RequestWithUser, res: Response, next: NextFunction) {
    const { role, id: userId } = req.user;
    const { id: orderId } = req.params;
    const { status } = req.body;
    try {
      const response = await this.service.updateStatus({
        orderId: Number(orderId),
        userField: `${role}Id`,
        userId,
        status,
      });
      return res.status(HttpStatus.OK).json({ message: 'Order updated' });
    } catch (error) {
      next(error);
    }
  }
}
