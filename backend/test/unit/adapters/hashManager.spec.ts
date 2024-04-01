import { BcryptHashManager } from '../../../src/infra/adapters';

describe('BcryptHashManager', () => {
  const hashManager = new BcryptHashManager();
  const TEST_PASSWORD = 'passPASS123';
  const WRONG_PASSWORD = "WRONGPASSWORD"
  describe('# generate', () => {
    it('Should return the hash of a given password', async () => {
      const hash = await hashManager.generate(TEST_PASSWORD);
      expect(typeof hash).toBe('string');
      expect(hash.length > 0).toBeTruthy();
    });
    it('Should return different hash for same password', async () => {
      const hash1 = await hashManager.generate(TEST_PASSWORD);
      const hash2 = await hashManager.generate(TEST_PASSWORD);
      expect(hash1 === hash2).toBeFalsy();
    });
  });

  describe('# compare', () => {
    it('Should return "true" if password and hash is valid', async () => {
      const hash = await hashManager.generate(TEST_PASSWORD);
      expect(hashManager.compare(TEST_PASSWORD, hash)).toBeTruthy()
    });
    it('Should return "false" if password and hash is not valid', async () => {
      const hash = await hashManager.generate(TEST_PASSWORD);
      expect(hashManager.compare(WRONG_PASSWORD, hash)).resolves.toBeFalsy()
    });
  });
});
