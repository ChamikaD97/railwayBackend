const express = require('express');
const Engine = require('../models/engine');
const protectRoute = require('../authMiddleware');

const router = express.Router();

// Get All Engines
router.get('/' ,async (req, res) => {  
  try {
    const engines = await Engine.find();

    res.status(200).json(engines);
  } catch (err) {    
    res.status(500).json({ error: 'Failed to fetch Engines' });
  }
});

router.post('/',async (req, res) => {  
  const { type, shed, unitType,utilization,condition,remarks } = req.body;

  console.log(type, shed, unitType,utilization,condition,remarks);
  
  try {
    const newEngine = new Engine({ type, shed, unitType,utilization,condition,remarks });
    await newEngine.save();
    res.status(201).json(newEngine);
  } catch (err) {
    
    res.status(500).json({ error: 'Failed to create Engine' });
  }
});

module.exports = router;
