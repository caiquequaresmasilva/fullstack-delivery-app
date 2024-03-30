import { PrismaProductRepository } from '../../../src/infra/repositories';
import { DB_PRODUCTS, prismaMock } from '../../mocks';

describe('PrismaProductRepository', () => {
  const repository = new PrismaProductRepository();
  describe('# getAll', () => {
    it('Should return the list of all products', async () => {
      prismaMock.deliveryProduct.findMany.mockResolvedValue(DB_PRODUCTS)
      const products = await repository.getAll();
      expect(products.length).toBe(11)
      expect(products).toEqual(DB_PRODUCTS)
    });
  });
});
