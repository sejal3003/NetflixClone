const router = require("express").Router();
const {
  addToLikedMovies,
  // getLikedMovies,
  // removeFromLikedMovies,
} = require("../controllers/MovielistController");

//   router.get("/liked/:email", getLikedMovies);
router.post("/add", addToLikedMovies);
//   router.put("/remove", removeFromLikedMovies);

module.exports = router;
