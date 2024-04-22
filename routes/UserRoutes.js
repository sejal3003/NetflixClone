const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
  user,
} = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);
//  Forgot Password Route
router.post("/forgot-password", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/user", authMiddleware, user);

module.exports = router;
