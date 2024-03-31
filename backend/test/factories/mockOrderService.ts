import { mockReset } from 'jest-mock-extended';
import { OrderRepository } from '../../src/application/repositories';
import { OrderService } from '../../src/application/services';
import { interfaceMock } from '../mocks';

export default function mockOrderService() {
  const mockedRepo = interfaceMock<OrderRepository>();
  const service = new OrderService(mockedRepo);
  const resetMock = () => mockReset(mockedRepo);
  return {
    service,
    mockedRepo,
    resetMock,
  };
}
