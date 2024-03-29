export interface OrderRepository {
  create(order: RawOrder): Promise<Id<number>>;
  getOrders(params: QueryParams): Promise<Order<any>[]>;
  getOrder(params: QueryParams): Promise<OrderDetailed<any> | null>;
  updateStatus(params:QueryParams): Promise<void>;
  getStatus(params: QueryParams): Promise<Status | null>
}
