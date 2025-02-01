const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUserInformation,
  updateAddress,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/userAuth");

// Signup Route
router.post("/sign-up", signUp);

// Signin Route
router.post("/sign-in", signIn);

// Get User Information
router.get("/get-user-information", authenticateToken, getUserInformation);

// Update Address
router.put("/update-address", authenticateToken, updateAddress);

module.exports = router;
