export interface OrderRepository {
  create(order: RawOrder): Promise<Id<number>>;
  getOrders(): Promise<Order[]>;
  getOrder(id: number,userId: string): Promise<OrderDetailed>
  updateStatus(id: number,status:Status): Promise<void>
}
