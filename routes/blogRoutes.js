const express = require("express");
const { addBlog, getBlogs, searchBlogs, viewAllBlogs } = require("../controllers/blogController");

const router = express.Router();

router.route("/add-blog").post(addBlog);
router.route("/get-all-blogs").get(getBlogs);
router.route("/view-all-blogs").get(viewAllBlogs);
router.route("/search-blogs").post(searchBlogs);

module.exports = router;
