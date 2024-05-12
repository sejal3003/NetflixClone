const express = require("express");
const router = express.Router();
const movieController = require("../controllers/MovieController");

// GET all movies
router.get("/", movieController.getAllMovies);
router.get("/list", movieController.getMovieByGenre);
// Define other routes for CRUD operations

module.exports = router;
