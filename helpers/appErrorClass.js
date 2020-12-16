class AppError extends Error {
  constructor(statusCode, status, errorMessage) {
    super();
    this.statusCode = statusCode;
    this.status = status;
    this.errorMessage = errorMessage;
  }
}

module.exports = AppError;
