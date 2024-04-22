const express = require("express");
const {
  getAllUsers,
  deleteUserById,
} = require("../controllers/AdminController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/users").get(authMiddleware, getAllUsers);
router.route("/delete/:id").delete(deleteUserById);

module.exports = router;
