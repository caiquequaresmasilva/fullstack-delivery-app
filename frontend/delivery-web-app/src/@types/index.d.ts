type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
type UserNoPassword = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
type Id<T> = {
  id: T;
};
type Login = {
  email: string;
  password: string;
};
type RequestProduct = {
  id: string;
  quantity: number;
};
type StatusUpdateRequest = {
  id: string;
  status: Status;
};
type FullProductResponse = {
  quantity: number;
  name: string;
  price: string;
};
type ProductResponse = {
  id: string;
  name: string;
  price: string;
  imagePath: string;
};
type OrderRequest = {
  sellerID: string;
  deliveryAddress: string;
  deliveryNumber: string;
  totalPrice: number;
  products: RequestProduct[];
};
type OrderResponse = {
  id: number;
  deliveryAddress: string;
  deliveryNumber: string;
  totalPrice: string;
  saleDate: Date;
  status: Status;
};

type FullOrderResponse = {
  totalPrice: number;
  saleDate: Date;
  status: Status;
  customer: string;
  seller: string;
  products: FullProductResponse[];
};
type PostUserServiceResponse = {
  error?: string;
  role?: Role;
};
type ResponseMessage = {
  message: string;
};
type FieldName = "email" | "password" | "name";
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type OnChangeType = React.ChangeEvent<HTMLInputElement>;
type AuthPaths = "/login" | "/signup";
type OnSubmitParam = React.FormEvent;
type HandleSubmit<T> = (body: T) => Promise<void>;
type Role = "customer" | "seller" | "admin";
type Status = "Pending" | "Preparing" | "Moving" | "Delivered";
type PostUserResponse = {
  name?: string;
  role?: Role;
  token?: string;
  error?: string;
};
type ApiError = {
  status: number;
  data: {
    error: string;
  };
};
type TextInputProps = {
  setState: SetState<string>;
  name: FieldName;
};
// SERVICES TYPES
type PostUserService<T> = (body: T) => Promise<PostUserServiceResponse>;
