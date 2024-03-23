type User = {
  email: string;
  password: string;
};
type PostUserResponse = {
  error?: string;
};
type FieldName = "email" | "password";
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type OnChangeType = React.ChangeEvent<HTMLInputElement>;
type AuthPaths = "/login" | "/signup";
type OnSubmitParam = React.FormEvent;
type HandleSubmit = (body: User) => Promise<void>;
// SERVICES TYPES
type PostUser = (body: User) => Promise<PostUserResponse>;
