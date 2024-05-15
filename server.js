const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const movieRoutes = require("./routes/MovieRoute");
const genreRoutes = require("./routes/genreRoutes");
const paymentRoute = require("./routes/paymentRoutes");
const path = require("path");

const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/uploads/images", express.static("uploads/images"));

//connect to MongoDb
mongoose
  .connect(
    "mongodb+srv://sejalrampure:mongodb8421@netflixcluster.smag6bf.mongodb.net/netflix",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });
// Middleware
app.use(express.json());

// Routes

app.use("/api/v1", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
//admin route
app.use("/api/admin", adminRoutes);

//payment gateway route
app.use("/api/v1", paymentRoute);

// Start the server
app.listen(8000, () => {
  console.log(`Server started on port 8000`);
});
