const express = require("express");
const failures = require("../models/failures");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.error('Failures ');
    const failureList = await failures.find();    
    res.status(200).json(failureList);
  } catch (err) {
     console.error('Failures ',err);
    res.status(500).json({ error: "Failed to fetch Failures" });
  }
});

module.exports = router;
