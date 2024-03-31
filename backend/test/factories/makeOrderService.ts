import { OrderService } from '../../src/application/services';
import { PrismaOrderRepository } from '../../src/infra/repositories';

export default function makeOrderService(): OrderService {
  return new OrderService(new PrismaOrderRepository());
}
