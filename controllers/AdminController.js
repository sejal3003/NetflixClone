const User = require("../models/UserModel");
const Movie = require("../models/MovieModel");

//getAllUsers Logic
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    // console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

//deleteUser Logic
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//getMoviesData Logic
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ isDeleted: false });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: " Movies not found" });
  }
};

//delete Movies Logic
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      deletedMovie: deletedMovie,
    });
  } catch (err) {
    console.error("Error deleting movie:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//get admindeleted movies

const getDeletedMovie = async (req, res) => {
  try {
    const movieData = await Movie.find({ isDeleted: true });
    res.status(201).json({ success: true, movieData });
  } catch (e) {
    res.status(400).json({ success: false, e });
  }
};

//Undo deleted movies Logic
const undoDeletedMovie = async (req, res) => {
  try {
    const movieData = await Movie.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false },
      { new: true }
    );
    if (!movieData) {
      return res.json({ success: false, error: "Movie not found" });
    }
    res.status(201).json({ success: true, movieData });
  } catch (error) {
    res.status(500).json({ success: false, error: e.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUserById,
  getAllMovies,
  deleteMovieById,
  getDeletedMovie,
  undoDeletedMovie,
};
