const express = require("express");
const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/auth.middleware");

const router = express.Router();

// Auth Routes

// register user
router.post("/register", authController.registerUser);

// login user
router.post("/login", authController.loginUser);

// get current user
router.get("/me", authenticateToken, authController.getCurrentUser);

// logout user
router.post("/logout", authenticateToken, authController.logoutUser);

module.exports = router;
