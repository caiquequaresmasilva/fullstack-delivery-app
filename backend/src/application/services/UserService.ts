import { User } from '../../domain';
import { HashManager, TokenGenerator } from '../adapters';
import { PasswordEmailError, UserAlreadyExistsError } from '../errors';
import { UserRepository } from '../repositories';

export default class UserService {
  constructor(
    private readonly repo: UserRepository,
    private readonly token: TokenGenerator,
    private readonly hash: HashManager,
  ) {}

  private _makeResponse(email: string, role: Role, id: string): UserResponse {
    return {
      token: this.token.generate({ email, role, id }),
      role,
    };
  }

  async create({ email, password, role }: UserProps): Promise<UserResponse> {
    const userCheck = await this.repo.findByEmail(email);
    if (userCheck) {
      throw new UserAlreadyExistsError();
    }
    const toCreate = new User({
      email,
      role,
      password: this.hash.generate(password),
    });

    const { id } = await this.repo.create(toCreate);
    return this._makeResponse(email, role, id);
  }

  async login({
    email,
    password,
  }: Omit<UserProps, 'role'>): Promise<UserResponse> {
    const user = await this.repo.findByEmail(email);
    if (!user || !this.hash.compare(password, user.hashedPassword)) {
      throw new PasswordEmailError();
    }
    return this._makeResponse(email, user.role as Role, user.id);
  }
}
