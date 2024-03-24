export class UserAlreadyExistsError extends Error {
  constructor(message='User already exists') {
    super(message);
    this.name = 'BAD_REQUEST'
  }
}
