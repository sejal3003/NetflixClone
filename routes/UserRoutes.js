const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
  user,
  updateProfile,
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
router.put("/update-profile", updateProfile);

module.exports = router;
