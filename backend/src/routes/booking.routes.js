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

//Get my Bookings
router.get(
  "/",
  authenticateToken,
  roleMiddleware,
  bookingController.getMyBookings
);

//Get Booking by ID
router.get(
  "/:id",
  authenticateToken,
  roleMiddleware,
  bookingController.getBookingById
);

//Update Booking Status (Vendor Only)
router.patch(
  "/:id/status",
  authenticateToken,
  roleMiddleware,
  bookingController.updateBookingStatus
);

module.exports = router;
