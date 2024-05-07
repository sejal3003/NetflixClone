const express = require("express");
const router = express.Router();
const genreController = require("../controllers/genreController");

// Route to import genres
router.get("/import", genreController.getGenres);

module.exports = router;
