const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
// const Movie = require("../models/MovieModel");

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists.",
      });
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
  
    <p>To reset your password, please click on the following button:</p>
    <a href="${resetPasswordLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
  
    <p>If you did not request this password reset, please ignore this email. Your password will remain unchanged.</p>
  
    <p>Please note that this link is valid for a limited time and will expire after 5 mins. If you need further assistance, please contact at <a href="mailto:support@example.com">Support team</a>.</p>
  
    <p>Thank you,</p>
    <p><strong>The NetaFilm Team</strong></p>
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
  // console.log(password, token);
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

//get userData
exports.user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

// Update  Admin Profile logic
exports.updateProfile = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email and password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user is an admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update profile." });
    }

    // Update the Admin profile
    if (email) {
      user.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "Admin profile updated successfully." });
  } catch (error) {
    console.error("Error in updating profile:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Controller method to like a movie
exports.likeMovie = async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(200).json({ message: "Movie id is required" });
    }
    // Check if the movie is already liked by the user
    const likedIndex = req.user.likedMovies.indexOf(movieId);
    if (likedIndex !== -1) {
      // Movie is already liked, so remove it from likedMovies array
      req.user.likedMovies.splice(likedIndex, 1);
      await req.user.save();
      return res.status(200).json({ message: "Movie removed from liked list" });
    }

    // Check if the movie is already disliked by the user
    const dislikedIndex = req.user.dislikedMovies.indexOf(movieId);
    if (dislikedIndex !== -1) {
      // Remove the movie from dislikedMovies array
      req.user.dislikedMovies.splice(dislikedIndex, 1);
    }

    // Add the movieId to the likedMovies array if it's not already present
    req.user.likedMovies.push(movieId);
    await req.user.save();
    res.status(200).json({ message: "Movie liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.dislikeMovie = async (req, res) => {
  try {
    const { movieId } = req.body;
    if (!movieId) {
      return res.status(200).json({ message: "Movie id is required" });
    }

    // Check if the movie is already liked by the user
    const likedIndex = req.user.likedMovies.indexOf(movieId);
    if (likedIndex !== -1) {
      // Remove the movie from likedMovies array
      req.user.likedMovies.splice(likedIndex, 1);
    }

    // Check if the movie is already disliked by the user
    const dislikedIndex = req.user.dislikedMovies.indexOf(movieId);
    if (dislikedIndex !== -1) {
      // Remove the movie from dislikedMovies array
      req.user.dislikedMovies.splice(dislikedIndex, 1);
      await req.user.save();
      return res
        .status(200)
        .json({ message: "Movie removed from disliked list" });
    }

    // Add the movieId to the dislikedMovies array
    req.user.dislikedMovies.push(movieId);
    await req.user.save();

    res.status(200).json({ message: "Movie disliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.wishlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    if (!movieId) {
      return res.status(200).json({ message: "Movie id is required" });
    }
    // Check if the movie is already wishlist by the user
    const wishlistIndex = req.user.wishlist.indexOf(movieId);
    if (wishlistIndex !== -1) {
      // Movie is already wishlist, so remove it from wishlist array
      req.user.wishlist.splice(wishlistIndex, 1);
      await req.user.save();
      return res.status(200).json({ message: "Movie removed from Mylist" });
    }

    // Add the movieId to the wishlist array if it's not already present
    req.user.wishlist.push(movieId);
    await req.user.save();
    res.status(200).json({ message: "Movie added to the MyList successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMyList = async (req, res) => {
  try {
    // Populate the wishlist field with actual movie documents
    await req.user.populate("wishlist");

    // Extract the populated wishlist from the user document
    const wishlist = req.user.wishlist;

    // Respond with the wishlist
    res.status(200).json({ wishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getMyList = async (req, res) => {
//   try {
//     // Find the user by ID
//     const user = await User.findById(req.user._id);

//     // If user is not found
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Populate the wishlist with movie documents
//     await user.populate({
//       path: "wishlist",
//       model: "Movie",
//       select: "name",
//     });

//     // Extract the populated wishlist from the user document
//     const wishlist = user.wishlist;

//     // Respond with the wishlist
//     res.status(200).json({ wishlist });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
