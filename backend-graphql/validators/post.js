const { body } = require("express-validator");

module.exports = [
  body("title", "Title should be at least 5 characters long")
    .trim()
    .isLength({ min: 5 }),
  body("content", "Content should be at least 5 characters long")
    .trim()
    .isLength({ min: 5 }),
];
