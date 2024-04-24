const express = require("express");
const { getAllUsers } = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/users").get(authMiddleware, getAllUsers);

module.exports = router;
