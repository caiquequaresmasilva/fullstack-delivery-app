export interface OrderRepository {
  create(order: RawOrder): Promise<Id<number>>;
  getOrders(params: QueryParams): Promise<Order[]>;
  getOrder(params: QueryParams): Promise<OrderDetailed | null>;
  updateStatus(params:QueryParams): Promise<void>;
}
