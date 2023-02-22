class ApiError extends Error{
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unautharized() {
    return new ApiError(401, 'Not authrized');
  }

  static badRequest(message, errors = []) {
    return new ApiError(400, message);
  }

  static internals(message, errors = []) {
    return new ApiError(500, message);
  }

  static forbidden(message, errors = []) {
    return new ApiError(403, message);
  }
}

export default ApiError;