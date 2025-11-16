// console.log("authRoutes file loaded successfully");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminUser = require("../models/AdminUser");

const router = express.Router();

// Signup API
router.post("/signup", async (req, res) => {
  try {
    // console.log("Received signup request:", req.body);
    const { name, age, gender, email, phone, password } = req.body;

    // Check if user already exists
    const existingUser = await AdminUser.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new AdminUser({
      name,
      age,
      gender,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();
    // console.log("User created successfully:", email);
    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // console.log("Login request:", req.body);
    const { email, password } = req.body;

    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password!" });
    }

    //  Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "fikarplus_secret_key",
      { expiresIn: "2h" }
    );

    // console.log("Login successful for:", email);
    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET ADMIN INFO (name + email)
router.get("/admin-info", async (req, res) => {
  try {
    // fetch first admin from collection
    const admin = await AdminUser.findOne();

    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    res.json({
      name: admin.name,
      email: admin.email,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router; //  CommonJS export
