export class ExpiredTokenError extends Error {
  constructor(message = 'Your token has expired. Login again.', ) {
    super(message);
    this.name = 'UNAUTHORIZED'
  }
}
