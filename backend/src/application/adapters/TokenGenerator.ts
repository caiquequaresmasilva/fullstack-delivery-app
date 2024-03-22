export interface TokenGenerator {
  generate(payload: Omit<UserProps, 'password'> & Id): string;
}
