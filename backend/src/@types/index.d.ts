// DOMAIN
type Role = 'customer' | 'seller' | 'admin';
type Status = 'Pending' | 'Preparing' | 'Moving' | 'Delivered';
type Id<T> = { id: T };
type QueryParams = {
  orderId?: number;
  status?: Status;
  userField: string;
  userId: string;
};

// USER
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

// ORDER
type RawProduct = {
  id: string;
  quantity: number;
};
type DBproduct = {
  productId: string;
  quantity: number;
};
type Product = {
  quantity: number;
  name: string;
  price: number;
};
type RawOrder = {
  customerId: string;
  sellerId: string;
  deliveryAddress: string;
  deliveryNumber: string;
  totalPrice: number;
  products: RawProduct[];
};

type Order = {
  id: number;
  status: Status;
  saleDate: Date;
  deliveryAddress: string;
  deliveryNumber: string;
  totalPrice: number;
};

type OrderDetailed = {
  totalPrice: number;
  saleDate: Date;
  status: Status;
  customer: string;
  seller: string;
  products: Product[];
};
