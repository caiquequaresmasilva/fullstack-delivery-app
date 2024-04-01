import {
  PasswordEmailError,
  UserAlreadyExistsError,
} from '../../../src/application/errors';
import { UserNotFoundError } from '../../../src/infra/errors';
import { mockUserService } from '../../factories';
import { USERS_NO_PASSWORD, makeUser, makeUserProps } from '../../mocks';

describe('UserService', () => {
  const { mockedHash, mockedRepo, mockedToken, resetMocks, service } =
    mockUserService();
  beforeEach(() => {
    resetMocks();
  });
  describe('# create', () => {
    it('Should be able to create an user and return a token', async () => {
      const { id, ...userProps } = makeUserProps('customer', true);
      const response = {
        name: userProps.name,
        role: userProps.role,
        token: 'userToken',
      };
      mockedRepo.findByEmail.mockResolvedValue(null);
      mockedHash.generate.mockResolvedValue('hashPassword');
      mockedRepo.create.mockResolvedValue({ id });
      mockedToken.generate.mockReturnValue('userToken');
      const user = await service.create(userProps);
      expect(user).toEqual(response);
    });

    it('Should throw "UserAlreadyExistsError" when email already registered', async () => {
      const { USER } = makeUser('customer');
      mockedRepo.findByEmail.mockResolvedValue(USER);
      expect(() => service.create(USER.toJSON())).rejects.toThrow(
        UserAlreadyExistsError,
      );
    });
  });

  describe('# login', () => {
    it('Should be able to login an user an return a token', async () => {
      const { USER } = makeUser('customer');
      const response = {
        name: USER.name,
        role: USER.role,
        token: 'userToken',
      };
      mockedRepo.findByEmail.mockResolvedValue(USER);
      mockedHash.compare.mockResolvedValue(true);
      mockedToken.generate.mockReturnValue('userToken');
      const token = await service.login({
        email: USER.email,
        password: USER.hashedPassword,
      });
      expect(token).toEqual(response);
    });

    it('Should throw "PasswordEmailError" when user not found', async () => {
      mockedRepo.findByEmail.mockResolvedValue(null);
      expect(() => service.login({ email: '', password: '' })).rejects.toThrow(
        PasswordEmailError,
      );
    });

    it('Should throw "PasswordEmailError" when password does not match', async () => {
      const { USER } = makeUser('customer');
      mockedRepo.findByEmail.mockResolvedValue(USER);
      mockedHash.compare.mockResolvedValue(false);
      expect(() =>
        service.login({ email: USER.email, password: '' }),
      ).rejects.toThrow(PasswordEmailError);
    });
  });

  describe('# getUsers', () => {
    it('Should be able to return a list os users', async () => {
      mockedRepo.getUsers.mockResolvedValue(USERS_NO_PASSWORD);
      const users = await service.getUsers();
      expect(users).toEqual(USERS_NO_PASSWORD);
    });
  });

  describe('# delete', () => {
    it('Should be able to delete an user that exists', async () => {
      await service.delete('userId');
      expect(mockedRepo.delete).toHaveBeenCalledWith('userId');
    });

    it('Should throw "UserNotFoundError" when user not found', async () => {
      mockedRepo.delete.mockRejectedValue(new UserNotFoundError());
      expect(() => service.delete('userId')).rejects.toThrow(UserNotFoundError);
    });
  });
});
