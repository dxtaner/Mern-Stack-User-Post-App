const express = require("express");

const authValidation = require("../validators/auth.js");
const authController = require("../controllers/auth.js");
const isAuth = require("../middlewares/is-auth.js");

const router = express.Router();

router.post("/signup", authValidation.signup, authController.signup);

router.post("/login", authValidation.login, authController.login);

router.get("/status", isAuth, authController.getUserStatus);

router.patch(
  "/status",
  isAuth,
  authValidation.userStatus,
  authController.updateUserStatus
);

module.exports = router;
