const {
  UniqueViolationError,
  ValidationError
} = require('../../errors');

const errorHandlers = {};

// Handle unique constraint violation
errorHandlers.SequelizeUniqueConstraintError = (err) => {
  throw new UniqueViolationError(err);
};

// Handle validation error
errorHandlers.SequelizeValidationError = (err) => {
  const errors = err.errors.map((e) => ({
    message: e.message,
    field: e.path
  }));

  throw new ValidationError(errors);
};

module.exports = (err) => {
  const handler = errorHandlers[err.name];

  if (handler) {
    handler(err);
  }
};
