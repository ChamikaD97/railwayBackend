const express = require("express");
const TripCards = require("../models/tripCards");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const trips = await TripCards.find().sort({ updatedAt: -1 }); // Use 1 for ascending, -1 for descending

    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Trip Cards" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTripCard = new TripCards(req.body);
    await newTripCard.save();
    res.status(201).json(newTripCard);
  } catch (err) {
    res.status(500).json({ error: "Failed to create new Trip Card" });
  }
});
router.get("/tripsByTrainNumber", async (req, res) => {
  const { trainNumber } = req.body.trainNumber;
  try {
    const trips = await TripCards.find(trainNumber);
    if (trips.length === 0) {
      res.status(200).json([]);
    }
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Trip Cards" });
  }
});

router.get("/ss", async (req, res) => {
  const data = {
    subClass: req.query.subClass,
  };

  try {
    const trips = await TripCards.find(data);
    if (trips.length === 0) {
      return res.json([]);
    }
    res.json(trips[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Type" });
  }
});


router.get("/tripsByEnginenumber", async (req, res) => {
  const data = {
    engine: req.query.engine,
  };
  try {
    const trips = await TripCards.find(data);
    if (trips.length === 0) {
      res.status(200).json([]);
      }else{
        console.log(trips.length);
    
        res.json(trips);
      }
   
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Trip Cards" });
  }
});

router.get("/tripsByDriverComnumber", async (req, res) => {
  const data = {
    driverComNum: req.query.driverComNum,
  };
  try {
    const trips = await TripCards.find(data);
 if(trips){
  res.status(200).json(trips);

 }
   
  } catch (err) {
    res.status(404).json({ error: "Failed to fetch Trips" });
  }
});

module.exports = router;
