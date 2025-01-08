const express = require("express");
const classEngines = require("../models/classEngines");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/",async (req, res) => {
  console.error(' Class Engines... ');

  try {
    const eng = await classEngines.find();
    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Class Engines" });
  }
});

module.exports = router;
