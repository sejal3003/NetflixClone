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
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: " Movies not found" });
  }
};

module.exports = { getAllUsers, deleteUserById, getAllMovies };
