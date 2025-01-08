const express = require("express");
const User = require("../models/users");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { comNum, password } = req.body;

  try {
    const user = await User.findOne({ comNum });

    if (!user) {
      return res.status(201).json({ message: "User not found." });
    }
    
    const attempts = user.attempts + 1;

    await User.findOneAndUpdate(
      { comNum },
      {
        attempts: attempts,
      }
    );
    // Compare password (assuming password is hashed)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const failedAttempts = user.failedAttempts + 1;

      await User.findOneAndUpdate(
        { comNum },
        {
          failedAttempts: failedAttempts,
        }
      );
      return res.status(201).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.comNum },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token: token,user:user
    });
  } catch (error) {
   
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => { 


  const { comNum, password, nic, name, bio, lastLogin, attempts } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ comNum }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      comNum,
      nic,
      name,
      bio,
      lastLogin,
      attempts,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully.",
    });
  } catch (error) {
 
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
