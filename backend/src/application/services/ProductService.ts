import { ProductRepository } from '../repositories';

export default class ProductService {
  constructor(private readonly repo: ProductRepository) {}

  async getAll() {
    return this.repo.getAll();
  }
}
