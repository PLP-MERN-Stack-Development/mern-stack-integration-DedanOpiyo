// routes/posts.js
const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { protect } = require('../middleware/authMiddleware');
const { createPostSchema } = require('../validation/postValidation');
const validate = require('../middleware/validateMiddleware');
const upload = require("../middleware/uploadMiddleware");

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);

router.post(
  "/",
  protect,
  validate(createPostSchema),
  upload.single("featuredImage"),
  postController.createPost
);

router.post("/:id/comments", protect, postController.addComment); // Comments

router.put(
  "/:id",
  protect,
  upload.single("featuredImage"),
  postController.updatePost
);
router.delete('/:id', protect, postController.deletePost);

router.get("/search", postController.searchPosts);

module.exports = router;
