const adminMiddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access denied.User is not an admin" });
    }
    //if user is Admin ,proceed to next middleware
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = adminMiddleware;
