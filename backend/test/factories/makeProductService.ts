import { ProductService } from '../../src/application/services';
import { PrismaProductRepository } from '../../src/infra/repositories';
export default function makeProductService(): ProductService {
  return new ProductService(new PrismaProductRepository());
}
