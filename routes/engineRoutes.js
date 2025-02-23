const express = require("express");
const Engine = require("../models/engine");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/", async (req, res) => {
  try {
    const engines = await Engine.find().sort({ updatedAt: -1 });;

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





router.get("/engineBySubClass", async (req, res) => {
  const data = {
    subClass: req.query.subClass,
  };

  try {
    const engines = await Engine.find(data);
    if (engines.length === 0) {
      return res.json([]);
    }
    res.json(engines[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Type" });
  }
});

router.delete("/engineById", async (req, res) => {
  const subClass = req.query.subClass; // ✅ Use `req.query` for DELETE requests with query parameters

  // Validate the ID
  
  try {
    const trip = await Engine.findOne({subClass});
    console.log(trip);
    
    // Find and delete the trip card by ID
    const eng = await Engine.findByIdAndDelete(trip._id);
  
    // Check if the trip card was found and deleted
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Return the deleted trip card
    res.status(200).json({ message: "Trip deleted successfully", trip });
  } catch (err) {
    console.error("Error deleting trip:", err);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});
module.exports = router;
