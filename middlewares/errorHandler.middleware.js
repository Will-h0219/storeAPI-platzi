function logErrors(err, req, res, next) {
  console.log('Log errors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('Error handler');
  res.status(500).json({
    ok: false,
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = {
  boomErrorHandler,
  errorHandler,
  logErrors
};
