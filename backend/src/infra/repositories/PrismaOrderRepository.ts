import { PrismaClient } from '@prisma/client';
import { OrderRepository } from '../../application/repositories';
import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../database/prisma/prismaClient';

type RawDBOrder = {
  totalPrice: Decimal;
  saleDate: Date;
  status: Status;
  customer: {
    name: string;
  };
  seller: {
    name: string;
  };
  products: {
    quantity: number;
    product: {
      name: string;
      price: Decimal;
    };
  }[];
};
export default class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly prisma = prismaClient) {}
  private _mapProductsToDb(products: RawProduct[]): DBproduct[] {
    return products.map(({ id, quantity }) => ({ productId: id, quantity }));
  }

  private _mapOrderToDomain({
    customer,
    seller,
    status,
    saleDate,
    products,
    totalPrice,
  }: RawDBOrder): OrderDetailed<Decimal> {
    return {
      status,
      saleDate,
      totalPrice,
      customer: customer.name,
      seller: seller.name,
      products: products.map(({ quantity, product: { name, price } }) => ({
        name,
        price,
        quantity,
      })),
    };
  }

  async create({
    customerId,
    deliveryAddress,
    deliveryNumber,
    sellerId,
    totalPrice,
    products,
  }: RawOrder): Promise<Id<number>> {
    const { id } = await this.prisma.deliveryOrder.create({
      data: {
        customerId,
        sellerId,
        deliveryAddress,
        deliveryNumber,
        totalPrice,
        products: {
          createMany: {
            data: this._mapProductsToDb(products),
          },
        },
      },
    });
    return { id };
  }
  async getOrders({
    userField,
    userId,
  }: QueryParams): Promise<Order<Decimal>[]> {
    return this.prisma.deliveryOrder.findMany({
      where: {
        [userField]: userId,
      },
      select: {
        id: true,
        totalPrice: true,
        deliveryAddress: true,
        deliveryNumber: true,
        saleDate: true,
        status: true,
      },
    });
  }
  async getOrder({
    orderId,
    userField,
    userId,
  }: QueryParams): Promise<OrderDetailed<Decimal> | null> {
    const order = await this.prisma.deliveryOrder.findUnique({
      where: {
        id: orderId,
        [userField]: userId,
      },
      select: {
        totalPrice: true,
        saleDate: true,
        status: true,
        products: {
          select: {
            quantity: true,
            product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
        customer: {
          select: {
            name: true,
          },
        },
        seller: {
          select: {
            name: true,
          },
        },
      },
    });
    return order ? this._mapOrderToDomain(order) : null;
  }

  async updateStatus({
    userField,
    userId,
    orderId,
    status,
  }: QueryParams): Promise<void> {
    await this.prisma.deliveryOrder.update({
      where: {
        id: orderId,
        [userField]: userId,
      },
      data: {
        status,
      },
    });
  }
}
