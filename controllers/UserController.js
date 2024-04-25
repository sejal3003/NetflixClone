const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    // //Assign JWT to user
    // const token = jwt.sign({ _id: newUser._id }, process.env.KEY, {
    //   expiresIn: "15m",
    // });

    // Save the user
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      token: await newUser.generateToken(),
      _id: newUser._id.toString(),
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // const token = jwt.sign({ _id: user._id }, process.env.KEY, {
    //   expiresIn: "15m",
    // });

    // If user and password are valid, return success message
    return res.status(200).json({
      message: "Login successful.",
      token: await user.generateToken(),
      _id: user._id.toString(),
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Forgot Password
exports.forgotpassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.Key, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sejalr.uvxcel@gmail.com",
        pass: "udkt uath qoip bull",
      },
    });
    // Customize the email template
    var resetPasswordLink = `http://localhost:3000/resetPassword/${token}`;
    var emailTemplate = `
    <p>Dear <strong>User</strong>,</p>

    <p>You are receiving this email because a password reset request was initiated for your account.</p>
  
    <p>To reset your password, please click on the following link:</p>
    <p><a href="${resetPasswordLink}">${resetPasswordLink}</a></p>
  
    <p>If you did not request this password reset, please ignore this email. Your password will remain unchanged.</p>
  
    <p>Please note that this link is valid for a limited time and will expire after 5 mins. If you need further assistance, please contact at <a href="mailto:support@example.com">Support team</a>.</p>
  
    <p>Thank you,</p>
    <p><strong>The Netflix Team</strong></p>
`;
    var mailOptions = {
      from: "sejalr.uvxcel@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

//Reset Password
exports.resetpassword = async (req, res) => {
  // const { token } = req.params;
  const { password, token } = req.body;
  console.log(password, token);
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    console.log(decoded);
    const id = decoded._id;
    console.log("id", id);
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });
    return res.json({ status: true, message: "updated password" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Invalid token or failed to reset password" });
  }
};

//get userData on the screen
exports.user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};
