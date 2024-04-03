const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/MovieRoutes");
const authRoutes = require("./routes/UserRoutes");
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

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(8000, () => {
  console.log("server started on port 8000");
});
