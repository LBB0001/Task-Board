const express = require("express");
const User = require("../models/User");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ name: user.name, email: user.email, profilePic: user.profilePic });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
});

router.put("/:id", upload.single("profilePic"), async (req, res) => {
  try {
    const updatedData = { name: req.body.name };
    if (req.file) {
      updatedData.profilePic = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json({ message: "Profile updated successfully!", profilePic: user.profilePic });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

module.exports = router;