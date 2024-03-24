export class ForbiddenError extends Error {
    constructor(message = 'You are not allowed to perform this action', ) {
      super(message);
      this.name = 'FORBIDDEN'
    }
  }
  