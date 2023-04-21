const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  namesData: {
    type: Array,
    required: true,
  },
  reservedSeats: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  selectedBusId: {
    type: String,
    required: true,
  },
});

const ticket = mongoose.model("ticket", TicketSchema);

module.exports = ticket;
