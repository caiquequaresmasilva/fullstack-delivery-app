export class PasswordEmailError extends Error {
  constructor(message = 'Password or email incorrect', ) {
    super(message);
    this.name = 'BAD_REQUEST'
  }
}
