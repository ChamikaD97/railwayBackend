const express = require("express");
const engineFailures = require("../models/engineFailures");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    date,
    failure,
    drivcerComNum,
    driverName,
    engine,
    trainNumber,
    comments,
    status,
  } = req.body;

  try {
    const newengineFailures = new engineFailures({
      date,
      failure,
      drivcerComNum,
      driverName,
      engine,
      trainNumber,
      comments,
      status,
    });
    await newengineFailures.save();
    res.status(201).json(newengineFailures);
  } catch (err) {
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
router.get("/engineFailuresByDrivcerComNum", async (req, res) => {
  const data = {
    drivcerComNum: req.query.drivcerComNum,
  };

  try {
    const failures = await engineFailures.find(data).sort({ updatedAt: -1 });

    if (failures.length === 0) {
      res.status(200).json([]);
    } else {
      res.json(failures);
    }
  } catch (err) {
    res.status(500).json({ error: "No Failures To  Engine" });
  }
});
router.get("/engineFailureByEngine", async (req, res) => {
  const data = {
    engine: req.query.engine,
  };

  try {
    const failures = await engineFailures.find(data).sort({ updatedAt: -1 });;
    if (failures.length === 0) {
      res.status(200).json([]);
    } else {
      res.json(failures);
    }
  } catch (err) {
    res.status(500).json({ error: "No Failures To This Engine" });
  }
});


router.get("/engineFailureByTrainNumber", async (req, res) => {
  const data = {
    trainNumber: req.query.trainNumber,
  };
  try {
    const failures = await engineFailures.find(data);
    if (failures.length === 0) {
      res.status(200).json([]);
    } else {
      res.json(failures);
    }
  } catch (err) {
    res.status(500).json({ error: "No Failures To This Train Number" });
  }
});




router.get("/engineFailureById", async (req, res) => {
  try {
    const failures = await engineFailures.findById(req.query.id);

    if (failures.length === 0) {
      res.status(200).json([]);
    }

    res.json(failures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engine Failures" });
  }
});

router.put("/updateById", async (req, res) => {
  const { id, ...updateData } = req.body;

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
    res.status(500).json({ error: "Failed to update Engine Failure" });
  }
});

module.exports = router;
