const express = require("express");

const {
  getAllUsers,
  deleteUserById,
  getAllMovies,
  deleteMovieById,
  getDeletedMovie,
  undoDeletedMovie,
} = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Routes

//getAllUsers Route
router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

//deleteUsers Route
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, deleteUserById);

//getAllMovies Route
router.route("/getmovies").get(authMiddleware, adminMiddleware, getAllMovies);

// deleteMovies Route
router
  .route("/deletemovies/:id")
  .delete(authMiddleware, adminMiddleware, deleteMovieById);

//getDeletedMovies Route
router
  .route("/admindeletedmovies")
  .get(authMiddleware, adminMiddleware, getDeletedMovie);

// Undo Deleted Movies
router
  .route("/undo/:id")
  .put(authMiddleware, adminMiddleware, undoDeletedMovie);

module.exports = router;
