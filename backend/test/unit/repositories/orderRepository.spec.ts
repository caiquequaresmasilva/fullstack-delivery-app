import { PrismaOrderRepository } from '../../../src/infra/repositories';
import {
  DB_FULL_ORDER,
  DB_ORDERS,
  DOMAIN_FULL_ORDER,
  makeOrder,
  prismaMock,
} from '../../mocks';
describe('PrismaOrderRepository', () => {
  const repository = new PrismaOrderRepository();
  describe('# create', () => {
    it('Should create a new order and return the Id', async () => {
      const { RAW_ORDER, DB_ORDER, ID, RAW_PRODUCTS } = makeOrder();
      prismaMock.deliveryOrder.create.mockResolvedValue({ ...DB_ORDER, ...ID });
      const { id } = await repository.create({
        ...RAW_ORDER,
        products: RAW_PRODUCTS,
      });
      expect(id).toBe(ID.id);
    });
  });

  describe('# getOrders', () => {
    it('Should return a list of orders', async () => {
      prismaMock.deliveryOrder.findMany.mockResolvedValue(DB_ORDERS);
      const orders = await repository.getOrders({
        userField: 'customer',
        userId: 'id',
      });
      expect(orders).toEqual(DB_ORDERS);
    });
  });

  describe('# getOrder', () => {
    it('Should return the order when it exists', async () => {
      prismaMock.deliveryOrder.findUnique.mockResolvedValue(DB_FULL_ORDER);
      const order = await repository.getOrder({
        orderId: 1,
        userField: 'customer',
        userId: '',
      });
      expect(order).toEqual(DOMAIN_FULL_ORDER);
    });
    it('Should return "null" when order not found', async () => {
      prismaMock.deliveryOrder.findUnique.mockResolvedValue(null);
      const order = await repository.getOrder({
        orderId: 1,
        userField: 'customer',
        userId: '',
      });
      expect(order).toBeNull();
    });
  });

  describe('# updateStatus', () => {
    it('Should update an order status', async () => {
      prismaMock.deliveryOrder.update.mockResolvedValue(DB_FULL_ORDER);
      await repository.updateStatus({
        userField: 'customer',
        userId: 'userId',
        orderId: 1,
        status: 'Preparing',
      });
      expect(prismaMock.deliveryOrder.update).toHaveBeenCalled()
    });
  });

  describe('# getStatus', () => {
    it('Should return the status of an order', async () => {
      prismaMock.deliveryOrder.findUnique.mockResolvedValue(DB_FULL_ORDER);
      const status = await repository.getStatus({
        userField: 'customer',
        userId: 'userId',
        orderId: 1,
      })
      expect(status).toBe(DB_FULL_ORDER.status)
    });
    it('Should return "null" when order not found', async () => {
      prismaMock.deliveryOrder.findUnique.mockResolvedValue(null);
      const status = await repository.getStatus({
        userField: 'customer',
        userId: 'userId',
        orderId: 1,
      })
      expect(status).toBeNull();
    });
  });

});
