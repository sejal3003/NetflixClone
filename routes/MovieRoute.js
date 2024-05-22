const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MovieController");

// GET all movies
router.get("/", movieController.getAllMovies);
router.get("/list", movieController.getMovieByGenre);
router.get("/search", movieController.search);
router.get("/get/:category", movieController.getMoviesByCategory);
module.exports = router;
