export const notFound = (req, res, next) => {
  const error = new Error(`${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let message = err?.message;
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err?.message?.stack : null,
  });
};
