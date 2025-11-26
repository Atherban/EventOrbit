require("dotenv").config();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const express = require("express");
const authRoutes = require("./routes/auth.routes");
const serviceRoutes = require("./routes/service.routes");

// Middlewares
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// Auth Routes
app.use("/api/auth", authRoutes);

// Service Routes
app.use("/api/services", serviceRoutes);

module.exports = app;
