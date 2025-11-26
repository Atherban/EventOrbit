// Middleware to determine user role and attach it to the request object
const User = require("../models/user.model");

const roleMiddleware = async (req, res, next) => {
  try {
    const user = req.user && (await User.findById(req.user.id));

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.userRole = user.role;
    next();
  } catch (error) {
    console.error("Error in role fetching:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = roleMiddleware;
