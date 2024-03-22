export class UserAlreadyExistsError extends Error {
  public status: number;
  constructor(message='User already exists.', status= 400) {
    super(message);
    this.status = status;
  }
}
