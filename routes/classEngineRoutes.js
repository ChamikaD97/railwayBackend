const express = require("express");
const classEngines = require("../models/classEngines");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/",protectRoute, async (req, res) => {
  try {
    // Sorting in ascending order by 'year'
    const eng = await classEngines.find().sort({ year: 1 });
    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Class Engines" });
  }
});

router.get("/classEnginesbyTypeName",protectRoute, async (req, res) => {
  const { type, sortOrder } = req.query; // Get subClass from query params and optional sortOrder
  try {
    const eng = await classEngines
      .find({
        type: { $regex: `^${type}`, $options: "i" }, // Matches documents where 'type' starts with 'type' (case-insensitive)
      })
      .sort({ year: sortOrder === "desc" ? -1 : 1 }); // Sort by year in ascending (1) or descending (-1) order
    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Class Engines" });
  }
});

module.exports = router;
