const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  try {
    const { name, email, password, role, city, phone } = req.body;

    const exsisitingUser = await userModel.findOne({ email });
    if (exsisitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hash,
      role,
      city,
      phone,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", user:{id: user._id,
      name: user.name, role: user.role, email: user.email,} 
    });
  } catch (error) {
    console.log("Error in user login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCurrentUser(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getting current user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in user logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
};
