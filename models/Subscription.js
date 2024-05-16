const mongoose = require("mongoose");
const User = require("../models/UserModel"); // Import User model

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Referring to the User model
      required: true, // Assuming each subscription should have a user
    },
    paymentId: {
      type: String,
      unique: true,
      required: true, // Assuming paymentId is required
    },
    orderId: {
      type: String,
      unique: true,
      required: true, // Assuming orderId is required
    },
    paymentStatus: {
      type: String,
      default: "active", // Default payment status
    },
    startDate: {
      type: Date,
      default: Date.now, // Default start date is current date
    },
    endDate: {
      type: Date,
      // Calculate end date as 28 days from start date
      default: function () {
        return new Date(this.startDate.getTime() + 28 * 24 * 60 * 60 * 1000);
      },
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
