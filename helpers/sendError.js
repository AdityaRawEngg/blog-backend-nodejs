const sendError = (error, resp) => {
  resp.status(error.statusCode).json({
    status: error.status,
    message: error.errorMessage,
  });
};

module.exports = sendError;
