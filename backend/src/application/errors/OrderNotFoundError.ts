export class OrderNotFoundError extends Error {
  constructor(message='Order not found') {
    super(message);
    this.name = 'NOT_FOUND'
  }
}
