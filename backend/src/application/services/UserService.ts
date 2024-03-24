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

  private _makeResponse({
    email,
    name,
    role,
    id,
  }: TokenPayload): UserResponse {
    return {
      name,
      token: this.token.generate({ name, email, role, id }),
      role,
    };
  }

  async create({
    email,
    password,
    role,
    name,
  }: UserProps): Promise<UserResponse> {
    const userCheck = await this.repo.findByEmail(email);
    if (userCheck) {
      throw new UserAlreadyExistsError();
    }
    const toCreate = new User({
      name,
      email,
      role,
      password: await this.hash.generate(password),
    });

    const { id } = await this.repo.create(toCreate);
    return this._makeResponse({ name, email, role, id });
  }

  async login({
    email,
    password,
  }: LoginProps): Promise<UserResponse> {
    const user = await this.repo.findByEmail(email);
    if (!user || !this.hash.compare(password, user.hashedPassword)) {
      throw new PasswordEmailError();
    }
    return this._makeResponse({
      name: user.name,
      email,
      role: user.role as Role,
      id: user.id,
    });
  }
}
