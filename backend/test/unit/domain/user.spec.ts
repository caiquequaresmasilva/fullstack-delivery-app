import { User } from '../../../src/domain';

describe('User domain entity', () => {
  const user = new User({
    name: "test name",
    email: 'test@email.com',
    password: 'jhJkjhkKJ3243',
    role: 'customer',
  });
  it('Should be able to create an User entity', () => {
    expect(user).toBeTruthy();
  });

  it('Should be able to return the right properties', () => {
    expect(user.name).toBe("test name")
    expect(user.id).toBe('');
    expect(user.email).toBe('test@email.com');
    expect(user.hashedPassword).toBe('jhJkjhkKJ3243');
    expect(user.role).toBe('customer');
  });
});
