const express = require("express");
const engineFailures = require("../models/engineFailures");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const { date, failure, drivcerComNum, engine, comments, status, risk } =
    req.body;
  console.log(req.body);

  try {
    const newengineFailures = new engineFailures({
      date,
      failure,
      drivcerComNum,
      engine,
      comments,
      status,
      risk,
    });
    await newengineFailures.save();
    res.status(201).json(newengineFailures);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Failed to create EngineFailures" });
  }
});

router.get("/", async (req, res) => {
  try {
    const failures = await engineFailures.find().sort({ updatedAt: -1 }); // Use 1 for ascending, -1 for descending

    res.status(200).json(failures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engine Failures" });
  }
});


router.get("/engineFailureById", protectRoute, async (req, res) => {
  console.log(req.query);

  try {
    const failures = await engineFailures.findById(req.query.id);
    console.log(failures);

    res.status(200).json(failures);
  } catch (err) {
    console.log(err);

    res.status(500).json({ error: "Failed to fetch Engine Failures" });
  }
});

router.put("/updateById", async (req, res) => {
  const { id, ...updateData } = req.body;
  console.log(`Updating Engine Failure with ID: ${id}`);
  console.log(req.body);

  try {
    const updatedFailure = await engineFailures.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedFailure) {
      return res.status(404).json({ error: "Engine Failure not found" });
    }

    res.status(201).json(updatedFailure);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to update Engine Failure" });
  }
});

module.exports = router;
