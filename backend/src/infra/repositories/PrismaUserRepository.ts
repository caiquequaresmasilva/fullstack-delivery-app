import { UserRepository } from '../../application/repositories';
import { User } from '../../domain';
import { prismaClient } from '../database/prisma/prismaClient';

export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma = prismaClient) {}
  async create(data: User): Promise<Id> {
    const { id } = await this.prisma.deliveryUser.create({
      data: data.toJSON(),
    });
    return { id };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.deliveryUser.findUnique({
      where: {
        email,
      },
    });
    return user ? new User(user) : user;
  }
}
