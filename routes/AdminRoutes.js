const express = require("express");
const getAllUsers = require("../controllers/AdminController");
const router = express.Router();

router.route("/users").get(getAllUsers);

module.exports = router;
