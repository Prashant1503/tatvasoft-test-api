const express = require("express");
const router = express.Router();

var blogController = require("../controllers/blogController");
var authMiddleware = require("../middleware/authMiddleware")


router.get("/", authMiddleware, blogController.getAllBlogs);
router.post("/save", authMiddleware, blogController.createBlog);
router.put("/:blogId", authMiddleware, blogController.updateBlogById);
router.delete("/:blogId", authMiddleware, blogController.deleteBlogById);



module.exports = router;