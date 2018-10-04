class AppError extends Error {
  constructor (message, code) {
    super(message);
    this.name = this.constructor.name;
    this.code = code || 500;
    Error.captureStackTrace(this, this.constructor);
  }

  json() {
    const data = {
      type: this.type,
      code: this.code
    };

    if (this.errors) {
      data.error = this.errors;
    } else {
      data.error = this.message;
    }

    return data;
  }
}

module.exports = AppError;
