const fs = require("fs");
const path = require("path");
const AppError = require("../helpers/appErrorClass");
const sendError = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const fileName = path.join(__dirname, "..", "data", "blogs.json");
const Blogs = JSON.parse(fs.readFileSync(fileName, "utf-8"));

// Get all blogs
const getAllBlogs = (req, resp, next) => {
  if (Blogs.length == 0) {
    return sendResponse(200, "No Blogs found", resp);
  }
  if (Object.keys(req.query).length != 0) {
    const blogs = Blogs.filter((blog) => {
      return Object.keys(req.query).every((query) => {
        return blog[query] == req.query[query];
      });
    });
    if (blogs.length == 0) {
      return sendResponse(200, "No Blogs found", resp);
    }
    return sendResponse(200, blogs, resp);
  }
  sendResponse(200, Blogs, resp);
};

// get single blog
const getSingleBlog = (req, resp, next) => {
  const blog = Blogs.find((blog) => {
    return blog.id === req.params.blogId;
  });
  if (!blog) {
    return sendResponse(
      200,
      `No Blogs Found with id = ${req.params.blogId}`,
      resp
    );
  }
  sendResponse(200, blog, resp);
};

//update single blog
const updateBlog = (req, resp, next) => {
  const blog = Blogs.find((blog) => {
    return blog.id === req.params.blogId;
  });
  if (!blog) {
    return sendResponse(
      200,
      `No Blogs Found with id = ${req.params.blogId}`,
      resp
    );
  }
  Object.keys(req.body).forEach((parameter) => {
    if (blog[parameter]) {
      blog[parameter] = req.body[parameter];
    }
  });
  fs.writeFile(fileName, JSON.stringify(Blogs, null, 2), (error) => {
    if (error) {
      return sendError(
        new AppError(500, "Internal Error", "Some Error occured in server"),
        resp
      );
    }
  });

  sendResponse(200, blog, resp);
};

//Delete single blog
const deleteBlog = (req, resp, next) => {
  const blogIndex = Blogs.findIndex((blog) => {
    return blog.id === req.params.blogId;
  });
  if (blogIndex == -1) {
    return sendResponse(
      200,
      `No Blogs Found with id = ${req.params.blogId}`,
      resp
    );
  }
  Blogs.splice(blogIndex, 1);
  fs.writeFile(fileName, JSON.stringify(Blogs, null, 2), (error) => {
    if (error) {
      return sendError(
        new AppError(500, "Internal Error", "Some Error occured in server"),
        resp
      );
    }
  });
  resp.status(200).json({
    status: "Successful",
    message: `Blog Deteled with id = ${req.params.blogId}`,
  });
};

module.exports = { getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
