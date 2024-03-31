import { mockReset } from 'jest-mock-extended';
import { HashManager, TokenGenerator } from '../../src/application/adapters';
import { UserRepository } from '../../src/application/repositories';
import { UserService } from '../../src/application/services';
import { interfaceMock } from '../mocks';

export default function mockUserService() {
  const mockedRepo = interfaceMock<UserRepository>();
  const mockedToken = interfaceMock<TokenGenerator>();
  const mockedHash = interfaceMock<HashManager>();
  const service = new UserService(mockedRepo, mockedToken, mockedHash);
  const resetMocks = () => {
    mockReset(mockedRepo);
    mockReset(mockedToken);
    mockReset(mockedHash);
  };
  return {
    service,
    resetMocks,
    mockedHash,
    mockedRepo,
    mockedToken,
  };
}
