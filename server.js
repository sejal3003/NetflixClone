const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const listRoutes = require("./routes/MylistRoutes");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const movieRoutes = require("./routes/MovieRoute");
const path = require("path");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const dotenv = require("dotenv");
const { log } = require("console");
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
app.use("/api/v1", listRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
//admin route
app.use("/api/admin", adminRoutes);
// Start the server

//payment gateway api

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    if (!req.body) {
      return res.status(400).send(" Bad Request");
    }
    const options = req.body;
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(400).send("Some error occured");
    }
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.post("/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  // order_id + " | " + razorpay_payment_id

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: " Transaction is not legit!" });
  }

  res.json({
    msg: " Transaction is legit!",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
app.listen(8000, () => {
  console.log(`Server started on port 8000`);
});
