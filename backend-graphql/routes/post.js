const express = require("express");

const isAuth = require("../middlewares/is-auth.js");
const feedController = require("../controllers/post.js");
const feedValidator = require("../validators/post.js");

const router = express.Router();

router.get("/posts", isAuth, feedController.getPosts);
router.get("/post/:postId", isAuth, feedController.getPost);

router.post("/post", isAuth, feedValidator, feedController.createPost);

router.put("/post/:postId", isAuth, feedValidator, feedController.updatePost);

router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
