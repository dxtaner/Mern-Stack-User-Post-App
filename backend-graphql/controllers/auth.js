const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const keys = require("../keys");

module.exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.data = errors.array();
      error.statusCode = 422;
      throw error;
    }

    const { email, password, name } = req.body;

    // Check if the email already exists with a shorter timeout
    const existingUser = await User.findOne({ email }).maxTimeMS(1000);

    if (existingUser) {
      const error = new Error("Email already exists");
      error.statusCode = 422;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      name: name,
      password: hashedPassword,
    });

    const result = await user.save();

    res.status(201).json({
      message: "User created",
      userId: result._id,
      succes: true,
      user: user,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }

    const { email, password } = req.body;

    const loadedUser = await User.findOne({ email });

    if (!loadedUser) {
      const error = new Error("A user with this email was not found");
      error.statusCode = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, loadedUser.password);

    if (!isPasswordValid) {
      const error = new Error("Wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: loadedUser.email, userId: loadedUser._id.toString() },
      keys.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      user: loadedUser,
      success: true,
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports.getUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ status: user.status, user: user, succces: true });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    next(err);
  }
};

module.exports.updateUserStatus = async (req, res, next) => {
  try {
    const newStatus = req.body.status;
    console.log("newStatus", newStatus);

    const user = await User.findById(req.userId);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    user.status = newStatus;
    await user.save();

    res
      .status(201)
      .json({ message: "User status updated.", user: user, success: true });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
