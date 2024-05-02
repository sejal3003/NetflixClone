const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getAllUsers,
  deleteUserById,
  getAllMovies,
  deleteMovieById,
  getDeletedMovie,
  undoDeletedMovie,
  uploadMovie,
} = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

//Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, cb) {
  //   if (file.fieldname === "image") {
  //     cb(null, true); // Accept the file if the fieldname is 'image'
  //   } else {
  //     cb(new Error("Unexpected field")); // Reject the file if fieldname is unexpected
  //   }
  // },
});

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

//to upload movies
router
  .route("/upload")
  .post(authMiddleware, adminMiddleware, upload.single("image"), uploadMovie);
module.exports = router;
