const express = require("express");
const bookingController = require("../controllers/booking.controller");
const authenticateToken = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// Create Booking (Client Only)
router.post(
  "/create",
  authenticateToken,
  roleMiddleware,
  bookingController.createBooking
);

module.exports = router;
