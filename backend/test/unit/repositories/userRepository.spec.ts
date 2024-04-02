import { User } from '../../../src/domain';
import { UserNotFoundError } from '../../../src/infra/errors';
import { PrismaUserRepository } from '../../../src/infra/repositories';
import { USERS_NO_PASSWORD, generateId, makeUser, makeUserProps, prismaMock } from '../../mocks';

describe('PrismaUserRepository', () => {
  const repository = new PrismaUserRepository();
  describe('# create', () => {
    it('Should create a new user and return the Id', async () => {
      const { ID, USER } = makeUser('customer');
      prismaMock.deliveryUser.create.mockResolvedValue({
        ...USER.toJSON(),
        ...ID,
      });
      const { id } = await repository.create(USER);
      expect(id).toBe(ID.id);
    });
  });

  describe('# findByEmail', () => {
    it('Should return a domain User if found', async () => {
      const userProps = makeUserProps('customer', true);
      prismaMock.deliveryUser.findUnique.mockResolvedValue(userProps);
      const user = await repository.findByUnique({email: userProps.email});
      expect(user).toBeInstanceOf(User);
      expect(user?.toJSON()).toEqual(userProps);
    });
    it('Should return "null" if user not found', async () => {
      prismaMock.deliveryUser.findUnique.mockResolvedValue(null);
      const user = await repository.findByUnique({email: ""});
      expect(user).toBeNull();
    });
  });

  describe('# getUsers', () => {
    it('Should return a list of users without admins', async () => {
      prismaMock.deliveryUser.findMany.mockResolvedValue(USERS_NO_PASSWORD)
      const users = await repository.getUsers()
      expect(users).toEqual(USERS_NO_PASSWORD)
    });
  });

  describe('# delete', () => {
    it('Should delete an user when it exists', async () => {
      const userProps = makeUserProps('customer', true);
      prismaMock.deliveryUser.delete.mockResolvedValue(userProps)
      await repository.delete(userProps.id)
      expect(prismaMock.deliveryUser.delete).toHaveBeenCalled()
    });

    it('Should throw error when user not found', async () => {
      prismaMock.deliveryUser.delete.mockRejectedValue( new Error())
      expect(() => repository.delete("") ).rejects.toThrow(UserNotFoundError)
    });
  });
});
