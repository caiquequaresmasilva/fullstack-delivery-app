import { DeliveryStatus } from '@prisma/client';
import {
  EmptyProductsError,
  OrderNotFoundError,
  StatusError,
} from '../../../src/application/errors';
import { mockOrderService } from '../../factories';
import {
  DB_FULL_ORDER,
  DB_ORDERS,
  DOMAIN_FULL_ORDER,
  makeOrder,
} from '../../mocks';

describe('OrderService', () => {
  const { mockedRepo, resetMock, service } = mockOrderService();
  beforeEach(() => {
    resetMock();
  });
  describe('# create', () => {
    it('Should be able to create an order and return its id', async () => {
      const { ID, RAW_ORDER, RAW_PRODUCTS } = makeOrder();
      mockedRepo.create.mockResolvedValue({ id: ID.id });
      const { id } = await service.create({
        ...RAW_ORDER,
        products: RAW_PRODUCTS,
      });
      expect(id).toBe(ID.id);
    });

    it('Should throw "EmptyProductsError" when the products array is empty', async () => {
      const { RAW_ORDER } = makeOrder();
      expect(() =>
        service.create({ ...RAW_ORDER, products: [] }),
      ).rejects.toThrow(EmptyProductsError);
    });
  });

  describe('# getOrders', () => {
    it('Should be able to return the list of orders', async () => {
      mockedRepo.getOrders.mockResolvedValue(DB_ORDERS);
      const orders = await service.getOrders({
        userId: 'userId',
        userField: 'customer',
      });
      expect(orders).toEqual(DB_ORDERS);
    });
  });

  describe('# getOrder', () => {
    it('Should be able to return the order if it exists', async () => {
      mockedRepo.getOrder.mockResolvedValue(DOMAIN_FULL_ORDER);
      const order = await service.getOrder({
        orderId: 1,
        userId: 'userId',
        userField: 'customer',
      });
      expect(order).toEqual(DOMAIN_FULL_ORDER);
    });

    it('Should throw "OrderNotFoundError" when order not found', async () => {
      mockedRepo.getOrder.mockResolvedValue(null);
      expect(() =>
        service.getOrder({
          orderId: 1,
          userId: 'userId',
          userField: 'customer',
        }),
      ).rejects.toThrow(OrderNotFoundError);
    });
  });

  describe('# updateStatus', () => {
    const PARAMS = {
      orderId: 1,
      userId: 'userId',
      userField: 'customer',
      status: DeliveryStatus.Preparing,
    };
    it('Should be able to update the status of an order', async () => {
      mockedRepo.getStatus.mockResolvedValue('Pending');
      await service.updateStatus(PARAMS);
      expect(mockedRepo.updateStatus).toHaveBeenCalledWith(PARAMS);
    });

    it('Should throw "OrderNotFoundError" when order not found', async () => {
      mockedRepo.getStatus.mockResolvedValue(null);
      expect(()=> service.updateStatus(PARAMS)).rejects.toThrow(OrderNotFoundError)
    });

    it('Should throw "StatusError" when invalid status update', async () => {
      mockedRepo.getStatus.mockResolvedValue("Moving");
      expect(()=> service.updateStatus(PARAMS)).rejects.toThrow(StatusError)
    });

    it('Should throw "StatusError" when order was delivered', async () => {
      mockedRepo.getStatus.mockResolvedValue("Delivered");
      expect(()=> service.updateStatus(PARAMS)).rejects.toThrow(StatusError)
    });
  });
});
