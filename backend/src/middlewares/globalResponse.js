const globalResponse = (err, req, res, next) => {
  // console.error('Global Error Handler:', {
  //   message: err.message,
  //   stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  //   statusCode: err.statusCode || 500,
  // });

  const statusCode = err.statusCode || 500;
  const message =
    err.message || 'Something went wrong. Please try again later.';
  //  const stack = process.env.NODE_ENV === "development" ? err.stack : undefined
   const stack = err.stack

  return res.status(statusCode).json({ message,stack });
};

export default globalResponse;
