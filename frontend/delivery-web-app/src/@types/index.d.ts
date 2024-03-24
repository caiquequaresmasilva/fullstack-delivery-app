type User = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
type Login = {
  email: string;
  password: string;
};
type PostUserServiceResponse = {
  error?: string;
};
type FieldName = "email" | "password";
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type OnChangeType = React.ChangeEvent<HTMLInputElement>;
type AuthPaths = "/login" | "/signup";
type OnSubmitParam = React.FormEvent;
type HandleSubmit = (body: User) => Promise<void>;
type Role = "customer" | "seller" | "admin";
type PostUserResponse = {
  name?: string;
  role?: Role;
  token?: string;
  error?: string;
};
// SERVICES TYPES
type PostUserService = (body: User) => Promise<PostUserServiceResponse>;
