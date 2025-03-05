const throwError = (next, statusCode, message, data) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.data = data;
  next(error);
};

module.exports = throwError;
