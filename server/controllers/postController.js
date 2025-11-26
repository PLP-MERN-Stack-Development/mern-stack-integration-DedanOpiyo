// controllers/postController.js
const Post = require('../models/Post');

exports.getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();

    const posts = await Post.find()
      .populate("category author")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category author');
    if (!post) return res.status(404).json({ message: 'Post not found' });

    await post.incrementViewCount();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      ...req.body,
      author: req.user.id,
    });

    if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;
    await post.save(); // <-- IMPORTANT, triggers pre-save slug creation
    
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    if (req.file) req.body.featuredImage = `/uploads/${req.file.filename}`;
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.addComment(req.user.id, content);

    res.status(201).json({ message: "Comment added successfully", post });
  } catch (err) {
    next(err);
  }
};

exports.searchPosts = async (req, res, next) => {
  try {
    const query = req.query.q || "";

    const posts = await Post.find({
      title: { $regex: query, $options: "i" },
    }).populate("category author");

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

