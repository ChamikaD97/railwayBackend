const express = require("express");
const engineFailures = require("../models/engineFailures");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const { date, failure, comNum, engine, comments, status, risk } = req.body;
  console.log(req.body);

  try {
    const newengineFailures = new engineFailures({
      date, failure, comNum, engine, comments, status, risk
    });
    await newengineFailures.save();
    res.status(201).json(newengineFailures);
  } catch (err) {
    res.status(500).json({ error: "Failed to create EngineFailures" });
  }
});
module.exports = router;
