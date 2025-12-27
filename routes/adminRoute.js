const express = require("express");
const { home, blogForm, addBlog, deleteBlog, editForm, editBlog, quickView } = require("../controllers/adminController.js");
const { isLogin } = require("../middleware/protectedRoute.js");
const upload = require("../middleware/multer.js");
const router = express.Router();


router.get("/", home);
router.get("/add-blog", blogForm);
router.post("/add-blog", upload.single("blogImage"), addBlog)
router.get("/delete-blog/:id", deleteBlog);
router.get("/edit-form/:id", editForm);
router.post("/edit-blog/:id", upload.single("blogImage"), editBlog);
router.get("/quick-view/:id", quickView);
module.exports = router;