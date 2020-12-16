const fs = require("fs");
const path = require("path");
const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");
const Blogs = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "data", "blogs.json"), "utf-8")
);

const verifyUpdateRequest = (req, resp, next) => {
  if (
    !Object.keys(Blogs[0]).some((key) => {
      return req.body[key];
    })
  ) {
    return sendError(
      new AppError(400, "Unsuccessful", "Request body not Valid"),
      resp
    );
  }
  next();
};

module.exports = { verifyUpdateRequest };
