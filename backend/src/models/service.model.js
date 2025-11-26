const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("service", serviceSchema);
