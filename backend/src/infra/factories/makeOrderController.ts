import { OrderService } from '../../application/services';
import { OrderController } from '../http/controllers';
import { PrismaOrderRepository } from '../repositories';

export default function makeOrderController(): OrderController {
  const repo = new PrismaOrderRepository();
  return new OrderController(new OrderService(repo));
}
