const Razorpay = require("razorpay");
const crypto = require("crypto");
const Subscription = require("../models/Subscription");
const User = require("../models/UserModel");

exports.checkout = async (req, res) => {
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
};
exports.paymentVerification = async (req, res) => {
  console.log(req.user);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } =
    req.body;
  console.log("Received planId:", planId);

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res
      .status(400)
      .json({ success: false, msg: "Transaction is not Successful!" });
  }

  try {
    // // // Check if user information is available in req.user
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, msg: "User information not available." });
    }

    // Assuming you have the Subscription model defined in a file called Subscription.js in a models directory

    // Save the payment details to the database
    const subscription = new Subscription({
      user: req.user._id, // Assuming req.user contains user information and user ID is stored in _id field
      paymentId: razorpay_payment_id,
      planId: planId,
      orderId: razorpay_order_id,
      paymentStatus: "active", // Assuming the payment is successful, set payment status to "active"
      startDate: new Date(),
      // Assuming the start date is the current date
    });

    await subscription.save();

    await User.findByIdAndUpdate(req.user._id, { isSubscribed: true });

    res.status(200).json({
      success: true,
      msg: "Transaction is Successful!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Error processing payment." });
  }
};
