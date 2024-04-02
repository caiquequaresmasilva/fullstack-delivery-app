import { UserRepository } from '../../application/repositories';
import { User } from '../../domain';
import prismaClient from '../database/prisma/prismaClient';

export default class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma = prismaClient) {}
  async delete(id: string): Promise<void> {
    await this.prisma.deliveryUser.delete({
      where: {
        id,
      },
    });
  }

  async getUsers(): Promise<UserWithoutPassword[]> {
    return this.prisma.deliveryUser.findMany({
      where: {
        role: {
          not: 'admin',
        },
      },
      select: {
        email: true,
        name: true,
        role: true,
        id: true,
      },
    });
  }

  async create(data: User): Promise<Id<string>> {
    const { id } = await this.prisma.deliveryUser.create({
      data: data.toJSON(),
    });
    return { id };
  }

  async findByUnique({ email, id }: FindByUniqueParams): Promise<User | null> {
    const user = await this.prisma.deliveryUser.findUnique({
      where: {
        email,
        id,
      },
    });
    return user ? new User(user) : user;
  }
}
