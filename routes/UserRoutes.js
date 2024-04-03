const router = require("express").Router();
const UserLogin = require("../models/UserModel");

router.post("/login", async (req, res) => {
  const loginData = new UserLogin({
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const userInfo = await loginData.save();
    res.status(201).json(userInfo);
  } catch (error) {
    res.status(500).json(err);
  }
});
module.exports = router;
