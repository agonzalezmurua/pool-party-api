export class UnauthenticatedError extends Error {
  constructor() {
    super();
    this.name = "UnauthenticatedError";
    this.message = "Failed to authenticate user";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.name = "UnauthorizedError";
    this.message = "Failed to idenfity user's identity";
  }
}
