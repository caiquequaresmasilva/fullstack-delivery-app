import { compare, genSalt, hash } from 'bcryptjs';
import { HashManager } from '../../application/adapters';

export default class BcryptHashManager implements HashManager {
  async generate(str: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(str, salt);
  }
  async compare(str: string, hash: string): Promise<boolean> {
    return compare(str, hash);
  }
}
