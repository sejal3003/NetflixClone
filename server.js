const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/MovieRoutes");
const userRoutes = require("./routes/UserRoutes");
// const dotenv = require("dotenv");
const app = express();
// dotenv.config();

app.use(cors());
app.use(express.json());

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
// app.use(express.json());

// Routes
app.use("/api/v1", movieRoutes);
app.use("/api/v1", userRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});

// Start the server

app.listen(8000, () => {
  console.log("server started on port 8000");
});
