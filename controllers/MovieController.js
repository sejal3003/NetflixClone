const Movie = require("../models/MovieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Other controller functions for CRUD operations
exports.getMovieByGenre = async (req, res) => {
  try {
    let query = { isDeleted: false }; // Initialize query with only isDeleted condition

    // Check if genre parameter is provided
    if (req.query.genre) {
      console.log("Requested Genre:", req.query.genre);
      query.genre = req.query.genre; // Add genre condition to the query if provided
    }

    // console.log("Query:", query);

    const movies = await Movie.find(query);

    if (movies.length === 0) {
      return res.status(404).json({ message: "No movies found" });
    }

    res.json(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({ message: "Server error" });
  }
};
