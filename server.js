const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const listRoutes = require("./routes/MovielistRoutes");
const userRoutes = require("./routes/UserRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const movieRoutes = require("./routes/MovieRoute");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const app = express();

// app.use(bodyParser.json());
dotenv.config();

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
app.use(express.json());

// // Payment processing route
// app.post("/api/payment/process", async (req, res) => {
//   try {
//     const { paymentMethodId, amount } = req.body;

//     // Validate request data
//     if (!paymentMethodId || !amount) {
//       return res
//         .status(400)
//         .json({ message: "PaymentMethodId and amount are required" });
//     }

//     // Create payment intent with Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: "usd",
//       payment_method: paymentMethodId,
//       confirm: true,
//     });

//     // Handle successful payment
//     if (paymentIntent.status === "succeeded") {
//       // Payment succeeded
//       res.status(200).json({ message: "Payment succeeded", paymentIntent });
//     } else {
//       // Payment failed
//       res.status(400).json({ message: "Payment failed", paymentIntent });
//     }
//   } catch (error) {
//     console.error("Error processing payment:", error);
//     res.status(500).json({ message: "Payment failed", error: error.message });
//   }
// });

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

app.listen(8000, () => {
  console.log(`Server started on port 8000`);
});
