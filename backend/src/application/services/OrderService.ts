import { EmptyProductsError, OrderNotFoundError } from '../errors';
import { OrderRepository } from '../repositories';

export default class OrderService {
  constructor(private readonly repo: OrderRepository) {}
  async create(rawOrder: RawOrder): Promise<Id<number>> {
    if (!rawOrder.products.length) {
      throw new EmptyProductsError();
    }
    const { id } = await this.repo.create(rawOrder);
    return {
      id,
    };
  }

  async getOrders(userId: string) {
    return this.repo.getOrders(userId);
  }

  async getOrder(id: number, userId: string) {
    const order = await this.repo.getOrder(id, userId);
    if (!order) {
      throw new OrderNotFoundError();
    }
    return order;
  }

  async updateStatus(id: number, userId: string, status: Status) {
    await this.repo.updateStatus(id, userId, status);
  }
}
