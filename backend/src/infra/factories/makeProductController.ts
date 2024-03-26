import { ProductService } from '../../application/services';
import { ProductController } from '../http/controllers';
import { PrismaProductRepository } from '../repositories';

export default function makeProductController(): ProductController {
  const repo = new PrismaProductRepository();
  return new ProductController(new ProductService(repo));
}
