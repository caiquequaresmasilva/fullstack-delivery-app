export class StatusError extends Error {
  constructor(message='Incorrect status update attempt') {
    super(message);
    this.name = 'BAD_REQUEST'
  }
}
