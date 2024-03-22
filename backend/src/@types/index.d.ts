// DOMAIN
type Role = 'customer' | 'seller' | 'admin';
type Id = { id?: string };
type UserProps = {
  email: string;
  password: string;
  role: Role;
};
