import { mockReset } from 'jest-mock-extended';
import { ProductRepository } from '../../src/application/repositories';
import { ProductService } from '../../src/application/services';
import { interfaceMock } from '../mocks';
export default function mockProductService() {
  const mockedRepo = interfaceMock<ProductRepository>();
  const service = new ProductService(mockedRepo);
  const resetMock = () => mockReset(mockedRepo);
  return {
    service,
    mockedRepo,
    resetMock,
  };
}
