export class UnauthorizedError extends Error {
    constructor(message = 'Invalid authentication token', ) {
      super(message);
      this.name = 'UNAUTHORIZED'
    }
  }
  