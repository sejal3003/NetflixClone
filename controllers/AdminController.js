const User = require("../models/UserModel");
const Movie = require("../models/MovieModel");
const Subscription = require("../models/Subscription");

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

//Logic for uploading the movie

const uploadMovie = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    const { name, genre, category, trailer } = req.body;

    // // Check if movie ID already exists
    // const existingMovieByID = await Movie.findOne({ id });
    // if (existingMovieByID) {
    //   return res.status(400).json({ message: "Movie ID already exists" });
    // }

    // Check if movie name already exists
    const existingMovieByName = await Movie.findOne({ name });
    if (existingMovieByName) {
      return res.status(400).json({ message: "Movie name already exists" });
    }
    // console.log(req.file);
    const image = req.file.path;

    const newMovie = new Movie({
      name,
      image: image,
      genre: genre.split(",").map((g) => g.trim()),
      category,
      trailer,
      isDeleted: false,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get the Subscribed users Details
const getSubscribedUsers = async (req, res) => {
  try {
    const subscription = await Subscription.find({}, { orderId: 0 });
    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUserById,
  getAllMovies,
  deleteMovieById,
  getDeletedMovie,
  undoDeletedMovie,
  uploadMovie,
  getSubscribedUsers,
};
