
const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
  });
  
  module.exports = mongoose.model("Task", TaskSchema);