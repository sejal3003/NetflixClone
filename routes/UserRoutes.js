const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
} = require("../controllers/UserController");

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);
//  Forgot Password Route
router.post("/forgot-password", forgotpassword);
router.post("/resetpassword", resetpassword);

module.exports = router;
