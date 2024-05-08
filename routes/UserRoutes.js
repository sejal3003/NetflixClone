const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotpassword,
  resetpassword,
  user,
  updateProfile,
  likeMovie,
  dislikeMovie,
  wishlist,
  getMyList,
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
router.put("/like", authMiddleware, likeMovie);
router.put("/dislike", authMiddleware, dislikeMovie);
router.put("/mylist", authMiddleware, wishlist);
router.get("/mylist", authMiddleware, getMyList);

module.exports = router;
