const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to DB Successfully");
    });
  } catch (error) {
    console.log("Error COnnecting to DB:", error);
  }
}

module.exports = connectDB;
