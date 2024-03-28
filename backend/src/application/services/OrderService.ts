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

  async getOrders({ userId, userField }: QueryParams) {
    return this.repo.getOrders({ userId, userField });
  }

  async getOrder({ userId, userField, orderId }: QueryParams) {
    const order = await this.repo.getOrder({ orderId, userId, userField });
    if (!order) {
      throw new OrderNotFoundError();
    }
    return order;
  }

  async updateStatus({ userField, userId, orderId, status }: QueryParams) {
    await this.repo.updateStatus({ userField, userId, orderId, status });
  }
}
