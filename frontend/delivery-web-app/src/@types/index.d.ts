type User = {
  email: string;
  password: string;
};
type PostUserResponse = {
  error?: string;
};
type FieldName = 'email' | 'password'
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
type OnChangeType = React.ChangeEvent<HTMLInputElement>;
// SERVICES TYPES
type PostUser = (body: PostUser) => Promise<PostUserResponse>;
