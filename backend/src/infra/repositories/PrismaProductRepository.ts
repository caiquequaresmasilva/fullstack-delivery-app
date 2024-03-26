import { ProductRepository } from '../../application/repositories';
import { prismaClient } from '../database/prisma/prismaClient';
import { Decimal } from '@prisma/client/runtime/library';
export type ProductProps = {
  id: string;
  name: string;
  price: Decimal;
  imagePath: string;
};
export class PrismaProductRepository
  implements ProductRepository<ProductProps>
{
  constructor(private readonly prisma = prismaClient) {}
  async getAll() {
    return this.prisma.deliveryProduct.findMany();
  }
}
