export class PasswordEmailError extends Error {
  public status: number;
  constructor(message = 'Password or email incorrect', status=400) {
    super(message);
    this.status = status;
  }
}
