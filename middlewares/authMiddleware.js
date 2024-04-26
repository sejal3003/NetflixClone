const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = async (req, res, next) => {
  // Your authentication logic here
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middleware", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.KEY);

    console.log(isVerified);
    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    console.log(userData);
    req.user = userData;
    req.token = token;
    req.userid = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized , invalid token" });
  }
};

module.exports = authMiddleware;
