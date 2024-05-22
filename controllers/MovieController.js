const Movie = require("../models/MovieModel");

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//search functionality
exports.search = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      // If no 'name' parameter is provided, return all movies
      const allMovies = await Movie.find();
      return res.status(200).json({ success: true, movies: allMovies });
    }

    // Log the constructed MongoDB query
    // console.log("MongoDB Query:", { name: { $regex: new RegExp(name, "i") } });

    // Use a case-insensitive regular expression to search for movies by name
    const movies = await Movie.find({
      name: { $regex: new RegExp(name, "i") },
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No movies found with that name" });
    }

    res.status(200).json({ success: true, movies });
  } catch (err) {
    console.error("Error searching movies:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

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

//getMovie By category
exports.getMoviesByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const movies = await Movie.find({ category, isDeleted: false });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching movies" });
  }
};
