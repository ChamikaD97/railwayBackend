const express = require("express");
const classEngines = require("../models/classEngines");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/", protectRoute,async (req, res) => {
  try {
    const eng = await classEngines.find();
    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Class Engines" });
  }
});

module.exports = router;
