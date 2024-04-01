import { DB_PRODUCTS } from '../../mocks';
import mockProductService from '../../factories/mockProductService';
describe('ProductService', () => {
  const { mockedRepo, resetMock, service } = mockProductService();

  describe('# getAll', () => {
    beforeEach(() => {
      resetMock()
    });
    it('Should return a list with all products', async () => {
      mockedRepo.getAll.mockResolvedValue(DB_PRODUCTS);
      const products = await service.getAll();
      expect(products).toEqual(DB_PRODUCTS);
    });
  });
});
