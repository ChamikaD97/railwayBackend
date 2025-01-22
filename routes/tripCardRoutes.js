const express = require("express");
const TripCards = require("../models/tripCards");
const protectRoute = require("../authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  console.error("TripCards... ");
  try {
    const trips = await TripCards.find();

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
    console.log(newTripCard);
    
  } catch (err) {
    console.log(err.message);
    
    res.status(500).json({ error: "Failed to create new Trip Card" });
  }
});
router.get("/tripsByTrainNumber", async (req, res) => {
  const { trainNumber } =req.body.trainNumber;
  console.error("trips By train Number... ",req.body.trainNumber);

  try {
    const trips = await TripCards.find(trainNumber);
    if (trips.length === 0) {
      return res
        .status(404)
        .json({ message: "No Trip Cards found for this Train Number" });
    }
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Trip Cards" });
  }
});
module.exports = router;
