const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nic: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    comNum: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    attempts: { type: Number, require: false, default: 0 },
    failedAttempts: { type: Number, require: false, default: 0 },
    lastLogin: { type: Date, require: false },
    isVerified: { type: Boolean, require: true, default: true },

  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

