const express = require("express");
const Engine = require("../models/engine");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/", async (req, res) => {
  try {
    const engines = await Engine.find();

    res.status(200).json(engines);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.post("/", async (req, res) => {
  const { type, shed, unitType, utilization, condition, remarks } = req.body;

  try {
    const newEngine = new Engine(req.body);
    await newEngine.save();
    res.status(201).json(newEngine);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Engine" });
  }
});
router.get("/",async (req, res) => {
  try {
    const eng = await classEngines
      .aggregate([
        {
          $addFields: {
            numericPart: {
              $toInt: { $substr: ["$type", 1, { $strLenBytes: "$type" }] }, // Remove the first character ("S") and convert to integer
            },
          },
        },
        { $sort: { numericPart: 1 } }, // Sort by the numeric part
        {
          $project: {
            type: 1, // Keep the original 'type' field
            numericPart: 0, // Remove the temporary numericPart field
          },
        },
      ])
      .exec();

    res.status(200).json(eng);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Class Engines" });
  }
});

router.get("/enginesByClass", async (req, res) => {
  const { className } = req.query; // Get subClass from query params

  try {
    const engines = await Engine.find({
      class: { $regex: `^${className}`, $options: "i" }, // Matches documents where 'type' starts with 'typen' (case-insensitive)
    });

    res.json(engines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engines" });
  }
});

router.get("/enginesByClassType", async (req, res) => {
  const { type } = req.query; // Get subClass from query params
  try {
    const engines = await Engine.find({
      subClass: { $regex: `^${type}-`, $options: "i" }, // Matches documents where 'type' starts with 'typen' (case-insensitive)+
    });
    if (engines.length === 0) {
      return res.json([]);
    }
    res.json(engines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Type" });
  }
});

module.exports = router;
