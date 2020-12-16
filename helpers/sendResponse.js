const sendResponse = (statusCode, data, resp) => {
  resp.status(statusCode).json({
    status: "successful",
    data: [data],
  });
};

module.exports = sendResponse;
