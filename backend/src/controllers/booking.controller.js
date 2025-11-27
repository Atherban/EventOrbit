const bookingModel = require("../models/booking.model");

// Create Booking (Client Only)
async function createBooking(req, res) {
  try {
    const userId = req.user.id;
    const userRole = req.userRole;

    if (userRole !== "client") {
      return res
        .status(403)
        .json({ message: "Only clients can create bookings" });
    }

    const { serviceId, bookingDate } = req.body;

    const newBooking = new bookingModel({
      userId,
      serviceId,
      bookingDate,
    });

    await newBooking.save();

    return res.status(201).json({
      newBooking: {
        id: newBooking._id,
        userId: newBooking.userId,
        serviceId: newBooking.serviceId,
        bookingDate: newBooking.bookingDate,
        status: newBooking.status,
      },
      message: "Booking created successfully",
    });
  } catch (error) {
    console.log("Error Crerating Booking : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Get Bookings
async function getMyBookings(req, res) {
  try {
    const userId = req.user.id;

    const booking = await bookingModel.find({ userId }).populate("serviceId");

    return res.status(200).json({ bookings: booking });
  } catch (error) {
    console.log("Error Getting Bookings:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Get Booking by ID
async function getBookingById(req, res) {
  try {
    const bookingId = req.params.id;

    const booking = await bookingModel
      .findById(bookingId)
      .populate("serviceId");

    if (!booking) {
      return (
        res.status(404),
        json({
          message: "Booking not found",
        })
      );
    }

    return res.status(200).json({ booking });
  } catch (error) {
    console.log("Error getting booking ID: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

//Update Booking Sttaus
async function updateBookingStatus(req, res) {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    const validStatuses = ["pending", "confirmed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const booking = await bookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({
      booking,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.log("Error Updating Booking Status:", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
};
