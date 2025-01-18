const express = require("express");
const Engine = require("../models/engine");
const protectRoute = require("../authMiddleware");

const router = express.Router();

// Get All Engines
router.get("/", async (req, res) => {
  console.error("Engines... ");
  try {
    const engines = await Engine.find();

    res.status(200).json(engines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engines" });
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
router.get("/engineBySubClass", async (req, res) => {
  const { subClass } = req.query; // Get subClass from query params
  console.error("engineBySubClass... ");

  try {
    const engines = await Engine.find({ subClass });
    if (engines.length === 0) {
      return res
        .status(404)
        .json({ message: "No engines found for this subClass" });
    }
    res.json(engines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engine" });
  }
});

router.get("/enginesByClass", async (req, res) => {

  const { className } = req.query; // Get subClass from query params
console.log('enginesByClass...',className);

try {

    const engines = await Engine.find({
      class: { $regex: `^${className}`, $options: "i" }, // Matches documents where 'type' starts with 'typen' (case-insensitive)
    });



    
    if (engines.length === 0) {
      return res
        .status(404)
        .json({ message: "No engines found for this Class" });
    }
    res.json(engines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Engines" });
  }
});
module.exports = router;
