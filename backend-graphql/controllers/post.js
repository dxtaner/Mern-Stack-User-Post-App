const { validationResult } = require("express-validator");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const throwError = require("../utils/error.js");
const clearImage = require("../utils/clearImage.js");

module.exports.getPosts = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = 2;

    const totalItems = await Post.countDocuments();
    const posts = await Post.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    if (posts.length > 0) {
      res.status(200).json({
        message: "Posts fetched successfully",
        posts,
        totalItems,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No posts found",
        posts: [],
        totalItems,
      });
    }
  } catch (err) {
    throwError(next, err.statusCode || 500, err.message, err.data);
  }
};

module.exports.getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (!post) {
      throwError(next, 404, "Post not found", { postId });
    } else {
      res.status(200).json({
        success: true,
        message: "Post fetched successfully",
        post,
      });
    }
  } catch (err) {
    throwError(next, err.statusCode || 500, err.message, err.data);
  }
};

module.exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throwError(422, "Validation failed", errors.array());
    }

    if (!req.file) {
      throwError(422, "No image provided");
    }

    const { title, content } = req.body;
    const imageUrl = req.file.path.replace("\\", "/");

    const user = await User.findById(req.userId);

    if (!user) {
      throwError(404, "User not found", { userId: req.userId });
    }

    const post = new Post({
      title,
      content,
      imageUrl,
      creator: user,
    });

    await post.save();

    user.posts.push(post);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post creation successful",
      post: post,
      creator: { _id: user._id },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    if (req.file) {
      // Dosya kaydedilirken veya diğer işlemler sırasında bir hata olursa, yüklenen dosyayı sil.
      await clearImage(req.file.path);
    }

    next(err);
  }
};

module.exports.updatePost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError(next, 422, "Validation failed", errors.array());
    }

    const postId = req.params.postId;
    const { title, content } = req.body;
    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = req.file.path.replace("\\", "/");
    }

    const post = await Post.findById(postId);

    if (!post) {
      throwError(next, 404, "Post not found", { postId });
    }

    if (post.creator._id.toString() !== req.userId.toString()) {
      throwError(next, 403, "Not authorized to edit post");
    }

    if (imageUrl !== post.imageUrl) {
      await clearImage(post.imageUrl);
    }

    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    const result = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated!",
      post: result,
    });
  } catch (err) {
    throwError(next, err.statusCode || 500, err.message, err.data);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    let imageUrl;

    const post = await Post.findById(postId);

    if (!post) {
      throwError(next, 404, "Post not found", { postId });
    }

    imageUrl = post.imageUrl;

    if (post.creator._id.toString() !== req.userId.toString()) {
      throwError(next, 403, "Not authorized to delete this post");
    }

    await Post.findOneAndDelete({ _id: postId });

    const user = await User.findById(req.userId);
    user.posts.pull(postId);
    await user.save();

    await clearImage(imageUrl);

    res.status(200).json({ success: true, message: "Post deleted!" });
  } catch (err) {
    throwError(next, err.statusCode || 500, err.message, err.data);
  }
};
