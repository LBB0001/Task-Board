const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, title, description } = req.body;
    const newTask = new Task({ userId, title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Task creation failed" });
  }
});

module.exports = router;