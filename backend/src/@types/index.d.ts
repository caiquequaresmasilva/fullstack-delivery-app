// DOMAIN
type Role = 'customer' | 'seller' | 'admin';
type Id = { id: string };
type UserProps = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
type UserWithoutPassword = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
type LoginProps = Omit<UserProps, 'role' | 'name'>;
type TokenPayload = Omit<UserProps, 'password'> & Id;
// APPLICATION
type UserResponse = {
  name: string;
  token: string;
  role: Role;
};

// INFRA
