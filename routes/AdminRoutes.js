const express = require("express");
const { getAllUsers } = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.route("/users").get(authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
