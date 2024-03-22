// DOMAIN
type Role = 'customer' | 'seller' | 'admin';
type Id = { id: string };
type UserProps = {
  email: string;
  password: string;
  role: Role;
};
// APPLICATION
type UserResponse = {
  token: string;
  role: Role;
};
