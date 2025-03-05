const { body } = require("express-validator");
const User = require("../models/user.js");

module.exports.signup = [
  body("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .custom(async (value) => {
      try {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("Email already exists");
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }),
  body("password").isLength({ min: 8 }),
  body("name").trim().not().isEmpty(),
];

module.exports.login = [
  body("email").trim().isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }),
];

module.exports.userStatus = [body("status").trim().not().isEmpty()];
