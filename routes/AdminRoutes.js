const express = require("express");
const {
  getAllUsers,
  deleteUserById,
  getAllMovies,
} = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);
router.route("/getmovies").get(authMiddleware, adminMiddleware, getAllMovies);

module.exports = router;
