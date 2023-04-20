const express = require("express");
const router = express.Router();
const bus = require("../models/Buses");

router.post("/", async (req, res) => {
  try {
    const busData = await bus
      .find({
        startCity: req.body.startCity,
        destination: req.body.destination,
      })
      .exec();
    res.json({ bus: busData });
  } catch (err) {
    res.json({ status: false, message: "error while searching" });
  }
});

router.post("/", async (req, res) => {
  try {
    const busData = await bus.findOne({ _id: req.body.bId }).exec();
    res.json({ bus: busData });
  } catch (err) {
    res.json({ status: false, message: "error while searching with ID" });
  }
});

module.exports = router;
