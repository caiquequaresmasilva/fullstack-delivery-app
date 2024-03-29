import { EmptyProductsError, OrderNotFoundError, StatusError } from '../errors';
import { OrderRepository } from '../repositories';

export default class OrderService {
  constructor(private readonly repo: OrderRepository) {}
  private NEXT_STATUS = {
    Pending: 'Preparing',
    Preparing: 'Moving',
    Moving: 'Delivered',
    Delivered: ''
  };
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
    const actualStatus = await this.repo.getStatus({
      userField,
      userId,
      orderId,
    });
    if(!actualStatus){
      throw new OrderNotFoundError()
    }
    const nextStatus = this.NEXT_STATUS[actualStatus]
    if( !nextStatus || nextStatus !== status){
      throw new StatusError()
    }
    await this.repo.updateStatus({ userField, userId, orderId, status });
  }
}
