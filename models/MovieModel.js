const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
