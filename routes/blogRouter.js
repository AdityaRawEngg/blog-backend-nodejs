const express = require("express");
const { verifyUpdateRequest } = require("../middlewares/blogMiddleware");
const {
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

router.route("").get(getAllBlogs);
router
  .route("/:blogId")
  .get(getSingleBlog)
  .put(verifyUpdateRequest, updateBlog)
  .delete(deleteBlog);

module.exports = router;
