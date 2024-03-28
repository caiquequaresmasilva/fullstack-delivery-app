export interface OrderRepository {
  create(order: RawOrder): Promise<Id<number>>;
  getOrders(userId: string): Promise<Order[]>;
  getOrder(id: number, userId: string): Promise<OrderDetailed | null>;
  updateStatus(id: number, userId: string, status: Status): Promise<void>;
}
