const express = require("express");
const Tickets = require("../models/Tickets");
const bodyParser = require("body-parser");

const router = express.Router();
//Body-Parser
const jsonParser = bodyParser.json();

router.post("/", async (req, res, next) => {
  const {
    email,
    start,
    destination,
    namesData,
    reservedSeats,
    date,
    selectedBusId,
  } = req.body;
  try {
    let ticket = {
      email: email,
      start: start,
      destination: destination,
      namesData: namesData,
      reservedSeats: reservedSeats,
      date: date,
      selectedBusId: selectedBusId,
    };
    let newTicket = new Tickets(ticket);
    // console.log(newUser)
    newTicket
      .save()
      .then((resp) => {
        res
          .status(200)
          .send({ message: "Ticket Saved Successfully", data: resp });
      })
      .catch((err) => {
        res.status(400).send({ message: "Ticket Save Failed", data: err });
      });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const email = req.query.email;

    const tickets = await Tickets.find({ email: email });
    res.status(200).json({ message: "Tickets Fetched", tickets });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error });
  }
});

module.exports = router;
