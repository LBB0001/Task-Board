const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post("/signup", async (req, res) => {
    console.log("Signup Request Received:", req.body);
  
    const { email, password } = req.body;
  
    try {
      if ( !email || !password) {
        return res.status(400).json({ message: " email, and password are required" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({  email, password: hashedPassword });
  
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(" Signup Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;