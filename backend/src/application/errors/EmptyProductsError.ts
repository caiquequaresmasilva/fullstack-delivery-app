export class EmptyProductsError extends Error {
  constructor(message = 'The list of products is empty', ) {
    super(message);
    this.name = 'BAD_REQUEST'
  }
}
